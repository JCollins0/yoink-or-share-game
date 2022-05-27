import { createAction, props } from '@ngrx/store';
import { Login, User, SignUp } from '../models/user';
import { CommonError } from '../models/common';

export const LoginAction = createAction(
    '[USER] Login',
    props<{ credentials: Login }>()
);

export const LoginSuccess = createAction(
    '[USER] Login Success',
    props<{ user: User }>()
);

export const LoginFailure = createAction(
    '[USER] Login Failure',
    props<{ error: CommonError }>()
);

export const SignUpAction = createAction(
    '[USER] SignUp',
    props<{ credentials: SignUp }>()
);

export const SignUpSuccess = createAction(
    '[USER] SignUp Success',
    props<{ user: User }>()
);

export const SignUpFailure = createAction(
    '[USER] SignUp Failure',
    props<{ error: CommonError }>()
);

export const LogoutAction = createAction(
    '[USER] Logout'
)

export const LogoutSuccess = createAction(
    '[USER] Logout Success'
)
