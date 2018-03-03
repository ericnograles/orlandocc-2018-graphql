const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');

const typeDefs = importSchema(path.resolve(__dirname + '/types/Query.graphql'));
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

function context(headers, secrets) {
  return {
    headers,
    secrets
  };
}

module.exports = {
  schema,
  context
};
