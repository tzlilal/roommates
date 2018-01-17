import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
import { UserService } from './user.service';
import { ProfileComponent } from './settings/profile/profile.component';
 

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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    routing,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
