const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const winston = require('winston');
const bodyParser = require('body-parser'); 
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const { ENVIRONMENT } = require('./config');
const Schema = require('./graphql/schema');

module.exports = api;

async function api(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

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

  return app;
}
