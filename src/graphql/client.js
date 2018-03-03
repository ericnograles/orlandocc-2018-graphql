import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Create an http link:
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_URI
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_WS_URI,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
});
