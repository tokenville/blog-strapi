module.exports = [
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://8d-1.com', 'https://www.8d-1.com', 'https://api.8d-1.com', 'https://www.api.8d-1.com', 'https://data.8d-1.com', 'https://www.data.8d-1.com', 'http://localhost:3000', 'http://localhost:1337', 'via.placeholder.com', 'http://192.168.3.7:3000', 'http://127.0.0.1:3000'],
      headers: ['Content-Type', 'Authorization', 'X-Frame-Options'],
    },
  },
  {
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
  'strapi::errors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];