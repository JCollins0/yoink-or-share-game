import {
  pool,
  constructQuery,
  getRoleResponse,
  getActionResponse,
  getResourceResponse,
  getPermissionResponse,
} from '../helpers/db_helper.js';
import { QUERIES, HTTP_CODES } from '../helpers/config.js';
import { makeError, createServiceResponse } from '../helpers/utils.js';
import { ERROR_CODES } from '../helpers/error_codes.js';

export function getUserPermissions(user) {
  return pool.query(constructQuery(QUERIES.USER_PERMISSION_MATRIX, user.userId)).then((res) => {
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
    return createServiceResponse(HTTP_CODES.OK.code, permissions);
  });
}

export function getAllRoles() {
  return pool.query(constructQuery(QUERIES.GET_ALL_ROLES)).then((res) => {
    let roles = res.rows.map((role) => getRoleResponse(role));
    return createServiceResponse(HTTP_CODES.OK.code, roles);
  });
}

export function createRole(roleName) {
  return pool.query(constructQuery(QUERIES.GET_ROLE, roleName)).then((res) => {
    if (res.rows.length > 0) {
      return createServiceResponse(HTTP_CODES.BAD_REQUEST.code, makeError(ERROR_CODES.ROLE_ALREADY_EXISTS));
    }

    return pool.query(constructQuery(QUERIES.CREATE_ROLE, roleName)).then(() => {
      return createServiceResponse(HTTP_CODES.CREATED.code, '');
    });
  });
}

export function getAllActions() {
  return pool.query(constructQuery(QUERIES.GET_ALL_ACTIONS)).then((res) => {
    let actions = res.rows.map((action) => getActionResponse(action));
    return createServiceResponse(HTTP_CODES.OK.code, actions);
  });
}

export function createAction(actionName) {
  return pool.query(constructQuery(QUERIES.GET_ACTION, actionName)).then((res) => {
    if (res.rows.length > 0) {
      return createServiceResponse(HTTP_CODES.BAD_REQUEST.code, makeError(ERROR_CODES.ACTION_ALREADY_EXISTS));
    }

    return pool.query(constructQuery(QUERIES.CREATE_ACTION, actionName)).then(() => {
      return createServiceResponse(HTTP_CODES.CREATED.code, '');
    });
  });
}

export function getAllResources() {
  return pool.query(constructQuery(QUERIES.GET_ALL_RESOURCES)).then((res) => {
    let resources = res.rows.map((resource) => getResourceResponse(resource));
    return createServiceResponse(HTTP_CODES.OK.code, resources);
  });
}

export function createResource(resourceName) {
  return pool.query(constructQuery(QUERIES.GET_RESOURCE, resourceName)).then((res) => {
    if (res.rows.length > 0) {
      return createServiceResponse(HTTP_CODES.BAD_REQUEST.code).json(makeError(ERROR_CODES.RESOURCE_ALREADY_EXISTS));
    }

    return pool.query(constructQuery(QUERIES.CREATE_RESOURCE, resourceName)).then(() => {
      return createServiceResponse(HTTP_CODES.CREATED.code, '');
    });
  });
}

export function addResourceActionsToRole(role, resourceActions = []) {
  let addedRoles = [];

  return pool.query(constructQuery(QUERIES.BEGIN_TRANSACTION)).then(() => {
    return Promise.all(
      resourceActions.map((resourceAction) =>
        pool
          .query(constructQuery(QUERIES.INSERT_ROLE_PERMISSION, role, resourceAction.resource, resourceAction.action))
          .then(() => addedRoles.push(resourceAction))
          .catch((err) => {
            if (err.code === '23505') {
              console.log('permission already exists', resourceAction, 'for role', role);
            } else {
              throw err;
            }
          })
      )
    )
      .then(() => {
        pool.query(constructQuery(QUERIES.COMMIT_TRANSACTION));
        return createServiceResponse(HTTP_CODES.CREATED.code, addedRoles);
      })
      .catch((err) => {
        if (err.code === '23502') {
          pool.query(constructQuery(QUERIES.ROLLBACK_TRANSACTION));
          if (err.column === 'resource_sid') {
            return createServiceResponse(HTTP_CODES.BAD_REQUEST.code, makeError(ERROR_CODES.RESOURCE_DNE));
          } else if (err.column === 'action_sid') {
            return createServiceResponse(HTTP_CODES.BAD_REQUEST.code, makeError(ERROR_CODES.ACTION_DNE));
          } else if (err.column === 'role_sid') {
            return createServiceResponse(HTTP_CODES.BAD_REQUEST.code, makeError(ERROR_CODES.ROLE_DNE));
          }
        } else {
          throw err;
        }
      });
  });
}

export function getAllPermissionsForRole(role) {
  return pool.query(constructQuery(QUERIES.GET_ALL_PERMISSIONS_FOR_ROLE, role)).then((res) => {
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
    return createServiceResponse(HTTP_CODES.OK.code, permissions);
  });
}

export function addRoleToUser(userId, role) {
  // Check if role exists
  return pool.query(constructQuery(QUERIES.GET_ROLE, role)).then((res) => {
    if (res.rows.length === 0) {
      return createServiceResponse(HTTP_CODES.BAD_REQUEST.code, makeError(ERROR_CODES.ROLE_DNE));
    }
    // check if user already has role
    return pool.query(constructQuery(QUERIES.GET_USER_ROLES, userId)).then((res) => {
      if (res.rows.map((role) => getRoleResponse(role)).includes(role)) {
        return createServiceResponse(HTTP_CODES.BAD_REQUEST.code, makeError(ERROR_CODES.USER_ALREADY_HAS_ROLE));
      }
      // add role to user
      return pool.query(constructQuery(QUERIES.ADD_ROLE_TO_USER, userId, role)).then((res) => {
        return createServiceResponse(HTTP_CODES.OK.code, '');
      });
    });
  });
}
