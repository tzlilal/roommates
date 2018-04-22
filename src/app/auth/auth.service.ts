import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/Rx";
import { Observable, ReplaySubject } from "rxjs";

import { User } from "./user.model";

@Injectable()
export class AuthService {
  private users: User[] = [];
  private currentUser: User;
  constructor(private http: Http) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post("http://localhost:3000/api", body, { headers: headers })
      .map((response: Response) => response.json)
      .catch((error: Response) => Observable.throw(error.json()));
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post("http://localhost:3000/api/signin", body, { headers: headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  logout() {
    localStorage.clear();
  }

  // checking if the user is logged in by checking if the token exist
  get isLoggedIn() {
    return localStorage.getItem("token") !== null;
  }

  get userName() {
    return this.currentUser ? this.currentUser.firstName : "";
  }

  getProfile() {
    if (this.currentUser) {
        let o = new ReplaySubject<User>()
        o.next(this.currentUser)
        return o;
    }
    // debugger
    const token = localStorage.getItem("token")
      ? "?token=" + localStorage.getItem("token")
      : "";
    return this.http
      .get("http://localhost:3000/api/profile" + token)
      .map((response: Response) => {
        const result = response.json();
        let user = new User(
          result.result.email,
          result.result.password,
          result.result.firstName,
          result.result.lastName
        );
        this.currentUser = user;
        // debugger
        return user;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getUsers() {
    return this.http
      .get("http://localhost:3000/api/search")
      .map((response: Response) => {
        const users = response.json().obj;
        let transformedUsers: User[] = [];
        for (let user of users) {
          transformedUsers.push(
            new User(user.email, user.password, user.firstName, user.lastName)
          );
        }
        this.users = transformedUsers;
        return transformedUsers;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
