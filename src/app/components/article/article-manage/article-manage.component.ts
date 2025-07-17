import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ArticleService} from '../../../services/article.service';
import {HeaderManagementComponent} from '../../header-management/header-management.component';
import {ItemsCardComponent} from '../../items-card/items-card.component';
import {CategoryTypeService} from '../../../services/category-type.service';
import {CategoryTypeResponse} from '../../../models/ResponseModel/categoryTypeResponse';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-article-manage',
  imports: [
    NgIf,
    ReactiveFormsModule,
    HeaderManagementComponent,
    ItemsCardComponent,
    NgForOf
  ],
  templateUrl: './article-manage.component.html',
  styleUrl: './article-manage.component.css'
})
export class ArticleManageComponent implements OnInit {
  articleForm: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  isSubmitting = false;
  isEditMode: any;
  categories: string[] = [];
  categoryName: string = '';

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
  this.categoryService.getCategoryTypes().subscribe({
      next: (categories) => {
        this.categories = categories.map((category: CategoryTypeResponse) => category.name);
        },
      error: () => {
        this.toastr.error('Failed to load categories. Please try again later.');
      }
    });
  }
  get type() {
    return this.articleForm.get('category');
  }

  onSubmit(): void {
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
        }
      })

    }
  }

  resetForm(): void {
    this.articleForm.reset();
    this.previewImage = null;
  }

}
