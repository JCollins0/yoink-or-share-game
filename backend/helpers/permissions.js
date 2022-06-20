import { pool, constructQuery } from './db_helper.js';
import { QUERIES } from './config.js';

export const ACTIONS = {
  LOGIN: 'LOGIN',
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};

export const RESOURCES = {
  ACCOUNT: 'ACCOUNT',
};

export function checkHasPermission(user, resource = '-', action = '-') {
  if (!user) {
    return false;
  }
  let id = user.userId;
  return pool
    .query(constructQuery(QUERIES.USER_PERMISSION_MATRIX, id))
    .then((res) => {
      if (res.rows.length === 0) {
        return false;
      }
      return res.rows.some((permission) => permission.resource_name === resource && permission.action_name === action);
    })
    .catch((err) => {
      console.log('Some error occured when checking permissions', err);
      return false;
    });
}
