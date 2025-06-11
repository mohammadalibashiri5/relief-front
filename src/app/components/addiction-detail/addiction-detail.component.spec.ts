import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddictionDetailComponent } from './addiction-detail.component';

describe('AddictionDetailComponent', () => {
  let component: AddictionDetailComponent;
  let fixture: ComponentFixture<AddictionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddictionDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddictionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
