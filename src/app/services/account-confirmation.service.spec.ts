import { TestBed } from '@angular/core/testing';

import { AccountConfirmationService } from './account-confirmation.service';

describe('AccountConfirmationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountConfirmationService = TestBed.get(AccountConfirmationService);
    expect(service).toBeTruthy();
  });
});
