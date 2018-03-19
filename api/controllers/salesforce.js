const crypto = require('crypto');
const { verify } = require('salesforce-canvas-request');

module.exports = {
  canvas
};

function canvas(req, res) {
  let decodedRequest = verify(req.body.signed_request, '6588480712663944940');
  console.log(JSON.stringify(decodedRequest));

  // TODO: Lookup this user in our own database and verify validity

  // TODO: Issue a JWT within *this* system to statelessly identify the user

  return res.redirect(`/canvas?signed_request=${req.body.signed_request}`);
}
