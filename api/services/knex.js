const knex = require('knex');
const pg = require('pg');
const { POSTGRES } = require('../config');

pg.defaults.ssl =
  POSTGRES.DATABASE_URL.indexOf('127.0.0.1') < 0 &&
  POSTGRES.DATABASE_URL.indexOf('app_postgres') < 0;

module.exports = knex({
  client: 'pg',
  connection: POSTGRES.DATABASE_URL,
  searchPath: POSTGRES.SCHEMA || 'public'
});
