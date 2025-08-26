import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {

  constructor(private readonly router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }
}
