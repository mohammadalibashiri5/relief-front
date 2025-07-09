import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateogorySelectComponent } from './category-select.component';

describe('CateogorySelectComponent', () => {
  let component: CateogorySelectComponent;
  let fixture: ComponentFixture<CateogorySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CateogorySelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CateogorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
