
export default {
	oidc: {
		issuer: import.meta.env.VITE_ISSUER,
		clientId: import.meta.env.VITE_CLIENT_ID,
		scopes: ['openid', 'profile', 'email'],
		redirectUri: `${window.location.origin}/login/callback`,
	},
	widget: {
		issuer: import.meta.env.VITE_ISSUER,
		clientId: import.meta.env.VITE_CLIENT_ID,
		redirectUri: `${window.location.origin}/login/callback`,
		scopes: ['openid', 'profile', 'email'],
	},
};
