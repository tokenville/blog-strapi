// config/plugins.js

module.exports = ({ env }) => ({
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        assistant: {
          field: 'slug',
          references: 'bot_name',
        },
      },
      slugifyWithCount: true,
      shouldUpdateSlug: false,
    },
  },
    email: {
      config: {
        provider: 'strapi-provider-email-resend',
        providerOptions: {
          apiKey: env('RESEND_API_KEY'), // Required
        },
        settings: {
          defaultFrom: 'no-reply@x.8d-1.com',
          defaultReplyTo: 'hello@8d-1.com',
        },
      }
    },    
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('CDN_URL'),
        rootPath: env('CDN_ROOT_PATH'),
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_ACCESS_SECRET'),
          },
          region: env('AWS_REGION'),
          params: {
            ACL: env('AWS_ACL', 'public-read'),
            signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
            Bucket: env('AWS_BUCKET'),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
    "strapi-google-auth": {
      enabled: false,
    },
    'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
      providers: {
        auth0: {
          enabled: true,
          icon: 'auth0',
          key: env('AUTH0_CLIENT_ID'),
          secret: env('AUTH0_CLIENT_SECRET'),
          callback: '/auth/auth0/callback',
          scope: ['openid', 'email', 'profile'],
        },
      },
    },
  },
});

