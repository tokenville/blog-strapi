module.exports = {
  routes: [
    { // Path defined with an URL parameter
      method: 'GET',
      path: '/assistants/count/view',
      handler: 'api::assistant.assistant.count', // Correct handler format
    },
  ]
}
