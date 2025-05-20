import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerDetailComponent } from './trigger-detail.component';

describe('TriggerDetailComponent', () => {
  let component: TriggerDetailComponent;
  let fixture: ComponentFixture<TriggerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriggerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
