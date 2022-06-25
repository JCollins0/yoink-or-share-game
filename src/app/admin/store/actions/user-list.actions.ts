import { createAction, props } from '@ngrx/store';

export const LoadUserList = createAction('[User List] Load');
export const LoadUserListSuccess = createAction('[User List] Load Success');
export const LoadUserListFailure = createAction('[User List] Load Falure');
