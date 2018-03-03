const bcrypt = require('bcrypt');
const { promisify } = require('util');
const redisService = require('../../../services/redis');
const jwtService = require('../../../services/jwt');
const compare = promisify(bcrypt.compare);
const hash = promisify(bcrypt.hash);
const path = require('path');
const { User, UserEmail, UserProfile } = require('../../../models').Models;
const { ENVIRONMENT } = require('../../../config');

module.exports = async (root, args, context) => {
  const { email, password, first_name, last_name, city, state } = args.user;
  let userEmail = await UserEmail.findOne({
    where: { email: email, is_primary: true }
  });

  if (userEmail) {
    throw new Error(`Email is already registered`);
  }

  let profile = await UserProfile.create(
    {
      first_name: first_name,
      last_name: last_name,
      city: city,
      state: state
    },
    { fields: ['first_name', 'last_name', 'city', 'state'] }
  );

  let hashPassword = await hash(password, ENVIRONMENT.SALT_ROUNDS);
  const profile_id = profile.get({ plain: true }).id;

  let user = await User.create(
    {
      password: hashPassword,
      user_profile_id: profile_id
    },
    { fields: ['password', 'user_profile_id'] }
  );

  const user_id = user.get({ plain: true }).id;

  await UserEmail.create(
    {
      user_id: user_id,
      email: email,
      is_primary: true
    },
    { fields: ['user_id', 'email', 'is_primary'] }
  );

  let { accessToken, refreshToken, expiresIn } = await jwtService.sign({
    userId: user_id
  });

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn.toString(),
    first_name: first_name,
    last_name: last_name,
    email: email
  };
};
