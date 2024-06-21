const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports = async (policyContext, config, { strapi }) => {
  const token = policyContext.request.headers['authorization']?.split(' ')[1];

  if (!token) {
    console.log('No authorization token found');
    return policyContext.unauthorized('No authorization token found');
  }

  try {
    console.log('Authorization token:', token);

    // Fetch the Auth0 public key
    const response = await axios.get(`https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`);
    const keys = response.data.keys;
    const signingKeys = keys.filter(key => key.use === 'sig' && key.kty === 'RSA' && key.kid && (key.x5c && key.x5c.length));

    if (!signingKeys.length) {
      throw new Error('No signing keys found in JWKS endpoint');
    }

    const signingKey = signingKeys[0].x5c[0];
    const publicKey = `-----BEGIN CERTIFICATE-----\n${signingKey}\n-----END CERTIFICATE-----`;

    // Verify the token with the RS256 algorithm
    const decodedToken = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
      audience: process.env.AUTH0_CLIENT_ID,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    });

    if (typeof decodedToken === 'string') {
      console.error('JWT verification error: decoded token is a string');
      return policyContext.unauthorized('Invalid token');
    }

    // Attach user info to the context
    policyContext.state.user = decodedToken;
    return true;
  } catch (error) {
    console.error('JWT verification error:', error);
    return policyContext.unauthorized('Invalid token');
  }
};