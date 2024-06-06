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
    const entryId = ctx.params.id ? ctx.params.id : undefined;
    let entry = {};

    if (entryId) {
      entry = await strapi.entityService.findOne(
        "api::interview.interview",
        entryId,
        { populate: "*" }
      );
    }

    // Skip if entry or entry.owner is null
    if (!entry || !entry.owner) {
      return next();
    }

if (user.id !== entry.owner.id && entry.authorized && user.id !== entry.authorized.id) {
    return ctx.unauthorized("This action is unauthorized.");
  } else {
    return next();
}
  };
};