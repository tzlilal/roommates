import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";

@Injectable()

export class AuthGuard implements CanActivate {
    authenticated: boolean; 

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.authenticated = this.authService.isLoggedIn; 
        if(this.authenticated) {
            return true;
        } else {
            this.router.navigate(['/']); 
            return false; 
        }
    }
}