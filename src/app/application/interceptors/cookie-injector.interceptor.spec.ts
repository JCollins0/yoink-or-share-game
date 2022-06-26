import { TestBed } from '@angular/core/testing';

import { CookieInjectorInterceptor } from './cookie-injector.interceptor';

describe('CookieInjectorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CookieInjectorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CookieInjectorInterceptor = TestBed.inject(CookieInjectorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
