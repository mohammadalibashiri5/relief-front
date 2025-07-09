import { TestBed } from '@angular/core/testing';

import { CategoryTypeService } from './category-type.service';

describe('CategoryTypeService', () => {
  let service: CategoryTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
