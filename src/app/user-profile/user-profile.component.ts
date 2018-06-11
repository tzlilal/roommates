import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User; 
  showPhoneNumber = false; 

  constructor(private route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit() {
    // paramMap is the property that gives us all the parameters in this route 
    this.route.paramMap
    .subscribe(params => {
      let id = params.get('id'); // the id after the /user/:id  
      // service.getProfile(id); 
      this.authService.getUserProfile(id)
      .subscribe((user: User) => {
          this.user = user; 
          console.log(this.user); 
      });
    });
  }

  onPhoneClick() {
    this.showPhoneNumber = !this.showPhoneNumber; 
  }

  get RoommateGender() { 
    
  }

}
