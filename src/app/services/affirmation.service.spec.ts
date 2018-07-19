import { TestBed, inject } from '@angular/core/testing';

import { AffirmationService } from './affirmation.service';

describe('AffirmationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AffirmationService]
    });
  });

  it('should be created', inject([AffirmationService], (service: AffirmationService) => {
    expect(service).toBeTruthy();
  }));
});
