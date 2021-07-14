import ApolloClient from 'apollo-boost';

console.log(process.env.VUE_APP_GRAPHQL_URL);

const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_GRAPHQL_URL,
});

export default apolloClient;
