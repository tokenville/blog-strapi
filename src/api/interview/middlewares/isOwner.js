"use strict";

/**
 * `isOwner` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // If the request is made with an API token, skip the ownership check
    if (ctx.request.headers['authorization'] === `Bearer ${process.env.ADMIN_API_KEY}`) {
      return next();
    }

    const user = ctx.state.user;
    const entryId = ctx.params.id;

    try {
      if (entryId) {
        // Handle single entry scenario
        const entry = await strapi.entityService.findOne(
          "api::interview.interview",
          entryId,
          { populate: "*" }
        );

        if (!entry) {
          // Log an error if the entry is not found
          strapi.log.error(`Interview with ID ${entryId} not found`);
          return ctx.notFound('Interview not found');
        }

        if (!entry.owner) {
          // Log an error if the owner is not found
          strapi.log.error(`Owner for interview with ID ${entryId} not found`);
          return ctx.badRequest('Interview owner information is missing');
        }

        if (user.id !== entry.owner.id && entry.authorized && user.id !== entry.authorized.id) {
          // Log unauthorized access attempt
          strapi.log.warn(`User ${user.id} is not authorized to access interview ${entryId}`);
          return ctx.unauthorized("This action is unauthorized.");
        }
      } else {
        // Handle multiple entries scenario
        const entries = await strapi.entityService.findMany(
          "api::interview.interview",
          { ...ctx.query, populate: "*" }
        );

        for (const entry of entries) {
          if (!entry.owner || (user.id !== entry.owner.id && entry.authorized && user.id !== entry.authorized.id)) {
            // Log unauthorized access attempt for multiple entries
            strapi.log.warn(`User ${user.id} is not authorized to access interview ${entry.id}`);
            return ctx.unauthorized("This action is unauthorized.");
          }
        }
      }
      
      // Proceed to the next middleware or controller action
      await next();
    } catch (err) {
      // Log any unexpected errors
      strapi.log.error('Error in isOwner middleware:', err);
      return ctx.internalServerError('Internal Server Error');
    }
  };
};
