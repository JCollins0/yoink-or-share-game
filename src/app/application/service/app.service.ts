import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp, User } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class AppService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  login(payload: Login): Observable<User> {
    return this.http.post<User>(this.url_prefix + '/api/user/login', payload);
  }

  signUp(payload: SignUp): Observable<User> {
    return this.http.post<User>(this.url_prefix + '/api/user/new', payload);
  }
}
