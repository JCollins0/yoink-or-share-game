import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from 'src/app/store';
import { StartSpinnerAction, StopSpinnerAction } from '../store/actions/spinner.actions';
import { selectSpinnerActive } from '../store/reducers';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor(private store: Store<RootState>) {}

  public startSpinner(): void {
    this.store.dispatch(StartSpinnerAction());
  }

  public stopSpinner(): void {
    this.store.dispatch(StopSpinnerAction());
  }

  public isSpinnerActive(): Observable<boolean> {
    this.store
      .select((state: any) => state.shared.spinner)
      .subscribe((test) => {
        console.log(test);
      });

    return this.store.select(selectSpinnerActive);
  }
}
