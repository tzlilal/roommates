import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../auth/user.model';
import { AuthService } from '../../auth/auth.service';
import { SettingsService } from './../settings.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;
  accountForm: FormGroup;
  constructor(private authService: AuthService, private settingsService: SettingsService, private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(
      (user: User) => {
        this.user = user
      }); 

    this.accountForm = new FormGroup({
      firstName: new FormControl(null, Validators.required), 
      lastName: new FormControl(null, Validators.required), 
      email: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required), 
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern("/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im")
      ])
    });
    this.accountForm.controls.email.setValue(this.user.email);
    this.accountForm.controls.firstName.setValue(this.user.firstName);
    this.accountForm.controls.lastName.setValue(this.user.lastName);
    this.accountForm.controls.password.setValue(this.user.password);
  }

  onSubmit() { 
    const user = new User(
      this.accountForm.value.email,
      this.accountForm.value.password,
      this.accountForm.value.firstName,
      this.accountForm.value.lastName, 
      this.accountForm.value.phoneNumber
    );
    console.log(user); 
    this.settingsService.changeDetailAccount(user)
    .subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }

  onDeleteAccount() { }

  onDeactivate() { }

}
