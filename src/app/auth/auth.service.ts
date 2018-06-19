import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/Rx";
import { Observable } from "rxjs";

import { User } from "../user.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AuthService {

  constructor(private http: Http, private errorService: ErrorService) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post("http://localhost:3000/auth", body, { headers: headers })
      .map((response: Response) => response.json)
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post("http://localhost:3000/auth/signin", body, { headers: headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  logout() {
    localStorage.clear();
  }

  // checking if the user is logged in by checking if the token exist
  get isLoggedIn() {
    return localStorage.getItem("token") !== null;
  }

}
