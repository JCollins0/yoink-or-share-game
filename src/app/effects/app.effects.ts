import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { LoginAction, LoginFailure, LoginSuccess, SignUpAction, SignUpSuccess } from '../actions/app.actions';
import { AppService } from '../service/app.service';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private appService : AppService) {}

  /*
  Users
  */
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginAction),
      exhaustMap(action =>
        this.appService.login(action.credentials).pipe(
          map(user => LoginSuccess({ user })),
          catchError(resp => 
            {
              return of(LoginFailure({ error : resp.error }))
            }
          )
        )
      )
    )
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SignUpAction),
      exhaustMap(action =>
        this.appService.signUp(action.credentials).pipe(
          map(user => SignUpSuccess({ user })),
          catchError(resp => 
            {
              return of(LoginFailure({ error : resp.error }))
            }
          )
        )
      )
    )
  });
}