const { verify } = require('../../services/jwt');

module.exports = async (root, args, context) => {
  let { access_token } = args;
  let decoded = await verify(access_token);
  return [
    {name: `General`, id: 'general', purpose: `General talk`},
    {name: `Orlando Code Camp 2018`, id: 'occ-2018', purpose: `Yuk it up for OCC 2018`},
    {name: `Star Wars`, id: 'star-wars', purpose: `May the force be with you`}
  ];
};
