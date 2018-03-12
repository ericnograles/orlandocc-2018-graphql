const { ENVIRONMENT, REDIS } = require('../config');
const { RedisPubSub } = require('graphql-redis-subscriptions');
const Redis = require('ioredis');
console.log('importing pubSub');
console.log(REDIS.URL);
const pubsub = new RedisPubSub({
  publisher: new Redis(REDIS.URL),
  subscriber: new Redis(REDIS.URL)
});

const EVENTS = {
  CHANNEL_MESSAGE_SENT: `CHANNEL_MESSAGE_SENT`
};

module.exports = {
  pubsub,
  EVENTS
};
