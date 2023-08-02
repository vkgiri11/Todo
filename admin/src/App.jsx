import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

import './App.css';
import config from './../config';
import Home from './views/Home/index';
import Login from './views/Home/Login';

const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
	const history = useHistory();

	const customAuthHandler = () => {
		history.push('/login');
	};

	const restoreOriginalUri = async (_oktaAuth, originalUri) => {
		history.replace(toRelativeUrl(originalUri || '', window.location.origin));
	};

	return (
		<>
			<Security
				oktaAuth={oktaAuth}
				onAuthRequired={customAuthHandler}
				restoreOriginalUri={restoreOriginalUri}>
				<Route path="/" render={() => <Home />} />
				<Route path="/login" render={() => <Login />} />
				<Route path="/login/callback" component={LoginCallback} />
			</Security>
		</>
	);
};

export default App;
