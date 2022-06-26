import {
  pool,
  constructQuery,
  getRoleResponse,
  getActionResponse,
  getResourceResponse,
  getPermissionResponse,
} from '../helpers/db_helper.js';
import { QUERIES, HTTP_CODES } from '../helpers/config.js';
import { handleServerError, makeError } from '../helpers/utils.js';
import { ERROR_CODES } from '../helpers/error_codes.js';

export function getUserPermissions(user, response) {
  pool
    .query(constructQuery(QUERIES.USER_PERMISSION_MATRIX, user.userId))
    .then((res) => {
      let permissions = res.rows
        .map((permisison) => getPermissionResponse(permisison))
        .reduce((prev, curr) => {
          curr = {
            ...curr,
            actions: [curr.actionName],
          };
          delete curr.actionName;
          let perm = prev.find((item) => item.resourceName === curr.resourceName);
          if (!perm) {
            prev.push(curr);
          } else {
            perm.actions = [...perm.actions, ...curr.actions];
          }
          return prev;
        }, []);

      response.status(HTTP_CODES.OK.code).json(permissions);
    })
    .catch((err) => handleServerError(response, err));
}

export function getAllRoles(response) {
  pool
    .query(constructQuery(QUERIES.GET_ALL_ROLES))
    .then((res) => {
      let roles = res.rows.map((role) => getRoleResponse(role));
      return response.status(HTTP_CODES.OK.code).json(roles);
    })
    .catch((err) => handleServerError(response, err));
}

export function createRole(roleName, response) {
  pool
    .query(constructQuery(QUERIES.GET_ROLE, roleName))
    .then((res) => {
      if (res.rows.length > 0) {
        return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.ROLE_ALREADY_EXISTS));
      }

      pool
        .query(constructQuery(QUERIES.CREATE_ROLE, roleName))
        .then(() => {
          return response.status(HTTP_CODES.CREATED.code).json('');
        })
        .catch((err) => handleServerError(response, err));
    })
    .catch((err) => handleServerError(response, err));
}

export function getAllActions(response) {
  pool
    .query(constructQuery(QUERIES.GET_ALL_ACTIONS))
    .then((res) => {
      let actions = res.rows.map((action) => getActionResponse(action));
      return response.status(HTTP_CODES.OK.code).json(actions);
    })
    .catch((err) => handleServerError(response, err));
}

export function createAction(actionName, response) {
  pool
    .query(constructQuery(QUERIES.GET_ACTION, actionName))
    .then((res) => {
      if (res.rows.length > 0) {
        return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.ACTION_ALREADY_EXISTS));
      }

      pool
        .query(constructQuery(QUERIES.CREATE_ACTION, actionName))
        .then(() => {
          return response.status(HTTP_CODES.CREATED.code).json('');
        })
        .catch((err) => handleServerError(response, err));
    })
    .catch((err) => handleServerError(response, err));
}

export function getAllResources(response) {
  pool
    .query(constructQuery(QUERIES.GET_ALL_RESOURCES))
    .then((res) => {
      let resources = res.rows.map((resource) => getResourceResponse(resource));
      return response.status(HTTP_CODES.OK.code).json(resources);
    })
    .catch((err) => handleServerError(response, err));
}

export function createResource(resourceName, response) {
  pool
    .query(constructQuery(QUERIES.GET_RESOURCE, resourceName))
    .then((res) => {
      if (res.rows.length > 0) {
        return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.RESOURCE_ALREADY_EXISTS));
      }

      pool
        .query(constructQuery(QUERIES.CREATE_RESOURCE, resourceName))
        .then(() => {
          return response.status(HTTP_CODES.CREATED.code).json('');
        })
        .catch((err) => handleServerError(response, err));
    })
    .catch((err) => handleServerError(response, err));
}

export function addResourceActionsToRole(role, resourceActions = [], response) {
  let addedRoles = [];

  return pool.query(constructQuery(QUERIES.BEGIN_TRANSACTION)).then(() => {
    return Promise.all(
      resourceActions.map((resourceAction) =>
        pool
          .query(constructQuery(QUERIES.INSERT_ROLE_PERMISSION, role, resourceAction.resource, resourceAction.action))
          .then(() => addedRoles.push(resourceAction))
          .catch((err) => {
            if (err.code === '23505') console.log('permission already exists', resourceAction, 'for role', role);
            else throw err;
          })
      )
    )
      .then(() => {
        pool.query(constructQuery(QUERIES.COMMIT_TRANSACTION));
        response.status(HTTP_CODES.CREATED.code).json(addedRoles);
      })
      .catch((err) => {
        if (err.code === '23502') {
          pool.query(constructQuery(QUERIES.ROLLBACK_TRANSACTION));
          if (err.column === 'resource_sid') {
            return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.RESOURCE_DNE));
          } else if (err.column === 'action_sid') {
            return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.ACTION_DNE));
          } else if (err.column === 'role_sid') {
            return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.ROLE_DNE));
          }
        } else handleServerError(response, err);
      });
  });
}

export function getAllPermissionsForRole(role, response) {
  return pool
    .query(constructQuery(QUERIES.GET_ALL_PERMISSIONS_FOR_ROLE, role))
    .then((res) => {
      let permissions = res.rows
        .map((permisison) => getPermissionResponse(permisison))
        .reduce((prev, curr) => {
          curr = {
            ...curr,
            actions: [curr.actionName],
          };
          delete curr.actionName;
          let perm = prev.find((item) => item.resourceName === curr.resourceName);
          if (!perm) {
            prev.push(curr);
          } else {
            perm.actions = [...perm.actions, ...curr.actions];
          }
          return prev;
        }, []);
      return permissions;
    })
    .catch((err) => handleServerError(response, err));
}
