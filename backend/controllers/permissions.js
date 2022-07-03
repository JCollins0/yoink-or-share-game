import { Router } from 'express';
export const router = Router();

import { HTTP_CODES } from '../helpers/config.js';
import { ERROR_CODES } from '../helpers/error_codes.js';
import { createPermissionMiddleware, isAuthenticated } from '../helpers/middleware.js';
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
  getUserPermissions,
} from '../services/permissions.js';

router.get('/me', function (req, response) {
  let user = req.session.user;
  if (user) {
    return getUserPermissions(user)
      .then((getUserPermsResponse) => response.status(getUserPermsResponse.resCode).json(getUserPermsResponse.res))
      .catch((err) => handleServerError(response, err));
  }
  return response.status(HTTP_CODES.OK.code).json([]);
});

router.post('/check', isAuthenticated, function (req, response) {
  let user = req.session.user;
  let resource = req.body.resource;
  let action = req.body.action;

  checkHasPermission(user, resource, action, true)
    .then((res) => {
      if (res) {
        return response.status(HTTP_CODES.OK.code).json(true);
      }
      return response.status(HTTP_CODES.FORBIDDEN.code).json(false);
    })
    .catch((err) => handleServerError(response, err));
});

// This middleware for checking permission will apply to all routes below this line
router.use(createPermissionMiddleware([{ resource: RESOURCES.ROLE, actions: [ACTIONS.VIEW, ACTIONS.CREATE] }]));

router.get('/roles', function (req, response) {
  getAllRoles()
    .then((getRolesResponse) => response.status(getRolesResponse.resCode).json(getRolesResponse.res))
    .catch((err) => handleServerError(response, err));
});

router.post('/role/new', function (req, response) {
  let roleName = req.body.roleName;

  if (!validateFields(roleName)) {
    return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
  }

  createRole(roleName)
    .then((createRoleResponse) => response.status(createRoleResponse.resCode).json(createRoleResponse.res))
    .catch((err) => handleServerError(response, err));
});

router.get('/actions', function (req, response) {
  getAllActions()
    .then((getActionsResponse) => response.status(getActionsResponse.resCode).json(getActionsResponse.res))
    .catch((err) => handleServerError(response, err));
});

router.post('/action/new', function (req, response) {
  let actionName = req.body.actionName;

  if (!validateFields(actionName)) {
    return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
  }

  createAction(actionName)
    .then((createActionResponse) => response.status(createActionResponse.resCode).json(createActionResponse.res))
    .catch((err) => handleServerError(response, err));
});

router.get('/resources', function (req, response) {
  getAllResources()
    .then((getResourcesResponse) => response.status(getResourcesResponse.resCode).json(getResourcesResponse.res))
    .catch((err) => handleServerError(response, err));
});

router.post('/resource/new', function (req, response) {
  let resourceName = req.body.resourceName;

  if (!validateFields(resourceName)) {
    return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
  }

  createResource(resourceName)
    .then((createResourceResponse) => response.status(createResourceResponse.resCode).json(createResourceResponse.res))
    .catch((err) => handleServerError(response, err));
});

router.get('/permissions', function (req, response) {
  let roleName = req.query.role;

  if (!validateFields(roleName)) {
    return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
  }

  getAllPermissionsForRole(roleName)
    .then((permissionsResponse) => response.status(permissionsResponse.resCode).json(permissionsResponse.res))
    .catch((err) => handleServerError(response, err));
});

router.patch('/permissions', function (req, response) {
  let roleName = req.body.role;
  let resourceActions = req.body.resourceActions;

  if (!validateFields(roleName, resourceActions)) {
    return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.REQUIRED_FIELDS_NULL));
  }

  addResourceActionsToRole(roleName, resourceActions)
    .then((addResourceActionsResponse) =>
      response.status(addResourceActionsResponse.resCode).json(addResourceActionsResponse.res)
    )
    .catch((err) => handleServerError(response, err));
});

export default router;
