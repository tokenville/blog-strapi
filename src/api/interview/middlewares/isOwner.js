const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

const jwksClient = jwksRsa({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

const getKey = (header, callback) => {
  jwksClient.getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.error('Error getting signing key:', err);
      return callback(err);
    }
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

const validateAuth0Token = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, {
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    console.log('isOwner middleware started');
    const authHeader = ctx.request.headers['authorization'];
    console.log('Authorization header:', authHeader);

    if (authHeader === `Bearer ${process.env.ADMIN_API_KEY}`) {
      console.log('Admin API key used, bypassing checks');
      return next();
    }

    let user;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length);
      try {
        // Try to validate as a Strapi JWT first
        user = await strapi.plugins['users-permissions'].services.jwt.verify(token);
        console.log('Strapi JWT validated successfully', user);
      } catch (strapiErr) {
        console.log('Strapi JWT validation failed, attempting Auth0 validation');
        try {
          // If Strapi validation fails, try Auth0
          const decodedAuth0 = await validateAuth0Token(token);
          console.log('Auth0 token validated successfully', decodedAuth0);
          user = { 
            id: decodedAuth0.sub.replace('auth0|', ''),
            email: decodedAuth0.email
          };
        } catch (auth0Err) {
          console.error('Auth0 token validation failed:', auth0Err);
          return ctx.unauthorized('Invalid token');
        }
      }
    }

    if (!user) {
      console.log('No user authenticated');
      return ctx.unauthorized('Authentication required');
    }

    console.log('Authenticated user:', user);

    const entryId = ctx.params.id;
    const contentType = ctx.request.url.includes('interviews') ? 'api::interview.interview' : 'api::assistant.assistant';
    console.log(`Content type: ${contentType}, Entry ID: ${entryId}`);

    try {
      if (entryId) {
        console.log(`Fetching single entry with ID ${entryId}`);
        const entry = await strapi.entityService.findOne(contentType, entryId, { populate: ["owner", "human"] });

        if (!entry) {
          console.error(`Entry with ID ${entryId} not found`);
          return ctx.notFound('Entry not found');
        }

        console.log('Entry found:', entry);

        if (!entry.owner) {
          console.error(`Owner for entry with ID ${entryId} not found`);
          return ctx.badRequest('Entry owner information is missing');
        }

        const isOwner = user.id === entry.owner.id || user.email === entry.owner.email;
        const isHuman = entry.human && (user.id === entry.human.id || user.email === entry.human.email);

        console.log(`Is owner: ${isOwner}, Is human: ${isHuman}`);

        if (!isOwner && !isHuman) {
          console.warn(`User ${user.id || user.email} is not authorized to access entry ${entryId}`);
          return ctx.unauthorized("This action is unauthorized.");
        }
      } else {
        console.log('Handling multiple entries query');
        ctx.query.filters = ctx.query.filters || {};
        const orConditions = [];
        
        if (user.id) {
          orConditions.push({ owner: user.id });
          orConditions.push({ human: user.id });
        }
        if (user.email) {
          orConditions.push({ 'owner.email': user.email });
          orConditions.push({ 'human.email': user.email });
        }
        
        if (orConditions.length > 0) {
          ctx.query.filters.$or = orConditions;
        }
        
        console.log('Modified query filters:', ctx.query.filters);
      }
      
      console.log('Authorization check passed, proceeding to next middleware');
      await next();
    } catch (err) {
      console.error('Error in isOwner middleware:', err);
      return ctx.internalServerError('Internal Server Error');
    }
  };
};