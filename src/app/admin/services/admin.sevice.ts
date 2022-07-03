import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get<Array<User>>(this.url_prefix + '/api/user/all');
  }
}
