const assistant = require("../../../src/api/assistant/controllers/assistant");

module.exports = ({ env }) => ({
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        assistant: {
          field: 'slug',
          references: 'bot_name'
        },
      },
    },
  },
    "strapi-google-auth": {
        enabled: true,
      },
    upload: {
      config: {
        provider: 'aws-s3', // For community providers pass the full package name (e.g. provider: 'strapi-provider-upload-google-cloud-storage')
        providerOptions: {
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_ACCESS_SECRET'),
          region: env('AWS_REGION'),
          params: {
            ACL: env('AWS_ACL', 'public-read'), // 'private' if you want to make the uploaded files private
            Bucket: env('AWS_BUCKET'),
          },
        },
      },
    },
    // ...
  });