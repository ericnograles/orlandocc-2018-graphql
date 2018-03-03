const joi = require('joi');
const envVarsSchema = joi
  .object({
    // TODO: Validate these a little more properly than just strings and numbers
    RATE_LIMIT_REQUESTS_PER_MINUTE: joi.number().integer().required(),
    RATE_LIMIT_MINUTES_TILL_RESET: joi.number().integer().required(),
    DATABASE_URL: joi.string().required(),
    REDIS_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    AUTH_SAML_ENABLED: joi.string().required(),
    AUTH_SALESFORCE_ENABLED: joi.string().required(),
    POSTGRES_LOGGING: joi.string().required(),
    RECREATE_SCHEMA: joi.string().required(),
    SALT_ROUNDS: joi.string().required(),
    POSTGRES_LOGGING: joi.string().required(),

    // SPA build variables
    REACT_APP_GRAPHQL_HTTP_URI: joi.string().required(),
    REACT_APP_GRAPHQL_WS_URI: joi.string().required()
  })
  .unknown()
  .required();

const { error } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Missing environment variables detected! ${error.message}`);
}

const port = process.env.PORT || 3001;
const isLocalDevelopment = port === 3001;

const ENVIRONMENT = {
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
  REDIS_URL: process.env.REDIS_URL,
  REDIS_SUBSCRIPTIONS_URL: process.env.REDIS_SUBSCRIPTIONS_URL,
  PORT: port,
  WS_PORT: isLocalDevelopment ? process.env.WS_PORT : process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN
};

const POSTGRES = {
  DATABASE_URL: process.env.DATABASE_URL,
  POSTGRES_LOGGING: process.env.POSTGRES_LOGGING,
  SCHEMA: process.env.POSTGRES_SCHEMA
};

const RATE_LIMITS = {
  REQUESTS_PER_MINUTE: parseInt(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE),
  MINUTES_TILL_RESET: parseInt(process.env.RATE_LIMIT_MINUTES_TILL_RESET)
};

const REDIS = {
  URL: process.env.REDIS_URL,
  RATE_LIMITER_DB: `0`,
  REFRESH_TOKENS_DB: `1`
};

module.exports = {
  ENVIRONMENT,
  RATE_LIMITS,
  REDIS,
  POSTGRES
};
