const fs = require('fs');
const path = require('path');
const passport = require('passport');
const SAMLStrategy = require('passport-saml').Strategy;

module.exports = SAMLProvider;

function SAMLProvider(app) {
  const samlIssuer = process.env.SAML_ISSUER;
  let samlIDPCert = process.env.SAML_SIGNING_CERT;
  const samlCallbackURL = process.env.SAML_CALLBACK_URL;
  const samlEntryPoint = process.env.SAML_ENTRY_POINT;

  // Assumption: If you are loading from the filesystem, it will be at the root of the project
  if (!process.env.SAML_SIGNING_CERT && process.env.SAML_SIGNING_CERT_PATH) {
    samlIDPCert = fs.readFileSync(
      path.join(__dirname, '../../../', process.env.SAML_SIGNING_CERT_PATH),
      'utf-8'
    );
  }

  const samlConfig = {
    callbackUrl: samlCallbackURL,
    entryPoint: samlEntryPoint,
    issuer: samlIssuer,
    cert: samlIDPCert
  };

  app.get(
    '/auth/saml',
    passport.authenticate('saml', {
      failureRedirect: '/auth/saml/error',
      session: false
    }),
    (req, res) => {
      return res.redirect('/');
    }
  );

  app.post(
    '/auth/saml/callback',
    passport.authenticate('saml', {
      failureRedirect: '/auth/error',
      session: false
    }),
    (req, res) => {
      // TODO: This is where you'd query your own app DB table to cross-reference who this person is

      // TODO: You would redirect back to your SPA here with your *own* JWT to verify a successful login
      return res.json(req.user);
    }
  );

  app.get('/auth/saml/error', (req, res) => {
    // TODO: You may want to redirect back to your SPA here to handle federated login failures
    return res.json({ message: `Unauthorized access detected` });
  });

  return new SAMLStrategy(samlConfig, verify);
}

function verify(profile, next) {
  // Will be embedded in req.user
  let email =
    profile[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
    ];
  return next(null, { email });
}
