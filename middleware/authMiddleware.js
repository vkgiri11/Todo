import OktaJwtVerifier from '@okta/jwt-verifier';

const authMiddleware = async (req, res, next) => {
	const oktaJwtVerifier = new OktaJwtVerifier({
		clientId: sampleConfig.resourceServer.oidc.clientId,
		issuer: sampleConfig.resourceServer.oidc.issuer,
		assertClaims: sampleConfig.resourceServer.assertClaims,
		testing: sampleConfig.resourceServer.oidc.testing,
	});

	const authHeader = req.headers.authorization || '';
	const match = authHeader.match(/Bearer (.+)/);

	if (!match) {
		res.status(401);
		return next('Unauthorized');
	}

	const accessToken = match[1];
	const audience = sampleConfig.resourceServer.assertClaims.aud;
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
