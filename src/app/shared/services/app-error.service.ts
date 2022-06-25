import { Injectable } from '@angular/core';
import { ERROR_CODES } from '../constants/error-codes';
import { CommonError } from '../models';
import { SharedModule } from '../shared.module';

@Injectable({
  providedIn: SharedModule,
})
export class AppErrorService {
  constructor() {}

  convertError(code: number): CommonError {
    return { error: ERROR_CODES[code] || $localize`:@@unknown-error-code:Error Code\: ${code}` };
  }
}
