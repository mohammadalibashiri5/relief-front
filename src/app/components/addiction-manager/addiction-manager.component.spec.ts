import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddictionManagerComponent} from './addiction-manager.component';

describe('AddictionAddComponent', () => {
  let component: AddictionManagerComponent;
  let fixture: ComponentFixture<AddictionManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddictionManagerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddictionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
