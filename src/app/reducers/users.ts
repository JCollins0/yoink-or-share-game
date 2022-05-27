import { createReducer, on } from "@ngrx/store"
import { LoginSuccess, LoginFailure, LogoutSuccess } from "../actions/app.actions"
import { CommonError } from "../models/common"
import { User } from "../models/user"

export interface UserState {
    user : User | null
    error: CommonError | null
}
export const initialUserState : UserState = {
    user: null,
    error: null,
}
  
export const userReducer = createReducer(
    initialUserState,
    on(LoginSuccess, (state : UserState, {user} ) => ({ user: user, error : null })),
    on(LoginFailure, (state : UserState, {error}) => ({ user: null, error : error })),
    on(LogoutSuccess, (state: UserState) => ({user: null, error: null}))
)

export const getUser = (state: UserState) => state.user;
export const getOwnerId = (state: UserState) => !state.user ? -1 : state.user.userId;
export const isOwnerAuthenticated = (state : UserState) => !state.user ? false : state.user.secret_token !== null;
export const getLoginError = (state : UserState) => state.error;