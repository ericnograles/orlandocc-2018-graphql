const { createServer } = require('http');
const { ENVIRONMENT } = require('./config');
const { execute, subscribe } = require('graphql');
const { schema } = require('./graphql/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const WebSocket = require('ws');

module.exports = websockets;

async function websockets(server) {
  const websocketServer = new WebSocket.Server({
    server
  });

  return SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe
    },
    {
      server: websocketServer,
      path: '/'
    }
  );
}
