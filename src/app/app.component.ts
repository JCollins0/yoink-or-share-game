import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PersistenceService } from './service/persistence.service';
import { SpinnerService } from './service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title: string = 'yoink-or-share';
  theme: string = '';
  spinnerActive$: Observable<boolean>;

  private readonly THEME_KEY = 'site-theme';

  routerSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private persistenceService: PersistenceService,
    private spinnerService: SpinnerService
  ) {
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
  }
}
