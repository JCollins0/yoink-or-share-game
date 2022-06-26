import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp, User } from 'src/app/shared/models';
import { Observable, of } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { catchError, switchMap } from 'rxjs/operators';
import { GetPermissions, IsAuthenticated } from '../store/actions/app.actions';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';

@Injectable({
  providedIn: 'root',
})
export class AppService extends BaseService {
  constructor(private http: HttpClient, private store: Store<RootState>) {
    super();
  }

  login(payload: Login): Observable<User> {
    return this.http.post<User>(this.url_prefix + '/api/user/login', payload);
  }

  signUp(payload: SignUp): Observable<User> {
    return this.http.post<User>(this.url_prefix + '/api/user/new', payload);
  }

  logout(): Observable<void> {
    return this.http.post<void>(this.url_prefix + '/api/user/logout', {});
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(this.url_prefix + '/api/user/isAuthenticated').pipe(catchError((err) => of(false)));
  }
}
