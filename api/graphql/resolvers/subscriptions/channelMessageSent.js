const { pubsub, EVENTS } = require('../../pubsub');
const { withFilter } = require('graphql-subscriptions');
const { verify } = require('../../services/jwt');

module.exports = {
  subscribe: withFilter(
      () => pubsub.asyncIterator(EVENTS.CHANNEL_MESSAGE_SENT),
      async (payload, variables) => {
        let { access_token, channel_name } = variables;
        let decoded = await verify(access_token);

        // Only send back to folks who care about this subscription and have a valid JWT
        return decoded && payload.channelMessageSent.channel_name === channel_name;
      }
    )
};
