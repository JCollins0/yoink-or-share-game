import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BYPASS_SPINNER_HTTP_CONTEXT } from '../constants/http-context';
import { SpinnerService } from '../service/spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.context.get(BYPASS_SPINNER_HTTP_CONTEXT)) {
      console.log('Skipping spinner', request);
      return next.handle(request);
    }

    console.log('using spinner', request);
    this.spinnerService.startSpinner();

    return next.handle(request).pipe(
      finalize(() => {
        this.spinnerService.stopSpinner();
      })
    );
  }
}
