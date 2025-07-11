import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderManagementComponent } from './header-management.component';

describe('HeaderManagementComponent', () => {
  let component: HeaderManagementComponent;
  let fixture: ComponentFixture<HeaderManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
