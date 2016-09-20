import { verify } from 'jsonwebtoken';
import config from '../../config/env';

const getToken = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const values = authHeader.split(' ');
    const tokenType = values[0];

    if (tokenType === 'Bearer') {
      return authHeader.split(' ')[1];
    }

    if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }

  return null;
};

const decode = (request) => {
  const error = new Error('Failed to authenticate token');
  const token = getToken(request);

  if (!token) {
    return error;
  }

  return verify(token, config.jwtSecret);
};

export { decode };
