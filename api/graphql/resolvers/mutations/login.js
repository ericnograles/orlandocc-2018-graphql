const path = require('path');
const moment = require('moment');
const { pubsub, EVENTS } = require('../../pubsub');

module.exports = async (root, args, context) => {
  const { email, password } = args.user;
  let mockProfile = {
    first_name: 'test',
    last_name: 'user',
    email,
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    expires_in: moment().add('d', 1)
  };

  // Lets subscribers know that a user logged in
  pubsub.publish(EVENTS.USER_LOGGED_IN, { userLoggedIn: { email } });

  return mockProfile;
};
