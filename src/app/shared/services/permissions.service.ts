import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BYPASS_SPINNER_HTTP_CONTEXT } from '../constants/http-context';
import { PermissionCheck } from '../models';
import { SharedModule } from '../shared.module';
import { BaseService } from './base.service';

@Injectable({
  providedIn: SharedModule,
})
export class PermissionsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  checkHasPermission(payload: PermissionCheck): Observable<boolean> {
    return this.http.post<boolean>(this.url_prefix + '/api/permissions/check', payload, {
      context: new HttpContext().set(BYPASS_SPINNER_HTTP_CONTEXT, true),
    });
  }
}
