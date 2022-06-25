import { Router } from 'express';
export const router = Router();

import { HTTP_CODES } from '../helpers/config.js';
import { ERROR_CODES } from '../helpers/error_codes.js';
import { createPermissionMiddleware } from '../helpers/middleware.js';
import { ACTIONS, checkHasPermission, RESOURCES } from '../helpers/permissions.js';
import { validateFields, makeError, handleServerError } from '../helpers/utils.js';
import {
  createRole,
  createAction,
  createResource,
  getAllActions,
  getAllResources,
  getAllRoles,
  getAllPermissionsForRole,
  addResourceActionsToRole,
} from '../services/permissions.js';

router.post('/check', function (req, response) {
  let user = req.body.user;
  let resource = req.body.resource;
  let action = req.body.action;

  // todo validate user token
  return checkHasPermission(user, resource, action, true)
    .then((res) => {
      if (res) {
        return response.status(HTTP_CODES.OK.code).json(true);
      }
      return response.status(HTTP_CODES.FORBIDDEN.code).json(false);
    })
    .catch((err) => handleServerError(response, err));
});

router.use(createPermissionMiddleware([{ resource: RESOURCES.ROLE, actions: [ACTIONS.VIEW, ACTIONS.CREATE] }]));

router.get('/roles', function (req, response) {
  return getAllRoles(response);
});

router.post('/role/new', function (req, response) {
  let roleName = req.body.roleName;

  if (!validateFields(roleName)) {
    return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
  }

  return createRole(roleName, response);
});

router.get('/actions', function (req, response) {
  return getAllActions(response);
});

router.post('/action/new', function (req, response) {
  let actionName = req.body.actionName;

  if (!validateFields(actionName)) {
    return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
  }

  return createAction(actionName, response);
});

router.get('/resources', function (req, response) {
  return getAllResources(response);
});

router.post('/resource/new', function (req, response) {
  let resourceName = req.body.resourceName;

  if (!validateFields(resourceName)) {
    return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
  }

  return createResource(resourceName, response);
});

router.get('/permissions', function (req, response) {
  let roleName = req.query.role;

  if (!validateFields(roleName)) {
    return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
  }

  return getAllPermissionsForRole(roleName, response);
});

router.post('/permissions', function (req, response) {
  let roleName = req.body.role;
  let resourceActions = req.body.resourceActions;

  if (!validateFields(roleName, resourceActions)) {
    return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
  }

  return addResourceActionsToRole(roleName, resourceActions, response);
});

export default router;
