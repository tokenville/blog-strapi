module.exports = {
    // Existing or other custom methods
  
    getUserDetails: async (ctx) => {
      const user = ctx.state.user;
      if (!user) return ctx.badRequest("No authentication information found.");
      return ctx.send({ email: user.email, stripeCustomerId: user.stripeCustomerId });
    }
  };
  