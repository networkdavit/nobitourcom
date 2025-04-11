import { TestBed } from '@angular/core/testing';

import { CanonicalUrlService } from './canonical-url.service';

describe('CanonicalUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanonicalUrlService = TestBed.get(CanonicalUrlService);
    expect(service).toBeTruthy();
  });
});
