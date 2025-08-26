import {Component, OnInit} from '@angular/core';
import {ArticleResponse} from '../../../models/ResponseModel/articleResponse';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ArticleService} from '../../../services/article.service';
import {DatePipe, NgIf, TitleCasePipe} from '@angular/common';
import {CardWithActionComponent} from '../../card-with-action/card-with-action.component';

@Component({
  selector: 'app-article-detail',
  imports: [
    TitleCasePipe,
    DatePipe,
    NgIf,
    RouterLink,
    CardWithActionComponent
  ],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit{
  article!: ArticleResponse;
  isLoading: boolean = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly articleService: ArticleService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticleById(id).subscribe(article => {
      if (!article) {
        console.error('Article not found');
        return;
      }
      this.article = article;
      this.isLoading = false;
    });
  }

  onEditArticle(category: any) {
    
  }

  onDeleteArticle(id: number) {
    
  }
}
