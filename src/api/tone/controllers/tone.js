'use strict';

/**
 * tone controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tone.tone');
