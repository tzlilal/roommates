import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/Rx";
import { Observable, ReplaySubject } from "rxjs";

import { User } from "../user.model";
import { UserDetail } from "../settings/user-detail/user-detail.model";
import { RoommateDetail } from './../settings/roommate-detail/roommate-detail.model';

@Injectable()
export class AuthService {
  private users: User[] = [];
  // private currentUser: User;

  constructor(private http: Http) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post("http://localhost:3000/auth", body, { headers: headers })
      .map((response: Response) => response.json)
      .catch((error: Response) => Observable.throw(error.json()));
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post("http://localhost:3000/auth/signin", body, { headers: headers })
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

}
