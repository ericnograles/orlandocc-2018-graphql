const { createServer } = require('http');
const { ENVIRONMENT } = require('./config');
const { execute, subscribe } = require('graphql');
const { schema } = require('./graphql/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');

module.exports = websockets;

async function websockets(server) {
  return SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe
    },
    {
      server,
      path: '/'
    }
  );
}
