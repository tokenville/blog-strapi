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
    },
  },
  'file-system': {
    enabled: true,
  },
  email: {
    config: {
      provider: 'strapi-provider-email-resend',
      providerOptions: {
        apiKey: env('RESEND_API_KEY'),
      },
      settings: {
        defaultFrom: 'no-reply@x.8d-1.com',
        defaultReplyTo: 'hello@8d-1.com',
      },
    },
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_ACCESS_SECRET'),
          },
          region: env('AWS_REGION'),
          params: {
            Bucket: env('AWS_BUCKET'),
          },
        },
      },
      actionOptions: {
        upload: {
          // Ensure correct Content-Type handling
          contentType: (file) => {
            if (file.name.endsWith('.svg')) {
              return 'image/svg+xml';
            }
            return file.mime || file.type;
          },
        },
      },
    },
  },
  "strapi-google-auth": {
    enabled: false,
  },
});
