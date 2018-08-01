import { TestBed, inject } from '@angular/core/testing';

import { MatrixcollectionService } from './matrixcollection.service';

describe('MatrixcollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatrixcollectionService]
    });
  });

  it('should be created', inject([MatrixcollectionService], (service: MatrixcollectionService) => {
    expect(service).toBeTruthy();
  }));
});
