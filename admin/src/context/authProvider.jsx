import { useContext, createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState();

	const history = useHistory();

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('okta-token-storage'));

		if (userInfo) setUser({ token: userInfo?.accessToken?.accessToken });

		if (!userInfo) history('/home');
	}, [history]);

	return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const AuthState = () => {
	return useContext(AuthContext);
};
