import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ArticleService} from '../../../services/article.service';
import {HeaderManagementComponent} from '../../header-management/header-management.component';
import {ItemsCardComponent} from '../../items-card/items-card.component';
import {CategoryTypeService} from '../../../services/category-type.service';
import {CategoryTypeResponse} from '../../../models/ResponseModel/categoryTypeResponse';
import {ToastrService} from 'ngx-toastr';
import {CardWithActionComponent} from '../../card-with-action/card-with-action.component';
import {ArticleResponse} from '../../../models/ResponseModel/articleResponse';
import {finalize} from 'rxjs';
import {ArticleRequest} from '../../../models/RequestModel/ArticleRequest';

@Component({
  selector: 'app-article-manage',
  imports: [
    NgIf,
    ReactiveFormsModule,
    HeaderManagementComponent,
    ItemsCardComponent,
    NgForOf,
    CardWithActionComponent
  ],
  templateUrl: './article-manage.component.html',
  styleUrl: './article-manage.component.css'
})
export class ArticleManageComponent implements OnInit {
  articleForm: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  isSubmitting = false;
  categories: string[] = [];
  categoryName: string = '';
  articles: ArticleResponse[] = [];
  articleId: number | null = null;
  isLoading: boolean = false;
  defaultImageUrl: string = 'assets/default-image.webp';

  constructor(private readonly fb: FormBuilder,
              private readonly articleService: ArticleService,
              private readonly toastr: ToastrService,
              private readonly categoryService: CategoryTypeService) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      content: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(5000)]],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  this.getCategories();
  this.getArticlesByAdmin();
  }

  getCategories():void {
    this.categoryService.getCategoryTypes().subscribe({
      next: (categories) => {
        this.categories = categories.map((category: CategoryTypeResponse) => category.name);
      },
      error: () => {
        this.toastr.error('Failed to load categories. Please try again later.');
      }
    });
  }

  onSubmit(): void {
    if (this.articleForm.invalid) return;

    this.isLoading = true;
    const formValue = this.articleForm.value;
    const requestDto: ArticleRequest = {
      title: formValue.title,
      imageUrl: formValue.imageUrl,
      content: formValue.content,
      category: formValue.category
    };

    if (this.articleId) {
      this.updateArticle(this.articleId, requestDto);
    } else {
      this.addArticle();
    }
  }
  getArticlesByAdmin(){
    this.articleService.getArticlesByAdmin().subscribe({
      next: (articles) => {
        this.articles = articles;
      },
      error: () => {
        this.toastr.error('Failed to load articles. Please try again later.');
      }
    });
  }

  addArticle(): void {
    if (this.articleForm.valid) {
      this.isSubmitting = true;

      this.articleService.addArticle(this.articleForm.value, this.type?.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.resetForm();
        },
        error: () => {
          this.isSubmitting = false;
          this.toastr.error('Failed to publish article. Please try again.');
        },
        complete: () => {
          this.toastr.success('Article published successfully!');
          this.getArticlesByAdmin();
        }
      })

    }
  }

  resetForm(): void {
    this.articleForm.reset();
    this.previewImage = null;
  }

  onEditArticle(article: ArticleResponse) {
    this.articleId = article.id;
    this.articleForm.patchValue({
      title: article.title,
      category: article.category,
      imageUrl: article.imageUrl,
      content: article.content
    });
  }

  onDeleteArticle(id: number) {
    this.articleService.deleteArticle(id).subscribe({
      next: () => {
        this.toastr.warning('Category deleted successfully');
        this.getArticlesByAdmin();
      },
      error: (error) => {
        if (error.status === 409) {
          this.toastr.error('Category cannot be deleted because it is associated with users');
          return;
        }
        this.toastr.error('Failed to delete article. Please try again.');
      }
    });
  }

  handleImageError(event: ErrorEvent) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImageUrl;
    imgElement.onerror = null;
  }

  onCancelEdit() {
    this.articleId = null;
    this.articleForm.reset();
  }
  updateArticle(articleId: number, requestDto:ArticleRequest) {
    this.articleService.updateArticle(articleId, requestDto)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (updatedAddiction) => {
          let index = -1;
          if (updatedAddiction) {
            index = this.articles.findIndex(a => a.id === updatedAddiction.id);
            if (index !== -1) {
              this.articles[index] = updatedAddiction;
            }
          }

          this.onCancelEdit();
        },
        error: (err) => console.error('Failed to update addiction', err),
        complete: () => {
          this.toastr.success('Article updated successfully!');
          this.getArticlesByAdmin();
        }
      });
  }


  get type() {
    return this.articleForm.get('category');
  }
}
