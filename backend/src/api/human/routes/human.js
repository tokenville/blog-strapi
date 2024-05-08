const { createCoreRouter, createCoreController } = require('@strapi/strapi').factories;

module.exports = {
  routes: [
    // Manually define standard CRUD operations if needed or just add custom routes
    {
      method: 'GET',
      path: '/humans', // Standard GET route
      handler: 'human.find',
    },
    {
      method: 'GET',
      path: '/humans/:id', // Standard GET by ID route
      handler: 'human.findOne',
    },
    {
      method: 'POST',
      path: '/humans', // Standard POST route
      handler: 'human.create',
    },
    {
      method: 'PUT',
      path: '/humans/:id', // Standard PUT route
      handler: 'human.update',
    },
    {
      method: 'DELETE',
      path: '/humans/:id', // Standard DELETE route
      handler: 'human.delete',
    },
    // Your custom route for counting
    {
      method: 'GET',
      path: '/humans/count/view', // Custom path for count
      handler: 'human.count',
    }
  ]
};
