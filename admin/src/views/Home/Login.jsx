import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';
import { useOktaAuth } from '@okta/okta-react';

const Login = () => {
	const { authState } = useOktaAuth();

	if (!authState) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					width: '100vw',
					fontSize: '60px',
					fontWeight: '600',
				}}>
				Loading...
			</div>
		);
	}

	return authState.isAuthenticated ? (
		<Redirect to={{ pathname: '/list' }} />
	) : (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<OktaSignInWidget />
		</div>
	);
};

export default Login;
