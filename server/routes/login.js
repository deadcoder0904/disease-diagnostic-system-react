import express from 'express';
import path from 'path';

import { validateEmail } from  '../../client/utils/index';

import users from '../model/users';

const apiRoutes = express.Router();

apiRoutes.post('/',(req,res) => {
	if(req.headers.hasOwnProperty('email') && req.headers.hasOwnProperty('password')) {
		const email = req.headers['email'];
		const password = req.headers['password'];
		const validEmail = validateEmail(email);
		if(!validEmail) {
			res.json({msg: "Email ID not valid",ok: false});
		}
		else if(password.length <= 3) {
			res.json({msg: "Please provide a long password",ok: false});
		}
		else {
			users.findOne({email},(err,docs) => {
				console.log(docs);
				if(docs)
					res.json({msg: "Alright",ok: true});
				else res.json({msg: "No such user exists",ok: false});
			})
		}
	}
	else {
		res.json({msg: "Please fill all fields",ok: false});
	}
});

export default apiRoutes;