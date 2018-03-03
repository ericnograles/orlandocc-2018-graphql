const { pubsub, EVENTS } = require('../../pubsub');

module.exports = {
  subscribe: () => {
    return pubsub.asyncIterator(EVENTS.USER_LOGGED_IN);
  }
};
