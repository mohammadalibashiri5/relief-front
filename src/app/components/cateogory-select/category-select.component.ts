import {Component, EventEmitter, Output} from '@angular/core';
import {CategoryType} from '../../models/enum/CategoryType';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-category-select',
  imports: [
    NgForOf
  ],
  templateUrl: './category-select.component.html',
  styleUrl: './category-select.component.css'
})
export class CategorySelectComponent {

  @Output() categorySelected = new EventEmitter<string | null>();

  categories:CategoryType[] = Object.values(CategoryType);
  selectedCategory: string | null = null;

  selectCategory(category: string | null) {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }
}
