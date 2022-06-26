import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INJECT_USER_SECRET_TOKEN } from 'src/app/shared/constants/http-context';
import { User } from 'src/app/shared/models';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  searchUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.url_prefix + '/api/user/all', {
      context: new HttpContext().set(INJECT_USER_SECRET_TOKEN, true),
    });
  }
}
