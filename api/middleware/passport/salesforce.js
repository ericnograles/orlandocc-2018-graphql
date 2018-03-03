const fs = require('fs');
const path = require('path');
const passport = require('passport');
const SalesforceStrategy = require('passport-salesforce').Strategy;

module.exports = SalesforceProvider;

function SalesforceProvider(app) {
  const clientID = process.env.SALESFORCE_OAUTH_CONSUMER_KEY;
  const clientSecret = process.env.SALESFORCE_OAUTH_CONSUMER_SECRET;
  const callbackURL = process.env.SALESFORCE_OAUTH_CALLBACK_URL;

  const salesforceOAuthConfig = { clientID, clientSecret, callbackURL };

  app.get(
    '/auth/salesforce',
    passport.authenticate('salesforce', {
      session: false
    })
  );

  app.get(
    '/auth/salesforce/callback',
    passport.authenticate('salesforce', {
      session: false
    }),
    (req, res) => {
      // TODO: This is where you'd query your own app DB table to cross-reference who this person is
      // If you're using Heroku Connect, grab the sfid from the user object and query the user table

      // TODO: Another option is to just pass through the Salesforce Access Token if you're just querying the API
      // But you might want to consider creating middleware to get a new token when it expires
      return res.json(req.user);
    }
  );
  return new SalesforceStrategy(salesforceOAuthConfig, verify);
}

function verify(accessToken, refreshToken, profile, next) {
  // Will be embedded in req.user
  return next(null, { accessToken, refreshToken, profile });
}
