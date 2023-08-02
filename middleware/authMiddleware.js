import OktaJwtVerifier from '@okta/jwt-verifier';

const authMiddleware = async (req, res, next) => {
	const oktaJwtVerifier = new OktaJwtVerifier({
		clientId: '0oaamlcvdkX0K5gM75d7',
		issuer: 'https://dev-95093015.okta.com/oauth2/default',
	});

	const authHeader = req.headers.authorization || '';
	const match = authHeader.match(/Bearer (.+)/);

	if (!match) {
		res.status(401);
		return next('Unauthorized');
	}

	const accessToken = match[1];
	const audience = 'api://default';
	return oktaJwtVerifier
		.verifyAccessToken(accessToken, audience)
		.then((jwt) => {
			req.jwt = jwt;
			next();
		})
		.catch((err) => {
			res.status(401).send(err.message);
		});
};

export default authMiddleware;
