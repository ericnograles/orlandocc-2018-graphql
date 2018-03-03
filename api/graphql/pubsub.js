const { ENVIRONMENT, REDIS } = require('../config');
const { RedisPubSub } = require('graphql-redis-subscriptions');
const Redis = require('ioredis');

const pubsub = new RedisPubSub({
  publisher: new Redis(REDIS.URL),
  subscriber: new Redis(REDIS.URL)
});

const EVENTS = {
  USER_LOGGED_IN: 'USER_LOGGED_IN'
};

module.exports = {
  pubsub,
  EVENTS
};
