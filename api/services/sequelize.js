const { POSTGRES } = require('../config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(POSTGRES.DATABASE_URL, {
  logging: POSTGRES.POSTGRES_LOGGING === 'true'
});
module.exports = sequelize;
