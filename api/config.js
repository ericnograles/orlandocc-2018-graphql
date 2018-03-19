const joi = require('joi');
const envVarsSchema = joi
  .object({
    // Secrets
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
    // Redis for Subscriptions Caching
    REDIS_URL: joi.string().required(),
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
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  PORT: port,
  LOCAL_SSL_PORT: 443,
  // In production, we serve WS over the same port as the Web App, under the assumption
  // we are behind a load balancer
  WS_PORT: isLocalDevelopment ? process.env.WS_PORT : port,
  WS_URI: process.env.REACT_APP_GRAPHQL_WS_URI
};

const REDIS = {
  URL: process.env.REDIS_URL
};

module.exports = {
  ENVIRONMENT,
  REDIS
};
