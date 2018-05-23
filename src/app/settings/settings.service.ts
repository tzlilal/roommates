import { User } from './../auth/user.model';
import { Http, Headers, Response } from '@angular/http';
import { Observable, ReplaySubject } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  constructor(private http: Http) { }

  changeDetailAccount(user) {
    const body = JSON.stringify(user); 
    const token = localStorage.getItem("token")
    ? "?token=" + localStorage.getItem("token")
    : "";
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post("http://localhost:3000/api/account" + token, body, { headers: headers })
      .map((response: Response) => console.log(response.json))
      .catch((error: Response) => Observable.throw(error.json()));
  }

  setUserDetail(userDetail) {
    const body = JSON.stringify(userDetail); 
    const token = localStorage.getItem("token")
    ? "?token=" + localStorage.getItem("token")
    : "";
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post("http://localhost:3000/api/userDetail" + token, body, { headers: headers })
      .map((response: Response) => console.log(response.json))
      .catch((error: Response) => Observable.throw(error.json()));
  }

  setRoommateDetail(roommateDetail) {
    const body = JSON.stringify(roommateDetail); 
    const token = localStorage.getItem("token")
    ? "?token=" + localStorage.getItem("token")
    : "";
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post("http://localhost:3000/api/roommateDetail" + token, body, { headers: headers })
      .map((response: Response) => console.log(response.json))
      .catch((error: Response) => Observable.throw(error.json()));
  }



}
