import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INJECT_USER_SECRET_TOKEN } from 'src/app/shared/constants/http-context';
import { RootState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { selectUser } from '../store/reducers';
import { first, mergeMap } from 'rxjs/operators';

@Injectable()
export class UserAuthInjectorInterceptor implements HttpInterceptor {
  constructor(private store: Store<RootState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(INJECT_USER_SECRET_TOKEN)) {
      return this.store.select(selectUser).pipe(
        first(),
        mergeMap((user) => {
          let secret_token = user?.secret_token || '';
          let userId = user?.userId || -1;

          let newRequest = request.clone({
            headers: request.headers.set('x-secret-token', secret_token).set('x-user-id', userId.toString()),
          });

          console.log(newRequest.headers);

          return next.handle(newRequest);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
