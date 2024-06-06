"use strict";

/**
 * `isOwner` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    console.log('isOwner middleware called from assistant');

    if (ctx.request.headers['authorization'] === `Bearer ${process.env.ADMIN_API_KEY}`) {
      console
      return next();
    }

    const user = ctx.state.user;
    const entryId = ctx.params.id ? ctx.params.id : undefined;
    let entry = {};

    if (entryId) {
      entry = await strapi.entityService.findOne(
        "api::assistant.assistant",
        entryId
      );
    }

    // Skip if entry or entry.owner is null
    if (!entry || !entry.owner) {
      return next();
    }

    console.log(entry.id);
    console.log(entry.owner.id);
    console.log(user.id);

    if (user.id !== entry.owner.id) {
      return ctx.unauthorized("This action is unauthorized.");
    } else {
      return next();
    }
  };
};