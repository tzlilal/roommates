import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms'; // to delete and from imports

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './auth/logout.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { routing } from './app.routing'
import { AuthService } from './auth/auth.service';
import { SettingsComponent } from './settings/settings.component';
import { SidebarComponent } from './settings/sidebar/sidebar.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { AccountComponent } from './settings/account/account.component';
import { UserDetailComponent } from './settings/user-detail/user-detail.component';
import { ApartmentComponent } from './settings/apartment/apartment.component';
import { RoommateDetailComponent } from './settings/roommate-detail/roommate-detail.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ApartmentDetailComponent } from './settings/apartment-detail/apartment-detail.component';
 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LogoutComponent,
    SignupComponent,
    SigninComponent,
    SettingsComponent,
    SidebarComponent,
    ProfileComponent,
    AccountComponent,
    UserDetailComponent,
    ApartmentComponent,
    RoommateDetailComponent,
    SearchComponent,
    ApartmentDetailComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    routing,
    ReactiveFormsModule,
    HttpModule, 
    FormsModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
