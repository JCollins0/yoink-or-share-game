import { createReducer, on } from '@ngrx/store';
import { CommonError, User } from 'src/app/shared/models';
import { LoadUserListFailure, LoadUserListSuccess } from '../actions/user-list.actions';

export interface UserListState {
  users: Array<User>;
  error: CommonError | null;
}
export const initialUserListState: UserListState = {
  users: [],
  error: null,
};

export const userListReducer = createReducer(
  initialUserListState,
  on(LoadUserListSuccess, (state: UserListState, { users }) => ({ users: users, error: null })),
  on(LoadUserListFailure, (state: UserListState, { error }) => ({ users: [], error: error }))
);
export const selectUserList = (state: UserListState) => state.users;
