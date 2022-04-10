import { Router } from 'express';
export const router = Router();

import { pool, constructQuery, getUserResponse } from  '../helpers/db_helper.js';
import {QUERIES, HTTP_CODES} from '../helpers/config.js';
import {validateFields, makeError} from '../helpers/utils.js';

router.post('/new', function(req, response){
    var username = req.body.username;
    var password = req.body.password;

    if(!validateFields(username, password)){
        return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError("One or more required fields was null"))
    }
    
    // lookup user in database
    pool
    .query(constructQuery(QUERIES.USER_LOOKUP, username))
    .then(res => {
        if (res.rows.length > 0){
            // user already exists send error to frontend
            return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError("User already exists"))
        }
        // user doesn't exist, add new entry
        pool
        .query(constructQuery(QUERIES.CREATE_USER, username, password))
        .then(res => {
            var user = res.rows[0];
            return response.status(HTTP_CODES.CREATED.code).json(getUserResponse(user))
        })
        .catch(err =>
            setImmediate(() => {
                return response.status(HTTP_CODES.SERVER_ERROR.code).json(makeError(HTTP_CODES.SERVER_ERROR.msg))
            })
        )
    })
    .catch(err =>
        setImmediate(() => {
            return response.status(HTTP_CODES.SERVER_ERROR.code).json(makeError(HTTP_CODES.SERVER_ERROR.msg))
        })
    )
});


router.post("/login", function(req, response){
    var username = req.body.username;
    var password = req.body.password;

    pool
    .query(constructQuery(QUERIES.USER_LOGIN, username, password))
    .then(res => {
        if(res.rows.length === 0){
            return response.status(HTTP_CODES.UNAUTHORIZED.code).json(makeError("Wrong username or password"))
        }
        var user = res.rows[0];
        return response.status(HTTP_CODES.OK.code).json(getUserResponse(user))
    })
    .catch(err =>
        setImmediate(() => {
            return response.status(HTTP_CODES.SERVER_ERROR.code).json(makeError(HTTP_CODES.SERVER_ERROR.msg))
        })
    )

});

export default router;