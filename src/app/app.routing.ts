import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { SignupComponent } from './auth/signup.component'
import { SigninComponent } from './auth/signin.component'

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent }, 
    { path: 'signup', component: SignupComponent }, 
    { path: 'signin', component: SigninComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);