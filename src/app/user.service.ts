import { User } from './auth/user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  user: User;
  userCreated; 

  constructor() { }

  setUser(user: User){
    this.user = user;
    console.log('from the service:', this.user.firstName);
  }

  getUser(){
    return this.user; 
  }

  setUserCreated(val){
    this.setUserCreated = val; 
  }

  getUserCreated(){
    return this.userCreated; 
  }

}
