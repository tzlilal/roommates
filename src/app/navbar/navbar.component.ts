import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { UserService } from '../user.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  userName;

  constructor(private authService: AuthService, private userService: UserService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  ngOnInit() { 
  }

  getUserName(){
    if(this.userService.getUserCreated()){
      this.user = this.userService.getUser();
      this.userName = this.user.firstName;
      return this.userName;
    } 
  }

}
