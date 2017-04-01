import React from 'react';

import NotFound from '../components/404';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const styles = {
	h1: {
		'fontSize': '5em'
	},
	flexbox: {
		'display': 'flex',
		'justifyContent': 'center',
		'alignItems': 'center',
		'height': '50vh'
	}
};

class App extends React.Component {
	render() {
		return (
			<div>
				<h1 style={styles.h1}>Disease Diagnostic System</h1>
				<div style={styles.flexbox}>
					 <Router>
					      <Switch>
					      	<Route exact path="/" component={LoginForm} />
					      	<Route path="/signUp" component={SignUpForm}/>
					      	<Route component={NotFound}/>
					      </Switch>
					  </Router>
				</div>
			</div>
		);
	}
}

export default App;
