import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGourdGuard } from './auth-guard-guard';
describe('authGourdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGourdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
