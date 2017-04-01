import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import { validateEmail } from '../utils/index';

class LoginForm extends Component {
	constructor() {
		super()
		autoBind(this)
		this.state = {
			email: '',
			password: ''
		}
	}
	componentDidMount() {
    	this.notificationSystem = this.refs.notificationSystem
  	}
	emailHandler(e) {
		const email = e.target.value
		console.log(email);
		this.setState({ email })
	}
	passwordHandler(e) {
		const password = e.target.value
		this.setState({ password })
	}
	submitHandler(e) {
		e.preventDefault()
		const validEmail = validateEmail(this.state.email)
		if(!validEmail || this.state.password == '') {
			this.notificationSystem.addNotification({
		      title: 'Error',
		      message: 'Please fill all the fields!!!',
		      level: 'error',
		      position: 'bc'
		    })
		}
		else if(!validEmail) {
						this.notificationSystem.addNotification({
					      title: 'Error',
					      message: 'Please enter a valid Email ID',
					      level: 'warning',
					      position: 'bc'
					    })
					}					
					else {
						this.notificationSystem.addNotification({
					      title: 'Success',
					      message: 'Successfully Logged In !!!',
					      level: 'success',
					      position: 'bc'
					    })
					}
	}
	render() {
		return (
				<main className="pa4 black-80">
				  <form className="measure center bg-blue br4 pa5 white" autoComplete="off">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0 white">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-white w-100" type="email" name="email-address"  id="email-address" 
				        	value={this.state.email} onChange={this.emailHandler} />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-white w-100" type="password" name="password"  id="password" 
				        	value={this.state.password} onChange={this.passwordHandler} />
				      </div>
				    </fieldset>
				    <div className="">
				      <button className="b ph3 pv2 input-reset ba b--black bg-white pointer f6 dib" onClick={this.submitHandler}>Sign In</button>
				    </div>
				    <div className="lh-copy mt3">
				      <Link to="/signUp" className="f6 link dim white db">Sign up</Link>
				      <Link to="/forgotPassword" className="f6 link dim white db">Forgot your password?</Link>
				    </div>
				  </form>
		          <NotificationSystem ref="notificationSystem" />
				</main>
			)
	}
}

export default LoginForm;