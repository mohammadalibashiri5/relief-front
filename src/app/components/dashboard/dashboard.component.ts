import {Component, OnInit} from '@angular/core';
import {IUserResponse} from '../../models/ResponseModel/userResponse';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  user!: IUserResponse;

  constructor(private login:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.loadUser();
  }


   loadUser() {
    this.login.getUser().subscribe({
      next:value => {
        this.user = value;
      },
      error:err => {
        if (err) {
          this.router.navigate(['login']).then(() => sessionStorage.clear());
        }
        alert("Oops, one error is found " );
      }
    })
  }

  logout() {
    if (sessionStorage.getItem("token")) {
      this.router.navigate(['login']).then(() => sessionStorage.clear());
    }
  }

}
