const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const winston = require('winston');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const path = require('path');
const connectToPassport = require('./middleware/passport');
const cors = require('cors');
const models = require('./models');
const helmet = require('helmet');

const { redisClient, createClient } = require('./services/redis');
const { ENVIRONMENT, RATE_LIMITS, REDIS } = require('./config');
const Schema = require('./graphql/schema');

module.exports = api;

async function api(app) {
  const limiter = require('express-limiter')(app, redisClient);
  limiter({
    path: '*',
    method: 'all',
    lookup: ['connection.remoteAddress'],
    total:
      RATE_LIMITS.REQUESTS_PER_MINUTE *
      RATE_LIMITS.MINUTES_TILL_RESET,
    expire: 1000 * 60 * RATE_LIMITS.MINUTES_TILL_RESET
  });
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app = connectToPassport(app);

  // GraphQL Boilerplate follows
  const schemaFunction =
    Schema.schemaFunction ||
    function() {
      return Schema.schema;
    };
  let schema;
  const rootFunction =
    Schema.rootFunction ||
    function() {
      return schema.rootValue;
    };
  const contextFunction =
    Schema.context ||
    function(headers, secrets) {
      return Object.assign(
        {
          headers: headers
        },
        secrets
      );
    };

  app.use(
    '/api',
    bodyParser.json(),
    graphqlExpress(async request => {
      if (!schema) {
        schema = schemaFunction(process.env);
      }
      const context = await contextFunction(request.headers, process.env);
      const rootValue = await rootFunction(request.headers, process.env);

      return {
        schema: await schema,
        rootValue,
        context,
        tracing: !ENVIRONMENT.IS_PRODUCTION
      };
    })
  );

  app.use(
    '/explorer',
    graphiqlExpress({
      endpointURL: '/api',
      subscriptionsEndpoint: `ws://localhost:${ENVIRONMENT.WS_PORT}/`,
      query: ``
    })
  );

  await models.Migrations.MigratePermission();
  await models.Migrations.MigrateUser();
  return app;
}
