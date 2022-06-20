export const CONFIG = {
  local: {
    db: {
      connectionString: 'postgres://postgres:password@localhost:5432/postgres',
    },
  },
  production: {
    db: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};

export const QUERIES = {
  VERIFY_USER_TOKEN: 'SELECT USER_SID from USERS where USER_SID = $1 and SECRET_TOKEN = $2;',
  USER_LOOKUP: 'SELECT USER_NAME from USERS where USER_NAME = $1;',
  CREATE_USER: 'INSERT INTO USERS(USER_NAME, PASSWD) VALUES($1, $2) RETURNING *;',
  USER_LOGIN: 'SELECT * from USERS where USER_NAME = $1 and PASSWD = $2;',
  USER_PERMISSION_MATRIX:
    'SELECT RESOURCES.RESOURCE_NAME, ACTIONS.ACTION_NAME \
    from (ROLE_PERMISSIONS join RESOURCES on ROLE_PERMISSIONS.RESOURCE_SID = RESOURCES.RESOURCE_SID join ACTIONS on ROLE_PERMISSIONS.ACTION_SID = ACTIONS.ACTION_SID) \
    where ROLE_SID in ( \
      SELECT ROLE_SID from USER_ROLES where USER_SID = $1 \
    );',
  ROLE_PERMISSIONS: 'SELECT * from ROLE_PERMISSIONS where ROLE_SID = $1;',
};

export const HTTP_CODES = {
  OK: {
    code: 200,
    msg: 'OK',
  },
  CREATED: {
    code: 201,
    msg: 'Created',
  },
  BAD_REQUEST: {
    code: 400,
    msg: 'Bad Request',
  },
  UNAUTHORIZED: {
    code: 401,
    msg: 'Unauthroized',
  },
  FORBIDDEN: {
    code: 403,
    msg: 'Forbidden',
  },
  NOT_FOUND: {
    code: 404,
    msg: 'Not found',
  },
  SERVER_ERROR: {
    code: 500,
    msg: 'Some error occured while processing request',
  },
};
