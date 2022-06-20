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
  BEGIN_TRANSACTION: 'BEGIN',
  COMMIT_TRANSACTION: 'COMMIT',
  ROLLBACK_TRANSACTION: 'ROLLBACK',
  VERIFY_USER_TOKEN: 'SELECT USER_SID from USERS where USER_SID = $1 and SECRET_TOKEN = $2;',
  USER_STRICT_LOOKUP: 'SELECT * from USERS where USER_SID = $1 and SECRET_TOKEN = $2;',
  USER_LOOKUP: 'SELECT USER_NAME from USERS where USER_NAME = $1;',
  GET_ALL_USERS: 'SELECT USER_SID, USER_NAME from USERS;',
  CREATE_USER: 'INSERT INTO USERS(USER_NAME, PASSWD) VALUES($1, $2) RETURNING *;',
  USER_LOGIN: 'SELECT * from USERS where USER_NAME = $1 and PASSWD = $2;',
  USER_PERMISSION_MATRIX:
    'SELECT RESOURCES.RESOURCE_NAME, ACTIONS.ACTION_NAME \
    from (ROLE_PERMISSIONS join RESOURCES on ROLE_PERMISSIONS.RESOURCE_SID = RESOURCES.RESOURCE_SID join ACTIONS on ROLE_PERMISSIONS.ACTION_SID = ACTIONS.ACTION_SID) \
    where ROLE_SID in ( \
      SELECT ROLE_SID from USER_ROLES where USER_SID = $1 \
    );',
  GET_ALL_PERMISSIONS_FOR_ROLE:
    'SELECT RESOURCES.RESOURCE_NAME, ACTIONS.ACTION_NAME \
    from (ROLE_PERMISSIONS join RESOURCES on ROLE_PERMISSIONS.RESOURCE_SID = RESOURCES.RESOURCE_SID join ACTIONS on ROLE_PERMISSIONS.ACTION_SID = ACTIONS.ACTION_SID) \
    where ROLE_SID = (SELECT ROLE_SID from ROLES where ROLE_NAME = $1);',
  GET_ALL_ACTIONS: 'SELECT ACTION_NAME from ACTIONS;',
  GET_ACTION: 'SELECT * from ACTIONS where ACTION_NAME = $1;',
  CREATE_ACTION: 'INSERT INTO ACTIONS(ACTION_NAME) VALUES($1) RETURNING *;',
  GET_ALL_RESOURCES: 'SELECT RESOURCE_NAME from RESOURCES;',
  GET_RESOURCE: 'SELECT * from RESOURCES where RESOURCE_NAME = $1;',
  CREATE_RESOURCE: 'INSERT INTO RESOURCES(RESOURCE_NAME) VALUES($1) RETURNING *;',
  GET_ALL_ROLES: 'SELECT ROLE_NAME from ROLES;',
  GET_ROLE: 'SELECT * from ROLES where ROLE_NAME = $1;',
  CREATE_ROLE: 'INSERT INTO ROLES(ROLE_NAME) VALUES($1) RETURNING *;',
  INSERT_ROLE_PERMISSION:
    'INSERT INTO ROLE_PERMISSIONS(ROLE_SID,RESOURCE_SID,ACTION_SID) \
    VALUES( \
      (SELECT ROLE_SID from ROLES where ROLE_NAME=$1), \
      (SELECT RESOURCE_SID from RESOURCES where RESOURCE_NAME = $2), \
      (SELECT ACTION_SID from ACTIONS where ACTION_NAME = $3) \
    ) RETURNING *;',
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
