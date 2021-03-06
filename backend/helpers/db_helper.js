import { CONFIG, QUERIES } from './config.js';
import pkg from 'pg';
const { Pool } = pkg;

const IS_PROD = process.env.PORT ? true : false;

function getDBSettings() {
  const properties = CONFIG[IS_PROD ? 'production' : 'local'];
  return properties.db;
}

export const pool = new Pool(getDBSettings());

export function constructQuery(query, ...values) {
  return {
    text: query,
    values: [...values],
  };
}

export function getUserResponse(user) {
  return {
    userId: user.user_sid,
    userName: user.user_name.trim(),
    password: user.passwd,
    secret_token: user.secret_token,
    createdDate: user.crt_ts,
    updatedDate: user.chg_ts,
  };
}

export function getRoleResponse(role) {
  return {
    roleName: role.role_name.trim(),
  };
}

export function getActionResponse(action) {
  return {
    actionName: action.action_name.trim(),
  };
}

export function getResourceResponse(resource) {
  return {
    resourceName: resource.resource_name.trim(),
  };
}

export function getPermissionResponse(permission) {
  return {
    resourceName: permission.resource_name,
    actionName: permission.action_name,
  };
}

export default {
  constructQuery,
  getUserResponse,
  pool,
};
