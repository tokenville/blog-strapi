'use strict';

/**
 * white-label controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::white-label.white-label');
