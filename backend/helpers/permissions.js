import { pool, constructQuery } from './db_helper.js';
import { QUERIES } from './config.js';
import { resolve } from 'path';

export const ACTIONS = {
  LOGIN: 'LOGIN',
  VIEW: 'VIEW',
  EDIT: 'EDIT',
  CREATE: 'CREATE',
};

export const RESOURCES = {
  ACCOUNT: 'ACCOUNT',
  ROLE: 'ROLE',
  USER_LIST: 'USER_LIST',
};

export function checkHasPermission(user, resource = '-', action = '-', promise = false) {
  return checkHasPermissionBulk(user, [{ resource: resource, actions: [action] }], promise);
}

/**
 * @param user
 *  the user object to check
 * @param bulkResourceActionCheck
 *  Data should come in format [{resource: "SOME_RESOURCE", action: ["SOME_ACTION",...]}, ...]
 * @returns true if user has access to all permissions, false if any permissions are not present
 */
export function checkHasPermissionBulk(user, bulkResourceActionCheck = [], promise = false) {
  if (!user) {
    return promise ? new Promise((resolve, reject) => resolve(false)) : false;
  }
  let id = user.userId;
  return pool
    .query(constructQuery(QUERIES.USER_PERMISSION_MATRIX, id))
    .then((res) => {
      if (res.rows.length === 0) {
        return false;
      }
      return bulkResourceActionCheck.every((check) =>
        check.actions?.every((action) =>
          res.rows.some(
            (permission) => permission.resource_name === check.resource && permission.action_name === action
          )
        )
      );
    })
    .catch((err) => {
      console.log('Some error occured when checking permissions', err);
      return false;
    });
}
