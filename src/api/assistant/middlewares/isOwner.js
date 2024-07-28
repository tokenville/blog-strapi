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

    // Check if user is defined
    if (!user || !user.id) {
      strapi.log.error('User is not authenticated or missing ID');
      return ctx.unauthorized("Authentication required");
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
          strapi.log.error(`Assistant with ID ${entryId} not found`);
          return ctx.notFound('Assistant not found');
        }

        // Check if owner exists and has an id
        const ownerId = entry.owner && entry.owner.id;
        if (!ownerId) {
          strapi.log.error(`Owner for assistant with ID ${entryId} not found or missing ID`);
          return ctx.badRequest('Assistant owner information is missing or invalid');
        }

        // Check if authorized user exists and has an id
        const authorizedId = entry.authorized && entry.authorized.id;

        if (ctx.method === 'GET') {
          // Allow read access if user is owner or authorized
          if (user.id !== ownerId && (!authorizedId || user.id !== authorizedId)) {
            strapi.log.warn(`User ${user.id} is not authorized to access assistant ${entryId}`);
            return ctx.unauthorized("This action is unauthorized.");
          }
        } else {
          // For non-GET methods (update, delete), check ownership strictly
          if (user.id !== ownerId && (!authorizedId || user.id !== authorizedId)) {
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
            (entry.owner && user.id === entry.owner.id) || 
            (entry.authorized && entry.authorized.id && user.id === entry.authorized.id)
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