module.exports = (plugin) => {
  const originalRegisterController = plugin.controllers.auth.register;

  plugin.controllers.auth.register = async (ctx) => {
    const originalResult = await originalRegisterController(ctx);
    let user = ctx.state.user || (originalResult && originalResult.user);

    if (!user && ctx.response.body && ctx.response.body.user) {
      const userId = ctx.response.body.user.id;
      user = await strapi.entityService.findOne('plugin::users-permissions.user', userId);
    }

    if (!user || !user.email) {
      console.error('User or email not available after fetching:', user);
      return;
    }

    const Stripe = require('stripe');
    // @ts-ignore
    const stripe = new Stripe(process.env.STRAPI_ADMIN_TEST_STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10'
    });

    try {
      // Fetch settings from Strapi
      const stripeSetting = await strapi.entityService.findOne('api::stripe-setting.stripe-setting', 1, {
        fields: ['priceId', 'discounts']
      });

      console.log('Stripe setting fetched:', stripeSetting);

      if (!stripeSetting) {
        console.error('Stripe settings not found');
        return;
      }

      // @ts-ignore
      const { priceId, discounts } = stripeSetting;

      console.log('priceId:', priceId);
      console.log('discounts:', discounts);

      if (typeof priceId !== 'string') {
        console.error('priceId is undefined or not a string');
        return;
      }

      // Create Stripe customer
      const stripeCustomer = await stripe.customers.create({ email: user.email });
      await strapi.entityService.update('plugin::users-permissions.user', user.id, {
        data: { stripeCustomerId: stripeCustomer.id }
      });
      console.log('Stripe customer created:', stripeCustomer.id);

      // Create Stripe subscription
      const subscriptionParams = {
        customer: stripeCustomer.id,
        items: [{ price: priceId }],
      };

      if (discounts && typeof discounts === 'object' && 'coupon' in discounts) {
        subscriptionParams.discounts = [{ coupon: discounts.coupon }];
      }

      await stripe.subscriptions.create(subscriptionParams);
      console.log('Default subscription enabled for user:', user.email);
    } catch (error) {
      console.error('Error creating Stripe customer or subscription:', error);
    }
  };

  plugin.controllers.auth.getUserDetails = async (ctx) => {
    const user = ctx.state.user;
    if (!user) return ctx.badRequest("No authentication information found.");
    return ctx.send({ email: user.email, stripeCustomerId: user.stripeCustomerId });
  };

  if (!plugin.routes['content-api']) {
    plugin.routes['content-api'] = { routes: [] };
  }

  plugin.routes['content-api'].routes.push({
    method: 'GET',
    path: '/auth/get-user-details',
    handler: 'auth.getUserDetails',
    config: {
      policies: ['global::isauth'],
    },
  });

  return plugin;
};