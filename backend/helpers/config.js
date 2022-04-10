export const CONFIG = 
{
    "local" : {
        "db" : {
            "connectionString": "postgres://postgres:password@localhost:5432/postgres",
        }
    },
    "production" : {
        "db" : {
            "connectionString": process.env.DATABASE_URL,
            "ssl" : {
                "rejectUnauthorized" : false
            }
        }
    }
}

export const QUERIES = {
    VERIFY_USER_TOKEN : 'SELECT user_id from users where user_id = $1 and secret_token = $2;',
    USER_LOOKUP : 'SELECT user_name from users where user_name = $1;',
    CREATE_USER : 'INSERT INTO users(user_name, passwd) VALUES($1, $2) RETURNING *;',
    USER_LOGIN : 'SELECT * from users where user_name = $1 and passwd = $2;',
}

export const HTTP_CODES = {
    OK : {
        code: 200,
        msg: "OK"
    },
    CREATED : {
        code: 201,
        msg: "Created"
    },
    BAD_REQUEST : {
        code: 400,
        msg: "Bad Request"
    },
    UNAUTHORIZED : {
        code: 401,
        msg: "Unauthroized"
    },
    FORBIDDEN : {
        code: 403,
        msg: "Forbidden"
    },
    NOT_FOUND : {
        code: 404,
        msg: "Not found"
    },
    SERVER_ERROR : {
        code: 500,
        msg: "Some error occured while processing request"
    },
}