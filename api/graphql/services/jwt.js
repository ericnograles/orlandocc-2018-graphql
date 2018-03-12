const jwt = require('jsonwebtoken');
const moment = require('moment');
const ms = require('ms');
const { ENVIRONMENT } = require('../../config');

module.exports = {
  sign,
  verify
};

function sign(payload) {
  let expiresIn = ENVIRONMENT.JWT_EXPIRES_IN || payloadExpiresIn;
  let expiresInMs = ms(expiresIn);

  let expiresInDate = moment().add(expiresInMs, 'ms');
  let access_token = jwt.sign(payload, ENVIRONMENT.JWT_SECRET, {
    expiresIn: expiresIn
  });

  return {
    access_token,
    expires_in: expiresInDate.toDate().getTime(),
    refresh_token: 'TODO'
  };
}

async function verify(token) {
  let decoded = await jwt.verify(token, ENVIRONMENT.JWT_SECRET);
  return decoded;
}