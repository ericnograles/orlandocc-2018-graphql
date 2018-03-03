const { User, UserEmail, UserProfile } = require('./User');
const MigrateUser = require('./User').migrate;
const { Permission } = require('./Permission');
const MigratePermission = require('./Permission').migrate;
const sequelize = require('../services/sequelize');

/**
 * Executes a pre-set raw query in /models/rawQueries.
 * See http://docs.sequelizejs.com/manual/tutorial/raw-queries.html
 * @param {String} queryName - The name of the query
 * @param {Object} replacements - An object of replacements for SQL parameters
 */
async function executeRawQuery(queryName, replacements) {
  const query = require(`./rawQueries/${queryName}`);
  if (!query) {
    throw new Error(`Invalid query specified`);
  }

  let results = await sequelize.query(query, {
    replacements: replacements,
    type: sequelize.QueryTypes.SELECT
  });
  return results;
}

let Models = {
  User,
  UserEmail,
  UserProfile,
  Permission
};

let Migrations = {
  MigrateUser,
  MigratePermission
};

let Helpers = {
  executeRawQuery
};

module.exports = {
  Models,
  Migrations,
  Helpers
};
