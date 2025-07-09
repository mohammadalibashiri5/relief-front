import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddictionsComponent } from './admin-addictions.component';

describe('AdminAddictionsComponent', () => {
  let component: AdminAddictionsComponent;
  let fixture: ComponentFixture<AdminAddictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddictionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
