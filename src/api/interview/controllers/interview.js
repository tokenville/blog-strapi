// api/interview/controllers/interview.js

module.exports = {
  async createOrUpdateInterview(ctx) {
    const { assistantId, userInfo } = ctx.request.body;
    const user = ctx.state.user; // This will be the user from Auth0, mapped to Strapi

    // Check if an interview already exists for this user and assistant
    let interview = await strapi.services.interview.findOne({
      human: user.id,
      assistant: assistantId
    });

    if (!interview) {
      // If no interview exists, create a new one
      interview = await strapi.services.interview.create({
        human: user.id,
        assistant: assistantId,
        thread_id: generateUniqueThreadId(), // Implement this function
        transcript: [],
        userInfo
      });
    } else {
      // If an interview exists, update it
      interview = await strapi.services.interview.update(
        { id: interview.id },
        { userInfo }
      );
    }

    return {
      interviewId: interview.id,
      threadId: interview.thread_id
    };
  },

  async getInterview(ctx) {
    const { id } = ctx.params;
    const user = ctx.state.user;

    const interview = await strapi.services.interview.findOne({ id }, ['human', 'assistant']);

    if (!interview || (interview.human.id !== user.id && interview.assistant.owner.id !== user.id)) {
      return ctx.unauthorized('You do not have access to this interview');
    }

    return interview;
  }
};