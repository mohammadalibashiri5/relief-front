import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ArticleResponse} from '../../../models/ResponseModel/articleResponse';
import {DatePipe, SlicePipe, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-article-card',
  imports: [
    TitleCasePipe,
    DatePipe,
    SlicePipe
  ],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {

  @Input() article!: ArticleResponse;

  constructor(private readonly router: Router) { }

  readMore(): void {
    this.router.navigate(['/article', this.article.id]);
  }
}
