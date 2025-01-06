module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/assistants',
      handler: 'api::assistant.assistant.find',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/assistants/count',
      handler: 'api::assistant.assistant.count',
      config: {
        policies: [],
      },
    },
    {
        method: 'GET',
        path: '/assistants/:id',
        handler: 'api::assistant.assistant.findOne',
        config: {
            policies: [],
        },
    },
    {
      method: 'POST',
      path: '/assistants',
      handler: 'api::assistant.assistant.create',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/assistants/:id',
      handler: 'api::assistant.assistant.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/assistants/:id',
      handler: 'api::assistant.assistant.delete',
      config: {
        policies: [],
      },
    },
    ...require('./custom-assistant').routes,
  ],
};
