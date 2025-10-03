import {Component, OnInit} from '@angular/core';
import {DatePipe, SlicePipe, TitleCasePipe} from '@angular/common';
import {ArticleResponse} from '../../../models/ResponseModel/articleResponse';
import {ArticleService} from '../../../services/article.service';
import {CategoryTypeService} from '../../../services/category-type.service';
import {ItemsCardComponent} from '../../items-card/items-card.component';
import {Router, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-article-list',
  imports: [
    TitleCasePipe,
    ItemsCardComponent,
    SlicePipe,
    DatePipe
  ],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {
  articles: ArticleResponse[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';
  isLoading: boolean = true;

  constructor(
    private readonly articleService: ArticleService,
    private readonly categoryService: CategoryTypeService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadArticles();
  }

  loadCategories(): void {
    this.categoryService.getCategoryTypes().subscribe(categories => {
      this.categories = categories.map(category => category.name);
      this.categories.unshift('all');
    });
  }

  loadArticles(): void {
    this.isLoading = true;

    if (this.selectedCategory === 'all') {
      this.articleService.getAllArticles().subscribe({
        next: (articles) => {
          this.articles = articles;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.articleService.getArticlesByCategory(this.selectedCategory).subscribe({
        next: (articles) => {
          this.articles = articles;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.loadArticles();
  }


  onEditArticle(article: ArticleResponse) {

  }

  onDeleteArticle(id: number) {

  }

  resetFilters() {

  }


  onReadMore(id: number) {
    this.articleService.getArticleById(id).subscribe({
      next: (article) => {
        if (article) {
          this.router.navigate(['/article/', id]);
        }
      },
      error: () => {
        console.error('Failed to open article');
      }
    });

  }
}
