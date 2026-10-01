import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { sessionStorage } from 'aws-amplify/utils';
import { isLocalAuthentication } from './authMode';

const userPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID;
const userPoolClientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
const domain = import.meta.env.VITE_COGNITO_DOMAIN;

export function configureAuthentication() {
if (isLocalAuthentication()) return;
if (!userPoolId || !userPoolClientId || !domain) {
  throw new Error('Cognito environment variables are missing.');
} else { 


    Amplify.configure({
    Auth: {
        Cognito: {
        userPoolId,
        userPoolClientId,

        loginWith: {
            email: true,

            oauth: {
            domain,
            scopes: ['openid', 'email', 'profile'],
            redirectSignIn: [
                `${window.location.origin}/auth/callback`,
            ],
            redirectSignOut: [
                `${window.location.origin}/login`,
            ],
            responseType: 'code',
            },
        },
        },
    },
    });


// Keep tokens only for the current browser tab
cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);
}
}
