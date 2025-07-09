import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryTypeComponent } from './admin-category-type.component';

describe('AdminCategoryTypeComponent', () => {
  let component: AdminCategoryTypeComponent;
  let fixture: ComponentFixture<AdminCategoryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCategoryTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
