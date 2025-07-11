import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ArticleService} from '../../services/article.service';

@Component({
  selector: 'app-article-manage',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './article-manage.component.html',
  styleUrl: './article-manage.component.css'
})
export class ArticleManageComponent {
  articleForm: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  isSubmitting = false;
  isEditMode: any;

  constructor(private readonly fb: FormBuilder, private readonly articleService:ArticleService) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      content: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(5000)]],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      this.isSubmitting = true;
      const articleData = {
        ...this.articleForm.value,
        publishedDate: new Date().toISOString()
      };

      this.articleService.addArticle(this.articleForm.value).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.resetForm();
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error publishing article:', error);
          alert('Failed to publish article. Please try again.');
        }
      })

      // Here you would typically call your API service
      console.log('Submitting article:', articleData);

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.resetForm();
        alert('Article published successfully!');
      }, 1500);
    }
  }

  resetForm(): void {
    this.articleForm.reset();
    this.previewImage = null;
  }

}
