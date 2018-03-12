const { ENVIRONMENT } = require('../../../config');
const { pubsub, EVENTS } = require('../../pubsub');
const { verify } = require('../../services/jwt');

module.exports = async (root, args, context) => {
  const { channel_name, access_token, text } = args;

  // Verify JWT
  let decodedToken = await verify(access_token);

  if (decodedToken) {
    pubsub.publish(EVENTS.CHANNEL_MESSAGE_SENT, {
      channelMessageSent: {
        channel_name,
        text,
        sender_email: decodedToken.email
      }
    });

    return 'OK';
  } else {
    throw new Error(`Unauthorized access detected`);
  }
};
