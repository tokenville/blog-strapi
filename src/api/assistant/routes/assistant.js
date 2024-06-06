const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::assistant.assistant", {
  config: {
    update: {
      middlewares: ["api::assistant.is-owner"],
    },
    delete: {
      middlewares: ["api::assistant.is-owner"],
    },
  },
});