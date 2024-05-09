const Stripe = require('stripe');

module.exports = (plugin) => {
  
  const originalRegisterController = plugin.controllers.auth.register;

  plugin.controllers.auth.register = async (ctx) => {
    const originalResult = await originalRegisterController(ctx);
    let user = ctx.state.user || (originalResult && originalResult.user);

    if (!user) {
      const userId = ctx.response.body.user.id;
      user = await strapi.entityService.findOne('plugin::users-permissions.user', userId);
    }

    if (!user || !user.email) {
      console.error('User or email not available after fetching:', user);
      return;
    }
    
    const Stripe = require('stripe');
    const stripe = new Stripe(process.env.STRAPI_ADMIN_TEST_STRIPE_SECRET_KEY);
    try {
      const stripeCustomer = await stripe.customers.create({ email: user.email });
      await strapi.entityService.update('plugin::users-permissions.user', user.id, {
        data: { stripeCustomerId: stripeCustomer.id }
      });
      console.log('Stripe customer created:', stripeCustomer.id);
    } catch (error) {
      console.error('Error creating Stripe customer:', error);
    }
  };

  plugin.controllers.auth.getUserDetails = async (ctx) => {
    const user = ctx.state.user;
    if (!user) return ctx.badRequest("No authentication information found.");
    return ctx.send({ email: user.email, stripeCustomerId: user.stripeCustomerId });
  };

  // Correct way to add routes
  if (!plugin.routes['content-api']) {
    plugin.routes['content-api'] = { routes: [] };
  }

  return plugin;
};
