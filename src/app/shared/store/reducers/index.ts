import { ActionReducerMap, MetaReducer, createSelector, createFeatureSelector } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { environment } from 'src/environments/environment';
import { spinnerReducer, isSpinnerActive, SpinnerState } from './spinner';

export const SHARED_FEATURE_KEY = 'shared';
export interface SharedState {
  spinner: SpinnerState;
}
export const reducers: ActionReducerMap<SharedState> = {
  spinner: spinnerReducer,
};
export const metaReducers: MetaReducer<SharedState>[] = environment.production ? [] : [];

const selectSharedState = createFeatureSelector<RootState, SharedState>(SHARED_FEATURE_KEY);
// Spinner selectors
const selectStateSpinner = createSelector(selectSharedState, (state: SharedState) => state.spinner);
export const selectSpinnerActive = createSelector(selectStateSpinner, isSpinnerActive);
