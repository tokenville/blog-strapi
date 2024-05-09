'use strict';

/**
 * interview controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::interview.interview', ({ strapi }) => ({
  // Extend core logic here

  async count(ctx) {
    console.log("Received query parameters:", ctx.query);
    // Use the query from the context to fetch the count from the service
    const { query } = ctx;

    // Call the count method from the core service
    const count = await strapi.entityService.count('api::interview.interview', query);

    // Correctly set the count in the response body
    ctx.body = { count };
  },

  // Add other custom actions here
}));
