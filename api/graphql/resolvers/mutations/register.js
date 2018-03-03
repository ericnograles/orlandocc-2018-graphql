const { ENVIRONMENT } = require('../../../config');

module.exports = async (root, args, context) => {
  const { email, password, first_name, last_name, city, state } = args.user;

  return {
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    expires_in: moment().add('d', 1).toString(),
    first_name,
    last_name,
    email
  };
};
