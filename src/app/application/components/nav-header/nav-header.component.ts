import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogoutAction } from '../../store/actions/app.actions';
import { PermissionsService } from '../../service/permissions.service';
import { RootState } from 'src/app/store';
import { AppService } from '../../service/app.service';
import { hasPermission, selectIsAuthenticated } from '../../store/reducers';
@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent implements OnDestroy {
  public navOpen = false;
  public authenticated$: Observable<boolean>;
  private ngUnsubscribe: Subject<any>;
  public isAdmin$: Observable<boolean | null>;
  @Output() skipToMainContentClick = new EventEmitter();

  constructor(private store: Store<RootState>) {
    this.ngUnsubscribe = new Subject();
    this.authenticated$ = this.store.select(selectIsAuthenticated).pipe(takeUntil(this.ngUnsubscribe));
    this.isAdmin$ = this.store.select(hasPermission('ADMIN_PAGES', 'VIEW'));

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

  focusMain() {
    this.skipToMainContentClick.emit({ mainClicked: true });
    this.navOpen = false;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe?.next();
    this.ngUnsubscribe?.complete();
  }
}
