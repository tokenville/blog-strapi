    // ~/strapi-aws-s3/backend/config/middlewares.js
    
    module.exports = [
    {
      settings: {
        cors: {
          enabled: true,
          origin: ['https://8d-1.com', 'https://www.8d-1.com', 'https://api.8d-1.com', 'https://www.api.8d-1.com', 'http://localhost:3000'], 
          headers: ['Content-Type', 'Authorization', 'X-Frame-Options'],
        },
      },
        name: 'strapi::security',
        config: {
          contentSecurityPolicy: {
            useDefaults: true,
            directives: {
              'connect-src': ["'self'", 'https:'],
              'img-src': [
                "'self'",
                'data:',
                'blob:',
                'dl.airtable.com',
                'strapi8d1.s3.eu-north-1.amazonaws.com',
              ],
              'media-src': [
                "'self'",
                'data:',
                'blob:',
                'dl.airtable.com',
                'strapi8d1.s3.eu-north-1.amazonaws.com',
              ],
              upgradeInsecureRequests: null,
            },
          },
        },
      },
      /* End of snippet */
      'strapi::cors',
      'strapi::poweredBy',
      'strapi::logger',
      'strapi::query',
      'strapi::body',
      'strapi::session',
      'strapi::favicon',
      'strapi::public',
    ];