import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { selectUser } from 'src/app/application/store/reducers';
import { PermissionsService } from '../../shared/services/permissions.service';
import { RootState } from 'src/app/store';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private permissionService: PermissionsService, private store: Store<RootState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.hasPermission();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.hasPermission();
  }

  private hasPermission(): Observable<boolean> | boolean {
    return true;
    return this.store.select(selectUser).pipe(
      filter((user) => user != null),
      switchMap((user) =>
        this.permissionService.checkHasPermission({ user: user!, resource: 'ADMIN_PAGES', action: 'VIEW' })
      )
    );
  }
}
