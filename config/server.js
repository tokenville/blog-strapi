module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('', 'http://localhost:1337'),
  stripe: {
    secretKey: env('STRIPE_SECRET_KEY'),
  },
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  auth0: {
    domain: env('AUTH0_DOMAIN'),
    audience: env('AUTH0_AUDIENCE'),
  },
});