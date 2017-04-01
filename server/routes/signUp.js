import express from 'express';
import path from 'path';
import gmail from 'email-via-gmail';

import { validateEmail, generateOTP } from  '../../client/utils/index';
import privateData from '../private';

import temp from '../model/temp';
import users from '../model/users';

const apiRoutes = express.Router();

apiRoutes.post('/',(req,res) => {
	if(req.headers.hasOwnProperty('name') && req.headers.hasOwnProperty('email') && req.headers.hasOwnProperty('password')) {
		const name = req.headers['name'];
		const email = req.headers['email'];
		const password = req.headers['password'];
		const validEmail = validateEmail(email);
		if(name.length == 0) {
			res.json({msg: "Please provide a name",ok: false});
		}
		else if(!validEmail) {
			res.json({msg: "Email ID not valid",ok: false});
		}
		else if(password.length <= 3) {
			res.json({msg: "Please provide a long password",ok: false});
		}
		else {
			temp.findOne({email},(err,docs) => {
				const otp = generateOTP();
				gmail.login(privateData.gmail.email,privateData.gmail.password);
				gmail.sendEmail('DDS',`Your OTP is ${otp}`,email);
				if(docs) {
					// change otp if user exists in temp
					temp.where({_id: docs._id})
							.update({ otp })
							.exec();
					res.json({msg: `Your OTP ${otp} is sent on your Email ID, again`,ok: true});
				}
				else {
					// add user in temp collection
					const tempUser = new temp({ name, email, password, otp });
					tempUser.save((err,docs) => {
						res.json({msg: `Your OTP ${otp} is sent on your Email ID`,ok: true});
					});
				}
			})
		}
	}
	else {
		res.json({msg: "Please provide all fields",ok: false});
	}
});

apiRoutes.post('/otp',(req,res) => {
	if(req.headers.hasOwnProperty('name') && req.headers.hasOwnProperty('email') && req.headers.hasOwnProperty('password') && req.headers.hasOwnProperty('otp')) {
		const name = req.headers['name'];
		const email = req.headers['email'];
		const password = req.headers['password'];
		const otp = req.headers['otp'];
		const validEmail = validateEmail(email);
		if(!validEmail) {
			res.json({msg: "Email ID not valid",ok: false});
		}
		else if(otp.length != 4) {
			res.json({msg: "OTP invalid",ok: false});
		}
		else {
			temp.findOne({email, otp},(err,docs) => {
				if(docs) {
					// insert into users collection
					temp.remove({email: docs.email},(err, docs) =>  {
						 // removed
		            });
					const tempUser = new users({
						name: docs.name,
						email: docs.email,
						password: docs.password
					});
					tempUser.save((err,docs) => {
						res.json({msg: `Successfully signed up`,ok: true});
					});
				}
				else {
					// no such user signed up
					res.json({msg: 'Such user does not exist',ok: false});
				}
			})
		}
	}
	else {
		res.json({msg: "Please provide all fields",ok: false});
	}
});

export default apiRoutes;