'use strict';

/**
 * white-label service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::white-label.white-label');
