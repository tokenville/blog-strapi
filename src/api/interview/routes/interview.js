const { createCoreRouter, createCoreController } = require('@strapi/strapi').factories;

module.exports = {
  routes: [
    // Manually define standard CRUD operations if needed or just add custom routes
    {
      method: 'GET',
      path: '/interviews', // Standard GET route
      handler: 'interview.find',
    },
    {
      method: 'GET',
      path: '/interviews/:id', // Standard GET by ID route
      handler: 'interview.findOne',
    },
    {
      method: 'POST',
      path: '/interviews', // Standard POST route
      handler: 'interview.create',
    },
    {
      method: 'PUT',
      path: '/interviews/:id', // Standard PUT route
      handler: 'interview.update',
    },
    {
      method: 'DELETE',
      path: '/interviews/:id', // Standard DELETE route
      handler: 'interview.delete',
    },
    // Your custom route for counting
    {
      method: 'GET',
      path: '/interviews/count/view', // Custom path for count
      handler: 'interview.count',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    }
  ]
};
