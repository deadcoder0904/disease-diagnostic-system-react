import React, { Component } from 'react';
import autoBind from 'react-autobind';
import NotificationSystem from 'react-notification-system';
import { validateEmail } from '../utils/index';

class SignUpForm extends Component {
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
		this.setState({ email })
	}
	passwordHandler(e) {
		const password = e.target.value
		this.setState({ password })
	}
	submitHandler(e) {
		console.log(submitHandler);
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
			<article className="pa4 black-80">
			  <form method="get" className="bg-blue br4 pa5 white"  autoComplete="off">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
			      <div className="mt3">
			        <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
			        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address"
			        	value={this.state.email} onChange={this.emailHandler} />
			      </div>
			      <div className="mt3">
			        <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password"
			        	value={this.state.password} onChange={this.passwordHandler} />
			      </div>
			    </fieldset>
			    <div className="mt3">
			    	<button className="b ph3 pv2 input-reset ba b--black bg-white pointer f6 dib" onClick={this.submitHandler}>Sign Up</button>
				</div>
			  </form>
			</article>
			)
	}
}

export default SignUpForm;