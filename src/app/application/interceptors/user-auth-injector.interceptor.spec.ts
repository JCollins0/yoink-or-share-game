import { TestBed } from '@angular/core/testing';

import { UserAuthInjectorInterceptor } from './user-auth-injector.interceptor';

describe('UserAuthInjectorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UserAuthInjectorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UserAuthInjectorInterceptor = TestBed.inject(UserAuthInjectorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
