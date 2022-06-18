import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogoutAction } from 'src/app/actions/app.actions';
import { selectIsAuthenticated, State } from 'src/app/reducers';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent implements OnDestroy {
  public navOpen = false;
  public authenticated$: Observable<boolean>;
  private ngUnsubscribe: Subject<any>;

  constructor(private store: Store<State>) {
    this.ngUnsubscribe = new Subject();
    this.authenticated$ = this.store.select(selectIsAuthenticated).pipe(takeUntil(this.ngUnsubscribe));

    this.authenticated$.subscribe((authenticated) => {
      if (authenticated) {
        setTimeout(() => {
          this.store.dispatch(LogoutAction());
        }, 60000 * 5);
      }
    });
  }

  logout() {
    this.store.dispatch(LogoutAction());
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe?.next();
    this.ngUnsubscribe?.complete();
  }
}
