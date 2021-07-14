module.exports = {
  client: {
    service: {
      name: 'book-shook',
      // URL to the GraphQL API
      url: process.env.VUE_APP_GRAPHQL_URL,
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js'],
  },
};
