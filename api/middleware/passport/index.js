const passport = require('passport');
const SAMLProvider = require('./saml');
const SalesforceProvider = require('./salesforce');

module.exports = connectToPassport;

function connectToPassport(app) {
  if (process.env.AUTH_SAML_ENABLED === 'true') {
    passport.use(SAMLProvider(app));
  }
  
  if (process.env.AUTH_SALESFORCE_ENABLED === 'true') {
    passport.use(SalesforceProvider(app));
  }
  
  app.use(passport.initialize());
  return app;
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
