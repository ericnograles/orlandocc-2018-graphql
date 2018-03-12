const { ENVIRONMENT } = require('../../../config');
const { sign } = require('../../services/jwt');

module.exports = async (root, args, context) => {
  const { email, password, first_name, last_name, city, state } = args.user;
  let tokenPayload = sign({email});
  
  return {
    first_name,
    last_name,
    email,
    ...tokenPayload
  };
};
