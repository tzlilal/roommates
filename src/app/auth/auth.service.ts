import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from './user.model';


@Injectable()
export class AuthService{
    private users: User[] = [];
    constructor(private http: Http) {}

    signup(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'}); 
        return this.http.post('https://roommates-project-app.herokuapp.com/api', body, {headers: headers})
            .map((response: Response) => response.json)
            .catch((error: Response) => Observable.throw(error.json()));
    }

    signin(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('https://roommates-project-app.herokuapp.com/api/signin', body, {headers: headers})
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
        return this.http.get('https://roommates-project-app.herokuapp.com/api/profile' + token)
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

    getUsers(){
        return this.http.get('https://roommates-project-app.herokuapp.com/api/search')
        .map((response: Response) => {
            const users = response.json().obj;
            let transformedUsers: User[] = [];
            for (let user of users) {
                transformedUsers.push(new User(
                    user.email,
                    user.password,
                    user.firstName,
                    user.lastName)
                );
            }
            this.users = transformedUsers;
            return transformedUsers;
        })
        .catch((error: Response) => Observable.throw(error.json()));
    }
}