'use strict';

/**
 * stripe-setting router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::stripe-setting.stripe-setting');
