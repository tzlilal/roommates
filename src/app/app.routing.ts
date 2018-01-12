import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { LogoutComponent } from './auth/logout.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent }, 
    { path: 'signup', component: SignupComponent }, 
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent }, 
    // redirect to home if the page doesnt exist
    { path: '**', component: HomeComponent }  
];

export const routing = RouterModule.forRoot(APP_ROUTES);