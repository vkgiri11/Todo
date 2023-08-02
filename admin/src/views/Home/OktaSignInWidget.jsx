import React, { useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignIn from '@okta/okta-signin-widget';
import config from '../.././../config';

const OktaSignInWidget = () => {
	const widgetRef = useRef();

	const { oktaAuth } = useOktaAuth();

	useEffect(() => {
		if (!widgetRef.current) return false;

		const { issuer, clientId, redirectUri, scopes } = config.oidc;

		const searchParams = new URL(window.location.href).searchParams;
		const otp = searchParams.get('otp');
		const state = searchParams.get('state');

		const widget = new OktaSignIn({
			baseUrl: issuer.split('/oauth2')[0],
			clientId,
			redirectUri,
			i18n: {
				en: {
					'primaryauth.title': 'Sign in to To-Do List',
				},
			},
			authParams: {
				issuer,
				scopes,
			},
			state,
			otp,
		});

		widget.renderEl(
			{ el: widgetRef.current },
			(res) => {
				oktaAuth.handleLoginRedirect(res.tokens);
			},
			(err) => {
				throw err;
			}
		);

		return () => widget.remove();
	}, [oktaAuth]);

	return (
		<>
			<div ref={widgetRef} />
		</>
	);
};

export default OktaSignInWidget;
