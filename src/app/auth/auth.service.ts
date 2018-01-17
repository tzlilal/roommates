import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from './user.model';


@Injectable()
export class AuthService{
    constructor(private http: Http) {}

    signup(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'}); 
        return this.http.post('http://localhost:3000/api', body, {headers: headers})
            .map((response: Response) => response.json)
            .catch((error: Response) => Observable.throw(error.json()));
    }

    signin(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/api/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    logout(){
        localStorage.clear();
    }
    
    // checking if the user is logged in by checking if the token exist 
    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }

    getProfile(){
        const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
        return this.http.get('http://localhost:3000/api/profile' + token)
        .map((response: Response) => { 
            const result = response.json(); 
            const user = new User(
                result.result.email,
                result.result.password,
                result.result.firstName,
                result.result.lastName);
            return user;
        })
        .catch((error: Response) => Observable.throw(error.json()));
    }
}