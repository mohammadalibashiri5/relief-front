import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {HasRoleDirective} from '../../has-role.directive';

@Component({
  selector: 'app-articles',
  imports: [
    HasRoleDirective
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  constructor(private userService: UserService) {
  }

}
