import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryTypeService} from '../../services/category-type.service';
import {CategoryTypeRequest} from '../../models/RequestModel/categoryTypeRequest';
import {CategoryTypeResponse} from '../../models/ResponseModel/categoryTypeResponse';
import {NgForOf, NgIf} from '@angular/common';
import {AdminAddictionRequest} from '../../models/RequestModel/AdminAddictionRequest';
import {finalize} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {CardWithActionComponent} from '../card-with-action/card-with-action.component';
import {HeaderManagementComponent} from '../header-management/header-management.component';
import {ItemsCardComponent} from '../items-card/items-card.component';

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
    CardWithActionComponent,
    HeaderManagementComponent,
    ItemsCardComponent
  ]
})
export class AdminCategoryTypeComponent implements OnInit {

  categoryForm: FormGroup;
  categories: CategoryTypeResponse[] = [];
  defaultImageUrl: string = 'assets/default-image.webp';
  categoryId: number | null = null;
  isLoading: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryTypeService,
    private readonly toastr: ToastrService,
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });

  }

  ngOnInit(): void {
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
      next: () => {
        this.categoryForm.reset();
        this.loadCategories();
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


  onEditCategory(cat: CategoryTypeResponse) {
    this.categoryId = cat.id;
    this.categoryForm.patchValue({
      name: cat.name,
      imageUrl: cat.imageUrl
    });
  }

  onCancelEdit() {
    this.categoryId = null;
    this.categoryForm.reset();
  }

  onSubmit() {
    if (this.categoryForm.invalid) return;

    this.isLoading = true;
    const formValue = this.categoryForm.value;
    const requestDto: CategoryTypeRequest = {
      name: formValue.name,
      imageUrl: formValue.imageUrl
    };

    if (this.categoryId) {
      this.updateCategoryType(this.categoryId, requestDto);
    } else {
      this.addCategory();
    }
  }

  private updateCategoryType(categoryTypeId: number, requestDto: AdminAddictionRequest) {
    this.categoryService.updateCategoryType(categoryTypeId, requestDto)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (updatedAddiction) => {
          const index = this.categories.findIndex(a => a.id === updatedAddiction.id);
          if (index !== -1) {
            this.categories[index] = updatedAddiction;
          }
          this.onCancelEdit();
        },
        error: (err) => console.error('Failed to update addiction', err)
      });
  }

  onDeleteCategory(id: number) {
    this.categoryService.deleteCategoryType(id).subscribe({
      next: () => {
        this.toastr.warning('Category deleted successfully');
        this.loadCategories();
      },
      error: (error) => {
        if (error.status === 409) {
          this.toastr.error('Category cannot be deleted because it is associated with users');
          return;
        }
        this.toastr.error('Category to delete addiction');
      }
    });
  }
}
