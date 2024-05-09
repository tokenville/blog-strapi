'use strict';

/**
 * human controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::human.human', ({ strapi }) => ({
  // Extend core logic here

  async count(ctx) {
    // Use the query from the context to fetch the count from the service
    const { query } = ctx;

    // Call the count method from the core service
    const count = await strapi.entityService.count('api::human.human', query);

    // Send the count in the response
    return { count };
  },

  // Add other custom actions here
}));
