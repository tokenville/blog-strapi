module.exports = {
  routes: [
    { // Path defined with an URL parameter
      method: 'GET',
      path: '/assistants/count/view', 
      handler: 'assistant.count',
    }
  ]
}