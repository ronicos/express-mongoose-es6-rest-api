import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import User from '../models/user';

const config = require('../../config/env');

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  console.log('req.body', req.body);
  const { username } = req.body;

  User.findOne({ username })
    .then((user) => {
      const { roles } = user;
      const token = jwt.sign({ username, roles }, config.jwtSecret);

      return res.json({ token, username });
    })
    .catch((e) => {
      console.log('e', e);
      const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);

      return next(err);
    });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
