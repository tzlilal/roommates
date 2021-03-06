import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  constructor(
    public authService: AuthService,
    public userService: UserService
  ) {
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  ngOnInit() {
    if(this.isLoggedIn ){
      this.userService.getProfile().subscribe(
        (user: User) => {
          this.user = user;
        });
    }
  }

}
