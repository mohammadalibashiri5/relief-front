import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryTypeService } from '../../services/category-type.service';
import { CategoryTypeRequest } from '../../models/RequestModel/categoryTypeRequest';
import { CategoryTypeResponse } from '../../models/ResponseModel/categoryTypeResponse';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-admin-category-type',
  standalone: true,
  templateUrl: './admin-category-type.component.html',
  styleUrl: './admin-category-type.component.css',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,

  ]
})
export class AdminCategoryTypeComponent {
  categoryForm: FormGroup;
  categories: CategoryTypeResponse[] = [];
  defaultImageUrl = 'assets/default-image.webp';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryTypeService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });

    this.loadCategories();
  }

  get name() {
    return this.categoryForm.get('name');
  }

  get imageUrl() {
    return this.categoryForm.get('imageUrl');
  }

  loadCategories() {
    this.categoryService.getCategoryTypes().subscribe({
      next: (categories) => this.categories = categories,
      error: (error) => console.error('Error loading categories:', error)
    });
  }

  addCategory() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const categoryData: CategoryTypeRequest = {
      name: this.name?.value,
      imageUrl: this.imageUrl?.value
    };

    this.categoryService.createCategoryType(categoryData).subscribe({
      next: (response) => {
        this.categoryForm.reset(); // Clear form
        this.loadCategories(); // Reload category list
      },
      error: (error) => {
        console.error('Error creating category:', error);
      }
    });
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImageUrl;
    imgElement.onerror = null;
  }
}
