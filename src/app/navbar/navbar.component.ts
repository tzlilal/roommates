import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  isDataAvailable: boolean; 

  constructor(private authService: AuthService) {
    if(this.isLoggedIn()) {
      this.isDataAvailable = false; 
      this.authService.getProfile().subscribe(
        user => 
          this.user = user, 
        error => console.log(error), 
        () => this.isDataAvailable = true
      );  
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  ngOnInit() {
    // if(this.isLoggedIn()) {

    //   this.authService.getProfile().subscribe(
    //     (user: User) => {
    //       this.user = user;
    //     }
    //   ); 
    // }
  }

}
