const { createCoreRouter, createCoreController } = require('@strapi/strapi').factories;

module.exports = {
  routes: [
    // Manually define standard CRUD operations if needed or just add custom routes
    {
      method: 'GET',
      path: '/assistants', // Standard GET route
      handler: 'assistant.find',
    },
    {
      method: 'GET',
      path: '/assistants/:id', // Standard GET by ID route
      handler: 'assistant.findOne',
    },
    {
      method: 'POST',
      path: '/assistants', // Standard POST route
      handler: 'assistant.create',
    },
    {
      method: 'PUT',
      path: '/assistants/:id', // Standard PUT route
      handler: 'assistant.update',
    },
    {
      method: 'DELETE',
      path: '/assistants/:id', // Standard DELETE route
      handler: 'assistant.delete',
    },
    // Your custom route for counting
    {
      method: 'GET',
      path: '/assistants/count/view', // Custom path for count
      handler: 'assistant.count',
    }
  ]
};
