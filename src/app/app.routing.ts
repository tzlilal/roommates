import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { LogoutComponent } from './auth/logout.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { AccountComponent } from './settings/account/account.component';
import { UserDetailComponent } from './settings/user-detail/user-detail.component';
import { ApartmentComponent } from './settings/apartment/apartment.component';
import { RoommateDetailComponent } from './settings/roommate-detail/roommate-detail.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ApartmentDetailComponent } from './settings/apartment-detail/apartment-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FavoriteComponent } from './favorite/favorite.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent }, 
    { path: 'signup', component: SignupComponent }, 
    { path: 'signin', component: SigninComponent },
    { path: 'favorites', canActivate: [AuthGuard], component: FavoriteComponent },
    { path: 'logout', component: LogoutComponent }, 
    { path: 'users/:id', canActivate: [AuthGuard], component: UserProfileComponent },
    { path: 'users', canActivate: [AuthGuard], component: SearchComponent },
    // { path: 'search', canActivate: [AuthGuard], component: SearchComponent }, 
    { path: 'settings', canActivate: [AuthGuard], component: SettingsComponent, children: [
        { path: 'account', component: AccountComponent},
        { path: 'info', component: UserDetailComponent},
        { path: 'roommateinfo', component: RoommateDetailComponent},
        { path: 'apartmentinfo', component: ApartmentDetailComponent},
        { path: 'profile', component: ProfileComponent},
        { path: 'apartment', component: ApartmentComponent}
    ]},
    // redirect to home if the page doesnt exist
    { path: '**', component: HomeComponent }  
];

export const routing = RouterModule.forRoot(APP_ROUTES);