import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { AppErrorService } from 'src/app/shared/services/app-error.service';
import { AdminService } from '../../services/admin.sevice';
import { LoadUserList, LoadUserListFailure, LoadUserListSuccess } from '../actions/user-list.actions';

@Injectable()
export class UserListEffects {
  constructor(private actions$: Actions, private adminService: AdminService, private errorService: AppErrorService) {}

  loadUsersList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadUserList),
      exhaustMap((action) =>
        this.adminService.searchUsers().pipe(
          map((users) => LoadUserListSuccess({ users })),
          catchError((resp) => {
            return of(
              LoadUserListFailure({
                error: this.errorService.convertError(resp.error.errorCode),
              })
            );
          })
        )
      )
    );
  });
}
