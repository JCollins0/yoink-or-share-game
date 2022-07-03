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
import { Observable, of } from 'rxjs';
import { PermissionsService } from '../service/permissions.service';
import { RootState } from 'src/app/store';
import { hasPermission, selectPermissions } from '../store/reducers';
import { GetPermissions } from '../store/actions/app.actions';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<RootState>,
    private permissionsService: PermissionsService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.hasPermissionCheck();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.hasPermissionCheck();
  }

  private hasPermissionCheck(): Observable<boolean> | boolean {
    return this.store
      .select(hasPermission('ADMIN_PAGES', 'VIEW'))
      .pipe(() => this.permissionsService.checkHasPermission({ resource: 'ADMIN_PAGES', action: 'VIEW' }))
      .pipe(
        tap((hasPermission) => {
          if (!hasPermission) {
            this.router.navigate(['/']);
          }
        })
      );
  }
}
