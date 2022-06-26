import { HTTP_CODES } from './config.js';
import { ERROR_CODES } from './error_codes.js';
import { checkHasPermissionBulk } from './permissions.js';
import { makeError, validateFields } from './utils.js';

export function createPermissionMiddleware(bulkCheck = []) {
  return function permissionMiddleware(req, response, next) {
    let user = req.session.user;
    if (!validateFields(user)) {
      return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
    }
    if (checkHasPermissionBulk(user, bulkCheck)) {
      return next();
    }
    response.status(HTTP_CODES.FORBIDDEN.code).json(makeError(ERROR_CODES.USER_DOES_NOT_HAVE_ACCESS));
  };
}

export function isAuthenticated(req, response, next) {
  if (req.session?.user) {
    next();
  } else {
    response.status(HTTP_CODES.FORBIDDEN.code).json(makeError(ERROR_CODES.USER_DOES_NOT_HAVE_ACCESS));
  }
}
