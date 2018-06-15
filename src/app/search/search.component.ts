import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  users: User[];

  constructor(private authService: AuthService) { 
  }

  ngOnInit() {
    // this.authService.getUsers().subscribe(
    //   (users: User[]) => {
    //     this.users = users;
    //   }
    // );
  
    
    this.authService.getMatches().subscribe(
      (users: User[]) => {
        this.users = users; 
      }); 

  }

  onSubmit() {

  }

}
