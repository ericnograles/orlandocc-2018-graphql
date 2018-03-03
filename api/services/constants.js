module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS: {
    URL: process.env.REDIS_URL,
    REFRESH_TOKENS_DB: process.env.REDIS_REFRESH_TOKENS_DB || 1
  }
};
