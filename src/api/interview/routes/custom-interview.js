module.exports = {
  routes: [
    { // Path defined with an URL parameter
      method: 'GET',
      path: '/interviews/count/view', 
      handler: 'interview.count',
    }
  ]
}