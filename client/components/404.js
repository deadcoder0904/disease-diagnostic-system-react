import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
			<div className="tc white f1 bg-black-80 pa3">
				The Page you're looking for is Not Found
				<hr/>
		      <Link to="/" className="f2 grow no-underline br-pill ba bw2 pa3 ma3 dib dark-blue">Goto Login</Link>
		      <Link to="/signUp" className="f2 grow no-underline br-pill ba bw2 pa3 ma3 dib dark-green">Goto Sign up</Link>
			</div>
		)
}

export default NotFound