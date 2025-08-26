import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleManageComponent } from './article-manage.component';

describe('ArticleManageComponent', () => {
  let component: ArticleManageComponent;
  let fixture: ComponentFixture<ArticleManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
