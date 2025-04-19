import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddictionAddComponent } from './addiction-manager.component';

describe('AddictionAddComponent', () => {
  let component: AddictionAddComponent;
  let fixture: ComponentFixture<AddictionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddictionAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddictionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
