import { initAuth0 } from '@auth0/nextjs-auth0/edge';
import auth0Config from './lib/auth0-config';

const auth0 = initAuth0(auth0Config);

export default auth0.withMiddlewareAuthRequired();

export const config = {
  matcher: '/profile-middleware',
};
