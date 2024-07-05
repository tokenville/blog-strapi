'use strict';

/**
 * stripe-setting service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::stripe-setting.stripe-setting');
