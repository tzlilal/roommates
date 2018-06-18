import { Component, OnInit } from '@angular/core';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getFavorites().subscribe(
      (users: User[]) => {
        this.users = users; 
      }); 
  }

}
