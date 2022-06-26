import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { BYPASS_SPINNER_HTTP_CONTEXT } from 'src/app/shared/constants/http-context';
import { PermissionCheck, PermissionsMatrix } from 'src/app/shared/models';
import { BaseService } from 'src/app/shared/services/base.service';
import { RootState } from 'src/app/store';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService extends BaseService {
  constructor(private http: HttpClient, private store: Store<RootState>) {
    super();
  }

  checkHasPermission(payload: PermissionCheck): Observable<boolean> {
    return this.http.post<boolean>(this.url_prefix + '/api/permissions/check', payload, {
      context: new HttpContext().set(BYPASS_SPINNER_HTTP_CONTEXT, true),
    });
  }

  getPermissions(): Observable<PermissionsMatrix> {
    return this.http.get<PermissionsMatrix>(this.url_prefix + '/api/permissions/me', {
      context: new HttpContext().set(BYPASS_SPINNER_HTTP_CONTEXT, true),
    });
  }
}
