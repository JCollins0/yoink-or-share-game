import { createAction, props } from '@ngrx/store';
import { CommonError, User } from 'src/app/shared/models';

export const LoadUserList = createAction('[User List] Load');
export const LoadUserListSuccess = createAction('[User List] Load Success', props<{ users: Array<User> }>());
export const LoadUserListFailure = createAction('[User List] Load Falure', props<{ error: CommonError }>());
