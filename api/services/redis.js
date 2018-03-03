const Promise = require('bluebird');
const redis = require('redis');
const { REDIS } = require('../config');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const redisClient = redis.createClient({
  url: `${REDIS.URL}`
});

/**
 * Creates a new Redis client. Intended to be for clients that need to connect to a specific Redis DB.
 * @param {String} url - A valid Redis URI
 */
function createClient(url) {
  return redis.createClient({
    url
  });
}

async function set(redisDatabase, key, value) {
  return await redisClient
    .multi()
    .select(redisDatabase)
    .set(key, value)
    .execAsync();
}

async function get(redisDatabase, key) {
  redisClient.select(redisDatabase);
  return await redisClient.getAsync(key);
}

async function del(redisDatabase, key) {
  return await redisClient.multi().select(redisDatabase).del(key).execAsync();
}

module.exports = {
  set,
  del,
  get,
  redisClient,
  createClient
};
