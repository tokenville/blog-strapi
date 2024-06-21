const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::assistant.assistant", {
  config: {
    find: {
      middlewares: [],
    },
    findOne: {
      middlewares: [],
    },
    create: {
      middlewares: [], // Assuming create does not need ownership check
    },
    update: {
      middlewares: ["api::assistant.is-owner"],
    },
    delete: {
      middlewares: ["api::assistant.is-owner"],
    },
  },
});
