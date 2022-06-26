import { createAction, props } from '@ngrx/store';
import { Login, User, SignUp, PermissionCheck, PermissionsMatrix } from '../../../shared/models';
import { CommonError } from '../../../shared/models';

export const LoginAction = createAction('[USER] Login', props<{ credentials: Login }>());

export const LoginSuccess = createAction('[USER] Login Success', props<{ user: User }>());

export const LoginFailure = createAction('[USER] Login Failure', props<{ error: CommonError }>());

export const SignUpAction = createAction('[USER] SignUp', props<{ credentials: SignUp }>());

export const SignUpSuccess = createAction('[USER] SignUp Success', props<{ user: User }>());

export const SignUpFailure = createAction('[USER] SignUp Failure', props<{ error: CommonError }>());

export const LogoutAction = createAction('[USER] Logout');

export const LogoutSuccess = createAction('[USER] Logout Success');

export const IsAuthenticated = createAction('[USER] Check Authenticated');
export const IsAuthenticatedSuccess = createAction(
  '[USER] Check Authenticated Sucess',
  props<{ authenticated: boolean }>()
);
export const IsAuthenticatedFailure = createAction('[USER] Check Authenticated Failure');

export const GetPermissions = createAction('[Permissions] Get Permissions');
export const GetPermissionsSuccess = createAction(
  '[Permissions] Get Permissions Success',
  props<{ permissions: PermissionsMatrix }>()
);
export const GetPermissionsFailure = createAction(
  '[Permissions] Get Permissions Failure',
  props<{ error: CommonError }>()
);
