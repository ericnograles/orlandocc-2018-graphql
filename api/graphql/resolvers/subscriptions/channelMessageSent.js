const { pubsub, EVENTS } = require('../../pubsub');
// const { withFilter } = require('graphql-subscriptions');
//const { verify } = require('../../services/jwt');

console.log('importing channelMessagSent');
module.exports = {
  subscribe: () => {
    return pubsub.asyncIterator(EVENTS.CHANNEL_MESSAGE_SENT);
  }
  // subscribe: () => {
  //   return withFilter(
  //     () => pubsub.asyncIterator(EVENTS.CHANNEL_MESSAGE_SENT),
  //     async (payload, variables) => {
  //       let { access_token, channel_name } = variables;
  //       let decoded = verify(access_token);

  //       // Only send back to folks who care about this subscription and have a valid JWT
  //       return decoded && payload.channel_name === variables.channel_name;
  //     }
  //   )
  // }
};
