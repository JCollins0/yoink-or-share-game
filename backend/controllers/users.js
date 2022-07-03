import { Router } from 'express';
export const router = Router();

import { HTTP_CODES } from '../helpers/config.js';
import { ERROR_CODES } from '../helpers/error_codes.js';
import { createPermissionMiddleware, isAuthenticated } from '../helpers/middleware.js';
import { ACTIONS, RESOURCES } from '../helpers/permissions.js';
import { validateFields, makeError, handleServerError } from '../helpers/utils.js';
import { addRoleToUser } from '../services/permissions.js';
import { createUser, getAllUsers, login } from '../services/users.js';

// crate new route to test /isAuthenticated to check session cookie and return user details...
// create new middleware to check authenticated for protected routes
// store access matrix in the session maybe?

router.get('/isAuthenticated', function (req, response) {
  let authenticated = !!req.session.user;
  return response.status(HTTP_CODES.OK.code).send(authenticated);
});

router.post('/new', function (req, response) {
  let username = req.body.username;
  let password = req.body.password;

  if (!validateFields(username, password)) {
    return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
  }

  createUser(username, password)
    .then((createUserResponse) => {
      req.session.regenerate(function (err) {
        if (err) return response.status(HTTP_CODES.SERVER_ERROR.code).json(HTTP_CODES.SERVER_ERROR.msg);

        // store user information in session, typically a user id
        req.session.user = createUserResponse.res;

        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return response.status(HTTP_CODES.SERVER_ERROR.code).json(HTTP_CODES.SERVER_ERROR.msg);

          return response.status(createUserResponse.resCode).json(createUserResponse.res);
        });
      });
    })
    .catch((err) => handleServerError(response, err));
});

router.post('/login', function (req, response) {
  let username = req.body.username;
  let password = req.body.password;

  if (!validateFields(username, password)) {
    return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
  }

  login(username, password)
    .then((loginResponse) => {
      req.session.regenerate(function (err) {
        if (err) return response.status(HTTP_CODES.SERVER_ERROR.code).send(err);

        // store user information in session, typically a user id
        req.session.user = loginResponse.res;

        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return response.status(HTTP_CODES.SERVER_ERROR.code).send(err);

          return response.status(loginResponse.resCode).send(loginResponse.res);
        });
      });
    })
    .catch((err) => handleServerError(response, err));
});

router.post('/logout', function (req, response) {
  if (req.session) {
    req.session.user = null;
    req.session.save(function (err) {
      if (err) return response.status(HTTP_CODES.SERVER_ERROR.code).send(err);

      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) return response.status(HTTP_CODES.SERVER_ERROR.code).send(err);
        return response.status(HTTP_CODES.OK.code).send();
      });
    });
  }
});

router.get(
  '/all',
  isAuthenticated,
  createPermissionMiddleware([{ resource: RESOURCES.USER_LIST, action: ACTIONS.VIEW }]),
  function (req, response) {
    // TODO add query parameters for sorting and filtering
    return getAllUsers()
      .then((getUserResponse) => response.status(getUserResponse.resCode).json(getUserResponse.res))
      .catch((err) => handleServerError(response, err));
  }
);

router.post(
  '/role/add',
  isAuthenticated,
  createPermissionMiddleware([{ resource: RESOURCES.USERS, action: ACTIONS.EDIT }]),
  function (req, response) {
    let userId = req.body.userId;
    let role = req.body.role;

    if (!validateFields(userId, role)) {
      return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
    }

    return addRoleToUser(userId, role)
      .then((addRoleResponse) => response.status(addRoleResponse.resCode).json(addRoleResponse.res))
      .catch((err) => handleServerError(response, err));
  }
);

export default router;
