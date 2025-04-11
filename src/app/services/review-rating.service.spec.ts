import { TestBed } from '@angular/core/testing';

import { ReviewRatingService } from './review-rating.service';

describe('ReviewRatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewRatingService = TestBed.get(ReviewRatingService);
    expect(service).toBeTruthy();
  });
});
