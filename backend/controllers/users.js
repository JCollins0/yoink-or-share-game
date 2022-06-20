import { Router } from 'express';
export const router = Router();

import { HTTP_CODES } from '../helpers/config.js';
import { ERROR_CODES } from '../helpers/error_codes.js';
import { createPermissionMiddleware } from '../helpers/middleware.js';
import { ACTIONS, RESOURCES } from '../helpers/permissions.js';
import { validateFields, makeError } from '../helpers/utils.js';
import { createUser, getAllUsers, login } from '../services/users.js';

router.post('/new', function (req, response) {
  let username = req.body.username;
  let password = req.body.password;

  if (!validateFields(username, password)) {
    return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
  }

  return createUser(username, password, response);
});

router.post('/login', function (req, response) {
  let username = req.body.username;
  let password = req.body.password;

  if (!validateFields(username, password)) {
    return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
  }

  return login(username, password, response);
});

router.get(
  '/all',
  createPermissionMiddleware([{ resource: RESOURCES.USER_LIST, action: ACTIONS.VIEW }]),
  function (req, response) {
    // TODO add query parameters for sorting and filtering
    return getAllUsers(response);
  }
);

export default router;
