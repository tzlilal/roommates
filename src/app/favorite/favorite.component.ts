import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  users: User[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getFavorites().subscribe(
      (users: User[]) => {
        this.users = users; 
      }); 
  }

}
