import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {AdminAddictionResponse} from '../../models/ResponseModel/adminAddiction';
import {AdminAddictionService} from '../../services/admin-addiction.service';
import {CategoryTypeService} from '../../services/category-type.service';
import {CategoryTypeResponse} from '../../models/ResponseModel/categoryTypeResponse';
import {ToastrService} from 'ngx-toastr';
import {AdminAddictionRequest} from '../../models/RequestModel/AdminAddictionRequest';
import {finalize} from 'rxjs';
import {CardWithActionComponent} from '../card-with-action/card-with-action.component';
import {HeaderManagementComponent} from '../header-management/header-management.component';
import {ItemsCardComponent} from '../items-card/items-card.component';


@Component({
  selector: 'app-admin-addictions',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    CardWithActionComponent,
    HeaderManagementComponent,
    ItemsCardComponent,
  ],
  templateUrl: './admin-addictions.component.html',
  standalone: true,
  styleUrl: './admin-addictions.component.css'
})
export class AdminAddictionsComponent implements OnInit {
  addictionForm: FormGroup;
  addictions: AdminAddictionResponse[] = [];
  categories: string[] = [];
  currentEditId: number | null = null;
  isLoading = false;

  constructor(private readonly fb: FormBuilder, private readonly addictionService: AdminAddictionService, private readonly categoryService: CategoryTypeService, private readonly toastr: ToastrService) { // Replace 'any' with your actual service type
    this.addictionForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      imageUrl: ['', [
        Validators.required,
        Validators.pattern(/^https?:\/\/.+/)
      ]]
    });
  }

  ngOnInit(): void {
    this.loadAddictions();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategoryTypes().subscribe({
      next: (categories) => {
        this.categories = categories.map((category: CategoryTypeResponse) => category.name);
      },
      error: () => {
      }
    });
  }


  get type() {
    return this.addictionForm.get('type');
  }

  get name() {
    return this.addictionForm.get('name');
  }

  get imageUrl() {
    return this.addictionForm.get('imageUrl');
  }

  addAddiction(): void {
    if (this.addictionForm.valid) {

      this.addictionService.createAddiction(this.addictionForm.value, this.type?.value).subscribe({
        next: () => {
          this.addictionForm.reset();
        },
        error: () => {
          this.toastr.error('Failed to add addiction. Please try again.');
        },
        complete: () => {
          this.loadAddictions();
        }
      });
    }
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/default-image.webp';
  }

  loadAddictions() {
    this.addictionService.getAllAddictions().subscribe({
      next: (addictions: AdminAddictionResponse[]) => {
        this.addictions = addictions;
      },
      error: () => {
        this.toastr.error('Failed to load addictions. Please try again.');
      }
    })
  }

  onEditAddiction(addiction: AdminAddictionResponse) {
    this.currentEditId = addiction.id;
    this.addictionForm.patchValue({
      type: addiction.categoryType,
      name: addiction.name,
      imageUrl: addiction.imageUrl
    });
  }

  onCancelEdit() {
    this.currentEditId = null;
    this.addictionForm.reset();
  }

  onSubmit() {
    if (this.addictionForm.invalid) return;

    this.isLoading = true;
    const formValue = this.addictionForm.value;
    const requestDto: AdminAddictionRequest = {
      name: formValue.name,
      imageUrl: formValue.imageUrl
    };

    if (this.currentEditId) {
      this.updateAddiction(this.currentEditId, requestDto);
    } else {
      this.addAddiction();
    }
  }

  private updateAddiction(addictionId: number, requestDto: AdminAddictionRequest) {
    this.addictionService.updateAddiction(addictionId, requestDto)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (updatedAddiction) => {
          const index = this.addictions.findIndex(a => a.id === updatedAddiction.id);
          if (index !== -1) {
            this.addictions[index] = updatedAddiction;
          }
          this.onCancelEdit();
        },
        error: (err) => console.error('Failed to update addiction', err)
      });
  }

  onDeleteAddiction(id: number) {
    if (confirm(`Are you sure you want to delete"?`)) {
      this.addictionService.deleteAddiction(id).subscribe({
        next: () => {
          this.toastr.warning('Addiction deleted successfully');
          this.loadAddictions();
        },
        error: (error) => {
          if (error.status === 409) {
            this.toastr.error('Addiction cannot be deleted because it is associated with users');
            return;
          }
          this.toastr.error('Failed to delete addiction');
        },

      });
    }
  }
}
