import { createReducer } from '@ngrx/store';
import { CommonError, User } from 'src/app/shared/models';

export interface UserListState {
  users: Array<User>;
  error: CommonError | null;
}
export const initialUserListState: UserListState = {
  users: [],
  error: null,
};

export const userListReducer = createReducer(initialUserListState);
export const selectUserList = (state: UserListState) => state.users;
