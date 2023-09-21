import { ManagementClient, AuthenticationClient, ManagementClientOptions, AuthenticationClientOptions } from 'auth0'

export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || 'dev-4vfo0kcdiu3gmzpj.us.auth0.com';
export const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || '28RyGcILBsjH19MWvtcKtWQizvQ1FnY6';
export const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET || 'Nx0Trrrbi7uUej4pXtS2ao5Uid338-wt_N3bFCk8Kj4GcCJl9jrV4O3arPnaDvQ1';
export const AUTH0_CONNECTION_ID = process.env.AUTH0_CONNECTION_ID || 'con_1wJZvL0wp9SZdJXa';
export const AUTH0_CONNECTION = process.env.AUTH0_CONNECTION || 'Username-Password-Authentication';

const managementClientOptions: ManagementClientOptions = {
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET
}

const auth0Management: ManagementClient = new ManagementClient(managementClientOptions)

const authenticationClientOptions:AuthenticationClientOptions = {
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID
}

const auth0Authentication: AuthenticationClient = new AuthenticationClient(authenticationClientOptions)

export { auth0Management, auth0Authentication }
