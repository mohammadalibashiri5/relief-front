import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {AdminAddictionResponse} from '../../models/ResponseModel/adminAddiction';
import {AdminAddictionService} from '../../services/admin-addiction.service';
import {CategoryTypeService} from '../../services/category-type.service';
import {CategoryTypeResponse} from '../../models/ResponseModel/categoryTypeResponse';


@Component({
  selector: 'app-admin-addictions',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './admin-addictions.component.html',
  styleUrl: './admin-addictions.component.css'
})
export class AdminAddictionsComponent implements OnInit{
  addictionForm: FormGroup;
  addictions: AdminAddictionResponse[] = [];
  categories: string[] = []; // Assuming categories are strings, adjust as necessary

  constructor(private fb: FormBuilder, private addictionService: AdminAddictionService, private categoryService:CategoryTypeService) { // Replace 'any' with your actual service type
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
    // Load existing addictions from service
    this.loadAddictions();
    this.loadCategories();
  }
  loadCategories(){
    this.categoryService.getCategoryTypes().subscribe({
      next: (categories) => {
        this.categories = categories.map((category: CategoryTypeResponse) => category.name);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }


  get type() { return this.addictionForm.get('type'); }
  get name() { return this.addictionForm.get('name'); }
  get imageUrl() { return this.addictionForm.get('imageUrl'); }

  addAddiction(): void {
    if (this.addictionForm.valid) {

       this.addictionService.createAddiction(this.addictionForm.value, this.type?.value).subscribe({
        next: () => {
          this.addictionForm.reset();
        },
        error: (error: any) => {
          alert('Failed to add addiction. Please try again.');
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
      error: (error: any) => {
        console.error('Error loading addictions:', error);
        alert('Failed to load addictions. Please try again.');
      }
    })
  }
}
