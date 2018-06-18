import { Injectable } from '@angular/core';
import "rxjs/Rx";
import { Observable, ReplaySubject } from "rxjs";
import { Http, Headers, Response } from "@angular/http";

import { User } from './user.model';
import { UserDetail } from './settings/user-detail/user-detail.model';
import { RoommateDetail } from './settings/roommate-detail/roommate-detail.model';

@Injectable()
export class UserService {
  private currentUser: User;
  private users: User[] = [];
  
  constructor(private http: Http) { }

  get userName() {
    return this.currentUser ? this.currentUser.firstName : "";
  }

  get user() {
    return this.currentUser ? this.currentUser : null;
  }

  getProfile() {
    if (this.currentUser) {
        let o = new ReplaySubject<User>();
        o.next(this.currentUser);
        return o;
    }
    // debugger
    const token = localStorage.getItem("token")
      ? "?token=" + localStorage.getItem("token")
      : "";
    return this.http
      .get("http://localhost:3000/profile" + token)
      .map((response: Response) => {
        const result = response.json();
        // console.log(result); 
        let user = new User(
          result.result.email,
          result.result.password,
          result.result.firstName,
          result.result.lastName,
          result.result._id
        );
        this.currentUser = user;
        // debugger
        return user;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getMatches() {
    const token = localStorage.getItem("token")
    ? "?token=" + localStorage.getItem("token")
    : "";
    return this.http
      .get("http://localhost:3000/matches" + token)
      .map((response: Response) => {
        const users = response.json().obj;
        let transformedUsers: User[] = [];
        for (let user of users) {
          transformedUsers.push(
            new User(user.email, user.password, user.firstName, user.lastName, user._id)
          );
        }
        return transformedUsers; 
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getUsers() {
    return this.http
      .get("http://localhost:3000/search")
      .map((response: Response) => {
        const users = response.json().obj;
        let transformedUsers: User[] = [];
        for (let user of users) {
          transformedUsers.push(
            new User(user.email, user.password, user.firstName, user.lastName, user._id)
          );
        }
        this.users = transformedUsers;
        return transformedUsers;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  addToFavorites(id) {
    const body = JSON.stringify(id);
    const token = localStorage.getItem("token")
    ? "?token=" + localStorage.getItem("token")
    : "";
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post("http://localhost:3000/favorites" + token, body, { headers: headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getFavorites() { 
    const token = localStorage.getItem("token")
    ? "?token=" + localStorage.getItem("token")
    : "";
    return this.http
      .get("http://localhost:3000/favorites" + token)
      .map((response: Response) => {
        const users = response.json().obj;
        let transformedUsers: User[] = [];
        for (let user of users) {
          transformedUsers.push(
            new User(user.email, user.password, user.firstName, user.lastName, user._id)
          );
        }
        return transformedUsers; 
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getUserProfile(id) {
    return this.http
    .get("http://localhost:3000/users/" + id)
    .map((response: Response) => {
      const userResult = response.json().obj;
      const userDetail = userResult.userDetail; 
      const transformedUserDetail = new UserDetail(
        userDetail.sex,
        userDetail.age,
        userDetail.regions,
        userDetail.martialStatus,
        userDetail.hasChildren,
        userDetail.occupation,
        userDetail.religion,
        userDetail.kitchen,
        userDetail.diet,
        userDetail.smoking,
        userDetail.animals,
        userDetail.playInstrument,
        userDetail.cleaning,
        userDetail.additionalInfo
      ); 
      const roommateDetail = userResult.roommateDetail; 
      const transformedRoommateDetail = new RoommateDetail(
        roommateDetail.minAge, 
        roommateDetail.maxAge, 
        roommateDetail.gender, 
        roommateDetail.occupation, 
        roommateDetail.religion, 
        roommateDetail.kitchen, 
        roommateDetail.diet, 
        roommateDetail.smoking, 
        roommateDetail.animals, 
        roommateDetail.playInstrument, 
        roommateDetail.cleaning
      );
      return new User(
        userResult.email,
        userResult.password,
        userResult.firstName,
        userResult.lastName,
        id,
        userResult.registryDate,
        userResult.isActive,
        userResult.phoneNumber,
        transformedUserDetail,
        transformedRoommateDetail,
        null,
        userResult.imagePath
       );
    });
  }
}
