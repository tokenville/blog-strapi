"use strict";

/**
 * `isOwner` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    const entryId = ctx.params.id;

    // Allow access for admin API key
    if (ctx.request.headers['authorization'] === `Bearer ${process.env.ADMIN_API_KEY}`) {
      return next();
    }

    try {
      if (entryId) {
        // Handle single entry scenario
        const entry = await strapi.entityService.findOne(
          "api::assistant.assistant",
          entryId,
          { populate: "*" }
        );

        if (!entry) {
          strapi.log.error(`assistant with ID ${entryId} not found`);
          return ctx.notFound('assistant not found');
        }

        if (!entry.owner) {
          strapi.log.error(`Owner for assistant with ID ${entryId} not found`);
          return ctx.badRequest('assistant owner information is missing');
        }

        if (ctx.method === 'GET') {
          // Allow read access if user is owner or authorized
          if (user.id !== entry.owner.id && (!entry.authorized || user.id !== entry.authorized.id)) {
            strapi.log.warn(`User ${user.id} is not authorized to access assistant ${entryId}`);
            return ctx.unauthorized("This action is unauthorized.");
          }
        } else {
          // For non-GET methods (update, delete), check ownership strictly
          if (user.id !== entry.owner.id && (!entry.authorized || user.id !== entry.authorized.id)) {
            strapi.log.warn(`User ${user.id} is not authorized to modify assistant ${entryId}`);
            return ctx.unauthorized("This action is unauthorized.");
          }
        }
      } else {
        // Handle multiple entries scenario
        if (ctx.method === 'GET') {
          const entries = await strapi.entityService.findMany(
            "api::assistant.assistant",
            { ...ctx.query, populate: "*" }
          );

          const authorizedEntries = entries.filter(entry =>
            user.id === entry.owner.id || (entry.authorized && user.id === entry.authorized.id)
          );

          ctx.body = authorizedEntries;
          return;
        } else {
          // For non-GET methods on multiple entries, prevent operation
          strapi.log.warn(`User ${user.id} is not authorized to modify multiple assistants`);
          return ctx.unauthorized("This action is unauthorized.");
        }
      }

      // Proceed to the next middleware or controller action
      await next();
    } catch (err) {
      strapi.log.error('Error in isOwner middleware:', err);
      return ctx.internalServerError('Internal Server Error');
    }
  };
};
