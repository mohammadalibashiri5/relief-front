import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {ArticleResponse} from '../../models/ResponseModel/articleResponse';
import {ArticleService} from '../../services/article.service';
import {CategoryTypeResponse} from '../../models/ResponseModel/categoryTypeResponse';
import {CategoryTypeService} from '../../services/category-type.service';

@Component({
  selector: 'app-article-list',
  imports: [
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {
  /* articles: ArticleResponse[] = [];
   isLoading = false;
   currentCategory: string | null = null;

   constructor(private articleService: ArticleService) {}

   ngOnInit() {
     this.loadArticles();
   }

   onCategorySelected(category: string | null) {
     this.currentCategory = category;
     this.loadArticles();
   }

   loadArticles() {
     this.isLoading = true;
     this.articleService.getArticles(this.currentCategory || undefined).subscribe({
       next: (articles) => {
         this.articles = articles;
         this.isLoading = false;
       },
       error: () => {
         this.isLoading = false;
       }
     });
   } */

  articles: ArticleResponse[] = [];
  selectedCategory: string | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  // Define your categories with icons
  categories:CategoryTypeResponse[] = [];

  constructor(private readonly articleService: ArticleService, private readonly category:CategoryTypeService) {
  }

  ngOnInit(): void {
    this.loadArticles(); // Load all articles initially
    this.loadCategories();
  }
  loadCategories(): void {
    this.category.getCategoryTypes().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log('Categories loaded:', this.categories);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.errorMessage = 'Failed to load categories. Please try again later.';
      }
    });
  }

  loadArticles(category?: string): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.selectedCategory = category ?? null;

    this.articleService.getArticles(category).subscribe({
      next: (articles) => {
        this.articles = articles;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = category
          ? `No articles found for ${category}. Try another category.`
          : 'Failed to load articles. Please try again later.';
        this.articles = [];
        this.isLoading = false;
      }
    });
  }

  isActiveCategory(category: string): boolean {
    return this.selectedCategory === category;
  }

}
