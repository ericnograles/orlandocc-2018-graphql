const bcrypt = require('bcrypt');
const { promisify } = require('util');
const redisService = require('../../../services/redis');
const jwtService = require('../../../services/jwt');
const compare = promisify(bcrypt.compare);
const hash = promisify(bcrypt.hash);
const path = require('path');
const { User, UserEmail, UserProfile } = require('../../../models').Models;
const { pubsub, EVENTS } = require('../../pubsub');

module.exports = async (root, args, context) => {
  let email = args.user.email;
  let password = args.user.password;

  let userEmail = await UserEmail.findOne({
    where: { email: email, is_primary: true }
  });

  if (!userEmail) {
    throw new Error(`Unauthorized access`);
  }

  let user = await User.findOne({
    where: { id: userEmail.user_id }
  });

  let profile = await UserProfile.findOne({
    where: { id: user.user_profile_id }
  });

  let validPassword = await compare(password, user.password);
  if (!validPassword) {
    throw new Error(`Unauthorized access`);
  }

  // Note: A JWT is *signed* not *encrypted*. The best approach is to sign an object with the *minimally needed* information to identify a person
  let { accessToken, refreshToken, expiresIn } = await jwtService.sign({
    userId: user.id
  });

  // Lets subscribers know that a user logged in
  pubsub.publish(EVENTS.USER_LOGGED_IN, { userLoggedIn: { email } });

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn.toString(),
    email: email,
    ...profile
  };
};
