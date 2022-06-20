import { HTTP_CODES, QUERIES } from './config.js';
import { constructQuery, getUserResponse, pool } from './db_helper.js';
import { ERROR_CODES } from './error_codes.js';
import { checkHasPermissionBulk } from './permissions.js';
import { handleServerError, makeError, validateFields } from './utils.js';

export function createPermissionMiddleware(bulkCheck = []) {
  return function permissionMiddleware(req, response, next) {
    let userId = req.headers?.['x-user-id'];
    let userToken = req.headers?.['x-secret-token'];

    if (!validateFields(userId, userToken)) {
      return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
    }

    pool
      .query(constructQuery(QUERIES.USER_STRICT_LOOKUP, userId, userToken))
      .then((res) => {
        if (res.rows.length === 0) {
          return response.status(HTTP_CODES.FORBIDDEN.code).json(makeError(ERROR_CODES.USER_DOES_NOT_HAVE_ACCESS));
        }

        let user = getUserResponse(res.rows[0]);

        if (checkHasPermissionBulk(user, bulkCheck)) {
          next();
          return;
        }
        return response.status(HTTP_CODES.FORBIDDEN.code).json(makeError(ERROR_CODES.USER_DOES_NOT_HAVE_ACCESS));
      })
      .catch((err) => handleServerError(response, err));
  };
}
