const path = require('path');
const moment = require('moment');
const { pubsub, EVENTS } = require('../../pubsub');
const { sign } = require('../../services/jwt');

module.exports = async (root, args, context) => {
  const { email, password } = args.user;
  let tokenPayload = sign({email});
  let mockProfile = {
    first_name: 'test',
    last_name: 'user',
    email,
    ...tokenPayload
  };

  return mockProfile;
};
