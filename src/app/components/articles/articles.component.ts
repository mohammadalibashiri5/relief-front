import {Component, OnInit} from '@angular/core';
import {ArticleResponse} from '../../models/ResponseModel/articleResponse';
import {ArticleService} from '../../services/article.service';
import {AuthService} from '../../services/auth.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {HasRoleDirective} from '../../has-role.directive';

@Component({
  selector: 'app-articles',
  imports: [
    NgForOf,
    RouterLink,
    DatePipe,
    NgIf,
    HasRoleDirective
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {
  articles: ArticleResponse[] = [];
  selectedCategory: string | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  expandedArticleId: string | null = null;
  currentCategory: string | null = null;



  constructor(
    private readonly articleService: ArticleService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }
  onCategorySelected(category: string | null) {
    this.currentCategory = category;
    this.loadArticles();
  }

  loadArticles(category?: string): void {
    this.isLoading = true;
    this.selectedCategory = category ?? null;
    this.expandedArticleId = null; // Collapse any expanded article when changing category

    this.articleService.getArticles(category).subscribe({
      next: (articles) => {
        this.articles = articles;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = category
          ? `No articles found for ${category}`
          : 'Failed to load articles';
        this.articles = [];
        this.isLoading = false;
      }
    });
  }

  toggleArticleExpand(articleId: string): void {
    this.expandedArticleId = this.expandedArticleId === articleId ? null : articleId;
  }



}
