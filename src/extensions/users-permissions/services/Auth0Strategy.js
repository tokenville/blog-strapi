// extensions/users-permissions/services/Auth0Strategy.js

const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

const verifyToken = (token) => {
  const client = jwksRsa({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  });

  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      (header, callback) => {
        client.getSigningKey(header.kid, (err, key) => {
          if (err) {
            return callback(err);
          }
          const signingKey = key.publicKey || key.rsaPublicKey;
          callback(null, signingKey);
        });
      },
      {
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256']
      },
      (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      }
    );
  });
};

module.exports = {
  name: 'auth0',
  authenticate: async (ctx) => {
    const token = ctx.request.header.authorization.replace('Bearer ', '');

    try {
      const decodedToken = await verifyToken(token);

      // Find or create user in Strapi
      let user = await strapi.query('user', 'users-permissions').findOne({ auth0Id: decodedToken.sub });

      if (!user) {
        user = await strapi.query('user', 'users-permissions').create({
          username: decodedToken.email,
          email: decodedToken.email,
          auth0Id: decodedToken.sub,
          provider: 'auth0',
          confirmed: true,
        });
      }

      return { authenticated: true, credentials: user };
    } catch (error) {
      return { authenticated: false };
    }
  }
};