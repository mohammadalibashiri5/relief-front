import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {HasRoleDirective} from '../../has-role.directive';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-articles',
  imports: [
    HasRoleDirective,
    RouterLink
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  constructor(private userService: UserService) {
  }

}
