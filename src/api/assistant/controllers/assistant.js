'use strict';

/**
 * assistant controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::assistant.assistant', ({ strapi }) => ({
  async count(ctx) {
    const { query } = ctx;

    const assistants = await strapi.entityService.findMany(
      "api::assistant.assistant",
      {
        ...query,
        populate: ["interviews.human"]  // Populate human through interviews
      }
    );

    const stats = assistants.map(assistant => {
      // Get unique humans by using Set
      const uniqueHumans = new Set(
        assistant.interviews?.map(interview => interview.human?.id).filter(Boolean)
      );

      return {
        id: assistant.id,
        interviews: assistant.interviews?.length || 0,
        humans: uniqueHumans.size
      };
    });

    return { stats };
  }
}));
