'use strict';

/**
 * white-label router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::white-label.white-label');
