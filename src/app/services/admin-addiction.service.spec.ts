import { TestBed } from '@angular/core/testing';

import { AdminAddictionService } from './admin-addiction.service';

describe('AdminAddictionService', () => {
  let service: AdminAddictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAddictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
