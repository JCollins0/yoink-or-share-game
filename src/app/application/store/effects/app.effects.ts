import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import {
  GetPermissions,
  GetPermissionsFailure,
  GetPermissionsSuccess,
  IsAuthenticated,
  IsAuthenticatedSuccess,
  IsAuthenticatedFailure,
  LoginAction,
  LoginFailure,
  LoginSuccess,
  LogoutAction,
  LogoutSuccess,
  SignUpAction,
  SignUpSuccess,
} from '../actions/app.actions';
import { AppErrorService } from 'src/app/shared/services/app-error.service';
import { AppService } from '../../service/app.service';
import { PermissionsService } from '../../service/permissions.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private appService: AppService,
    private router: Router,
    private errorService: AppErrorService,
    private permissionsService: PermissionsService
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginAction),
      exhaustMap((action) =>
        this.appService.login(action.credentials).pipe(
          map((user) => LoginSuccess({ user })),
          catchError((resp) => {
            console.log(resp);
            return of(
              LoginFailure({
                error: this.errorService.convertError(resp.error.errorCode),
              })
            );
          })
        )
      )
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SignUpAction),
      exhaustMap((action) =>
        this.appService.signUp(action.credentials).pipe(
          map((user) => SignUpSuccess({ user })),
          catchError((resp) => {
            return of(
              LoginFailure({
                error: this.errorService.convertError(resp.error.errorCode),
              })
            );
          })
        )
      )
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LogoutAction),
      switchMap(() => this.appService.logout().pipe(map(() => LogoutSuccess()))),
      tap(() => {
        this.router.navigate(['/login']);
      })
    );
  });

  permissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetPermissions),
      switchMap(() =>
        this.permissionsService.getPermissions().pipe(
          map((res) => GetPermissionsSuccess({ permissions: res })),
          catchError((err) => of(GetPermissionsFailure({ error: this.errorService.convertError(err) })))
        )
      )
    )
  );

  authenticated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IsAuthenticated),
      switchMap(() =>
        this.appService.isAuthenticated().pipe(
          map((res) => IsAuthenticatedSuccess({ authenticated: res })),
          catchError((err) => of(IsAuthenticatedFailure()))
        )
      )
    )
  );
}
