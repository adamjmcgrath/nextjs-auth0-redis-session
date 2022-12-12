import { Auth0Server, initAuth0 } from '@auth0/nextjs-auth0';
import config from './auth0-config';

let _auth0: Auth0Server;

export default function auth0() {
  if (!_auth0) {
    _auth0 = initAuth0(config);
  }
  return _auth0;
}
