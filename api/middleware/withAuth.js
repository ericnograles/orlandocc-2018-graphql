const winston = require('winston');
const redisService = require('../services/redis');
const jwtService = require('../services/jwt');
const { Helpers } = require('../models');
const { REDIS } = require('../services/constants');

module.exports = function withAuth(routeHandler) {
  return async (req, res) => {
    try {
      let authorization = req.headers['authorization'] || '';
      let token = authorization.replace('Bearer ', '');
      let decoded = await jwtService.verifyToken(token);
      let issuedRefreshToken = await redisService.get(
        REDIS.REFRESH_TOKENS_DB,
        token
      );
      if (issuedRefreshToken) {
        // Cannot use refresh token to authenticate
        throw new Error(`Invalid token`);
      }
      let permissions = await Helpers.executeRawQuery('findUserPermissions', {
        userId: decoded.userId
      });
      req.user = {
        id: decoded.userId,
        permissions
      };
      return routeHandler(req, res);
    } catch (error) {
      return res.status(401).json({ message: `Unauthorized access detected` });
    }
  };
};
