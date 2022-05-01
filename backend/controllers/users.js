import { Router } from 'express';
export const router = Router();

import { HTTP_CODES } from '../helpers/config.js';
import { validateFields, makeError } from '../helpers/utils.js';
import { createUser, login } from '../services/users.js';

router.post('/new', function (req, response) {
    var username = req.body.username;
    var password = req.body.password;

    if (!validateFields(username, password)) {
        return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError("One or more required fields was null"))
    }

    return createUser(username, password, response);
});


router.post("/login", function (req, response) {
    var username = req.body.username;
    var password = req.body.password;

    if (!validateFields(username, password)) {
        return response.status(HTTP_CODES.BAD_REQUEST.code).json(makeError("One or more required fields was null"))
    }

    return login(username, password, response)
});

export default router;