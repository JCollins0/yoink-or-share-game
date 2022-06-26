import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GetPermissions, IsAuthenticated } from './application/store/actions/app.actions';
import { PersistenceService } from './shared/services/persistence.service';
import { SpinnerService } from './shared/services/spinner.service';
import { RootState } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title: string = 'yoink-or-share';
  theme: string = '';
  spinnerActive$: Observable<boolean>;
  @ViewChild('MainContent') mainContent!: ElementRef;

  private readonly THEME_KEY = 'site-theme';

  routerSubscription: Subscription;
  updatePermissionSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private persistenceService: PersistenceService,
    private spinnerService: SpinnerService,
    private store: Store<RootState>
  ) {
    this.updatePermissionSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.store.dispatch(IsAuthenticated());
        this.store.dispatch(GetPermissions());
      });

    this.routerSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data['title']) {
              return child.snapshot.data['title'];
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data: any) => {
        if (data) {
          this.titleService.setTitle(data + ` - ${this.title}`);
        }
      });

    this.checkTheme();
    this.spinnerActive$ = this.spinnerService.isSpinnerActive();
  }

  private checkTheme() {
    this.theme = this.persistenceService.getItem(this.THEME_KEY) ?? 'light-theme';
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.updatePermissionSubscription.unsubscribe();
  }

  focusMain(event: any) {
    if (event.mainClicked) {
      this.mainContent?.nativeElement.focus();
    }
  }
}
