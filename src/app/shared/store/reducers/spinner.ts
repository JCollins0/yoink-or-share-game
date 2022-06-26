import { createReducer, on } from '@ngrx/store';
import { StartSpinnerAction, StopSpinnerAction } from '../actions/spinner.actions';

export interface SpinnerState {
  count: number;
}

export const initialSpinnerState: SpinnerState = {
  count: 0,
};

export const spinnerReducer = createReducer(
  initialSpinnerState,
  on(StartSpinnerAction, (state) => ({ ...state, count: state.count + 1 })),
  on(StopSpinnerAction, (state) => ({ ...state, count: state.count - 1 }))
);

export const isSpinnerActive = (spinnerState: SpinnerState): boolean => {
  console.log(spinnerState.count > 0);
  return spinnerState.count > 0;
};
