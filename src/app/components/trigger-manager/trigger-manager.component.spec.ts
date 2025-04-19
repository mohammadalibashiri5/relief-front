import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TriggerManagerComponent} from './trigger-manager.component';

describe('TriggerManagerComponent', () => {
  let component: TriggerManagerComponent;
  let fixture: ComponentFixture<TriggerManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriggerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
