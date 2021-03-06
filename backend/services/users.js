import { pool, constructQuery, getUserResponse } from '../helpers/db_helper.js';
import { QUERIES, HTTP_CODES } from '../helpers/config.js';
import { createServiceResponse, makeError } from '../helpers/utils.js';
import { ERROR_CODES } from '../helpers/error_codes.js';
import { checkHasPermission, RESOURCES, ACTIONS } from '../helpers/permissions.js';

export function createUser(username, password) {
  // lookup user in database
  return pool.query(constructQuery(QUERIES.USER_LOOKUP, username)).then((res) => {
    if (res.rows.length > 0) {
      // user already exists send error to frontend
      return { resCode: HTTP_CODES.BAD_REQUEST.code, res: makeError(ERROR_CODES.USER_ALREADY_EXISTS) };
    }
    // user doesn't exist, add new entry
    return pool.query(constructQuery(QUERIES.CREATE_USER, username, password)).then((res) => {
      let user = getUserResponse(res.rows[0]);
      return createServiceResponse(HTTP_CODES.CREATED.code, user);
    });
  });
}

export function login(username, password) {
  return pool.query(constructQuery(QUERIES.USER_LOGIN, username, password)).then((res) => {
    if (res.rows.length === 0) {
      return createServiceResponse(HTTP_CODES.UNAUTHORIZED.code, makeError(ERROR_CODES.WRONG_USERNAME_PASSWORD));
    }
    let user = getUserResponse(res.rows[0]);
    if (!checkHasPermission(user, RESOURCES.ACCOUNT, ACTIONS.LOGIN)) {
      return createServiceResponse(HTTP_CODES.FORBIDDEN.code, makeError(ERROR_CODES.USER_ACCOUNT_LOCKED));
    }

    return createServiceResponse(HTTP_CODES.OK.code, user);
  });
}

export function getAllUsers() {
  return pool.query(constructQuery(QUERIES.GET_ALL_USERS)).then((res) => {
    let users = res.rows.map((user) => getUserResponse(user));
    return createServiceResponse(HTTP_CODES.OK.code, users);
  });
}
