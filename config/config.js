import * as envConfig from './local.json'
// FIXME to make envConfig dependant on process.env.ENV

export default {
  APIUrl: process.env.VUE_APP_API_URL || envConfig.APIUrl,
  API: {
    host: process.env.VUE_APP_API_HOST || envConfig.API.host,
    port: process.env.VUE_APP_API_PORT || envConfig.API.port,
    schema: process.env.VUE_APP_API_SCHEMA || envConfig.API.schema
  },
  auth0: {
    clientID: process.env.VUE_APP_AUTH0_CLIENT_ID || envConfig.auth0.clientID,
    domain: process.env.VUE_APP_AUTH0_DOMAIN || envConfig.auth0.domain,
    redirectUri: process.env.VUE_APP_AUTH0_REDIRECT_URI || envConfig.auth0.redirectUri,
    responseType: process.env.VUE_APP_AUTH0_RESPONSE_TYPE || envConfig.auth0.responseType,
    scope: process.env.VUE_APP_AUTH0_SCOPE || envConfig.auth0.scope,
    audience: process.env.VUE_APP_AUTH0_AUDIENCE || envConfig.auth0.audience
  },
  googleAnalytics: {
    id: process.env.VUE_APP_GA_ID || envConfig.googleAnalytics.id
  }
}
