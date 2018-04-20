import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../auth/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;
  isDataAvailable: boolean; 
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isDataAvailable = false; 
    this.authService.getProfile().subscribe(
      user => 
        this.user = user, 
      error => console.log(error), 
      () => this.isDataAvailable = true
    ); 
  }

}
