import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

import List from './views/List';
import Home from './views/Home/index';
import Login from './views/Home/Login';
import Protected from './views/Home/Protected';
import config from './../config';
import './App.css';

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
				<SecureRoute path="/protected" component={Protected} />
				<Route path="/home" render={() => <Home />} />
				<Route path="/login" render={() => <Login />} />
				<Route path="/list" render={() => <List />} />
				<Route path="/login/callback" component={LoginCallback} />
			</Security>
		</>
	);
};

export default App;
