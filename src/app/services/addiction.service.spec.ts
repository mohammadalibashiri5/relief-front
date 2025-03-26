import { TestBed } from '@angular/core/testing';

import { AddictionService } from './addiction.service';

describe('AddictionService', () => {
  let service: AddictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
