const endpointUrl = 'http://localhost:4040/graphql'

module.exports = {
  service: {
    endpoint: {
      url: endpointUrl,
    },
  },
  client: {
    excludes: ['**/fragmentTypes.graphql'],
  },
}
