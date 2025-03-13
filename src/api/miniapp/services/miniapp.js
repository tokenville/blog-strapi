'use strict';

/**
 * miniapp service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::miniapp.miniapp');
