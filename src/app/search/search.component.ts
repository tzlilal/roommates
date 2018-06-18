import { Component, OnInit } from '@angular/core';

import { User } from '../user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { 
  }

  ngOnInit() {
    // this.authService.getUsers().subscribe(
    //   (users: User[]) => {
    //     this.users = users;
    //   }
    // );
  
    
    this.userService.getMatches().subscribe(
      (users: User[]) => {
        this.users = users; 
      }); 

  }

  onSubmit() {

  }

}
