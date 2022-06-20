import { pool, constructQuery, getUserResponse } from '../helpers/db_helper.js';
import { QUERIES, HTTP_CODES } from '../helpers/config.js';
import { handleServerError, makeError } from '../helpers/utils.js';
import { ERROR_CODES } from '../helpers/error_codes.js';
import { checkHasPermission, RESOURCES, ACTIONS } from '../helpers/permissions.js';

export function createUser(username, password, response) {
  // lookup user in database
  pool
    .query(constructQuery(QUERIES.USER_LOOKUP, username))
    .then((res) => {
      if (res.rows.length > 0) {
        // user already exists send error to frontend
        return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.USER_ALREADY_EXISTS));
      }
      // user doesn't exist, add new entry
      pool
        .query(constructQuery(QUERIES.CREATE_USER, username, password))
        .then((res) => {
          let user = getUserResponse(res.rows[0]);
          return response.status(HTTP_CODES.CREATED.code).json(user);
        })
        .catch((err) => handleServerError(response, err));
    })
    .catch((err) => handleServerError(response, err));
}

export function login(username, password, response) {
  pool
    .query(constructQuery(QUERIES.USER_LOGIN, username, password))
    .then((res) => {
      if (res.rows.length === 0) {
        return response.status(HTTP_CODES.UNAUTHORIZED.code).json(makeError(ERROR_CODES.WRONG_USERNAME_PASSWORD));
      }
      let user = getUserResponse(res.rows[0]);
      if (!checkHasPermission(user, RESOURCES.ACCOUNT, ACTIONS.LOGIN)) {
        return response.status(HTTP_CODES.FORBIDDEN.code).json(makeError(ERROR_CODES.USER_ACCOUNT_LOCKED));
      }

      return response.status(HTTP_CODES.OK.code).json(user);
    })
    .catch((err) => handleServerError(response, err));
}

export function getAllUsers(response) {
  pool
    .query(constructQuery(QUERIES.GET_ALL_USERS))
    .then((res) => {
      let users = res.rows.map((user) => getUserResponse(user));
      return response.status(HTTP_CODES.OK.code).json(users);
    })
    .catch((err) => handleServerError(response, err));
}
