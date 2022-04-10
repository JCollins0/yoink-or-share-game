import { NullTemplateVisitor } from '@angular/compiler';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { LoginFailure, LoginSuccess } from '../actions/app.actions';
import { CommonError } from '../models/common';
import { User } from '../models/user';


interface UserState {
  user : User | null
  error: CommonError | null
}

const initialUserState : UserState = {
  user: null,
  error: null,
}


export interface State {
  user: UserState
}
const initialState : State = {
  user: initialUserState,
}

export const userReducer = createReducer(
  initialUserState,
  on(LoginSuccess, (state : UserState, {user} ) => ({ user: user, error : null })),
  on(LoginFailure, (state : UserState, {error}) => ({ user: null, error : error }))
)

export const reducers: ActionReducerMap<State> = {
  user: userReducer
};
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

 
export const selectStateUser = (state: State) => state.user;
 
export const selectUser = createSelector(
  selectStateUser,
  (state: UserState) => state.user
);

export const selectOwnerId = createSelector(
  selectStateUser,
  (state: UserState) => {
    if(!state.user){
      return -1;
    }
    return state.user.userId
  }
)

export const selectIsAuthenticated = createSelector(
  selectStateUser,
  (state : UserState) => {
    if(!state.user){
      return false;
    }
    return state.user.secret_token !== null;
  }
)

export const getLoginError = createSelector(
  selectStateUser,
  (state : UserState) => state.error
)