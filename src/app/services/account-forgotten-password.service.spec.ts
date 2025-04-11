import { TestBed } from '@angular/core/testing';

import { AccountForgottenPasswordService } from './account-forgotten-password.service';

describe('AccountForgottenPasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountForgottenPasswordService = TestBed.get(AccountForgottenPasswordService);
    expect(service).toBeTruthy();
  });
});
