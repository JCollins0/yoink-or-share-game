import { CONFIG, QUERIES } from './config.js';
import pkg from 'pg';
const { Pool } = pkg;

const IS_PROD = process.env.PORT ? true : false;

function getDBSettings() {
  const properties = CONFIG[IS_PROD ? 'production' : 'local'];
  return properties.db;
}

export function constructQuery(query, ...values) {
  return {
    text: query,
    values: [...values],
  };
}

function verifyUserToken(token, userId, success, failure) {
  pool
    .query(constructQuery(QUERIES.VERIFY_USER_TOKEN, userId, token))
    .then((res) => {
      if (res.rows.length > 0) {
        return success();
      }
      return failure();
    })
    .catch((err) =>
      setImmediate(() => {
        throw err;
      })
    );
}

export function getUserResponse(user) {
  return {
    userId: user.user_sid,
    userName: user.user_name.trim(),
    password: user.passwd,
    secret_token: user.secret_token,
  };
}

export const pool = new Pool(getDBSettings());

export default {
  constructQuery,
  verifyUserToken,
  getUserResponse,
  pool,
};
