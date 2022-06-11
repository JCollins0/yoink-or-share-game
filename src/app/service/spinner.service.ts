import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StartSpinnerAction, StopSpinnerAction } from '../actions/spinner.actions';
import { selectSpinnerActive, State } from '../reducers';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor(private store: Store<State>) {}

  public startSpinner(): void {
    this.store.dispatch(StartSpinnerAction());
  }

  public stopSpinner(): void {
    this.store.dispatch(StopSpinnerAction());
  }

  public isSpinnerActive(): Observable<boolean> {
    return this.store.select(selectSpinnerActive);
  }
}
