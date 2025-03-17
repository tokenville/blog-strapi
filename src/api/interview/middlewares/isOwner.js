"use strict";

/**
 * `isOwner` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // If the request is made with an API token, skip the ownership check
    if (ctx.request.headers['authorization'] === `Bearer ${process.env.ADMIN_API_KEY}`) {
      console.log('Admin API key detected');
      return next();
    }

    const user = ctx.state.user;
    const entryId = ctx.params.id;

    // Check if user is defined
    if (!user || !user.id) {
      strapi.log.error('User is not authenticated or missing ID');
      return ctx.unauthorized("Authentication required");
    }

    try {
      if (entryId) {
        console.log('Checking single entry ownership');
        const entry = await strapi.entityService.findOne(
          "api::interview.interview",
          entryId,
          { populate: "*" }
        );

        if (!entry) {
          console.log(`Interview with ID ${entryId} not found`);
          strapi.log.error(`Interview with ID ${entryId} not found`);
          return ctx.notFound('Interview not found');
        }

        if (!entry.owner) {
          console.log(`Owner for interview with ID ${entryId} not found`);
          strapi.log.error(`Owner for interview with ID ${entryId} not found`);
          return ctx.badRequest('Interview owner information is missing');
        }

        if (user.id !== entry.owner.id && entry.authorized && user.id !== entry.authorized.id) {
          console.log(`User ${user.id} is not authorized to access interview ${entryId}`);
          strapi.log.warn(`User ${user.id} is not authorized to access interview ${entryId}`);
          return ctx.unauthorized("This action is unauthorized.");
        }
      } else {
        console.log('Checking multiple entry ownership');

        // For GET requests, filter entries instead of blocking access
        if (ctx.method === 'GET') {
          const entries = await strapi.entityService.findMany(
            "api::interview.interview",
            { ...ctx.query, populate: "*" }
          );

          // Filter entries to only include those the user is authorized to access
          const authorizedEntries = entries.filter(entry =>
            (entry.owner && user.id === entry.owner.id) ||
            (entry.authorized && entry.authorized.id && user.id === entry.authorized.id)
          );

          // Replace the response with only authorized entries
          ctx.body = authorizedEntries;
          return;
        } else {
          // For non-GET methods on multiple entries
          const entries = await strapi.entityService.findMany(
            "api::interview.interview",
            { ...ctx.query, populate: "*" }
          );

          for (const entry of entries) {
            if (!entry.owner || (user.id !== entry.owner.id && entry.authorized && user.id !== entry.authorized.id)) {
              console.log(`User ${user.id} is not authorized to access interview ${entry.id}`);
              strapi.log.warn(`User ${user.id} is not authorized to access interview ${entry.id}`);
              console.log('Entry:', entry);
              return ctx.unauthorized("This action is unauthorized.");
            }
          }
        }
      }

      // Proceed to the next middleware or controller action
      console.log('User is authorized to access the interview');
      await next();
    } catch (err) {

      strapi.log.error('Error in isOwner middleware:', err);
      return ctx.internalServerError('Internal Server Error');
    }
  };
};
