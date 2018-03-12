// This will load all *.js resolvers and assign them to one literal to be assembled by graphql-tools
const path = require('path');
const assembleResolvers = require('./assembleResolvers');

module.exports = {
  Mutation: assembleResolvers(path.resolve(__dirname, './mutations')),
  Query: assembleResolvers(path.resolve(__dirname, './query')),
  Subscription: assembleResolvers(path.resolve(__dirname, './subscriptions')),
};
