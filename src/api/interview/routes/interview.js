const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::interview.interview", {
  config: {
    update: {
      middlewares: ["api::interview.is-owner"],
    },
    delete: {
      middlewares: ["api::interview.is-owner"],
    },
    find: {
      middlewares: ["api::interview.is-owner"],
    },
    findOne: {
      middlewares: ["api::interview.is-owner"],
    },
  },
});