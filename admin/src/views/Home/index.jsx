import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

import Button from '../../components/UI/Button/Button';
import List from '../List';

const Home = () => {
	const [userInfo, setUserInfo] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();

	const { oktaAuth, authState } = useOktaAuth();

	const handleLogin = async () => history.push('/login');

	const handleLogout = async () => oktaAuth.signOut();

	const getUserDetails = () => {
		setIsLoading(true);
		oktaAuth
			.getUser()
			.then((info) => {
				setUserInfo(info);
			})
			.catch((err) => {
				console.error(err);
			});
		setIsLoading(false);
	};

	useEffect(() => {
		if (!authState || !authState.isAuthenticated) setUserInfo(null);
		else getUserDetails();
	}, [authState, oktaAuth]);

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
				Loading ...
			</div>
		);
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-around',
					alignItems: 'center',
					padding: '20px',
				}}>
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
					}}>
					<p style={{ fontSize: '60px' }}>
						{userInfo ? userInfo.name.toUpperCase() : ''} To Do List
					</p>
					{!authState.isAuthenticated ? (
						<Button id="login-button" type="button" onClick={handleLogin}>
							Login
						</Button>
					) : (
						<Button id="login-button" type="button" onClick={handleLogout}>
							Logout
						</Button>
					)}
				</div>
				{authState.isAuthenticated ? (
					<List />
				) : (
					<div style={{ fontSize: '30px', color: 'red', paddingTop: '50px' }}>Login to use the to do list</div>
				)}
			</div>
		</>
	);
};

export default Home;
