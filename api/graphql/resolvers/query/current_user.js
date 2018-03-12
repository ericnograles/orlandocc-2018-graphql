const { verify } = require('../../services/jwt');

module.exports = async (root, args, context) => {
  let { access_token } = args;
  let decoded = await verify(access_token);
  return {
    email: decoded.email,
    first_name: 'todo',
    last_name: 'todo',
    access_token: access_token,
    refresh_token: 'todo_refresh_token',
    expires_in: 'todo_expires_in'
  };
};
