import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RootState } from 'src/app/store';
import { AppService } from '../service/app.service';
import { GetPermissions, IsAuthenticated } from '../store/actions/app.actions';
import { selectIsAuthenticated } from '../store/reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private appService: AppService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticated();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticated();
  }

  private isAuthenticated(): Observable<boolean> {
    return this.appService.isAuthenticated().pipe(
      tap((auth) => {
        if (!auth) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
