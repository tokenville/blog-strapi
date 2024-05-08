'use strict';

/**
 * base-assistant service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::base-assistant.base-assistant');
