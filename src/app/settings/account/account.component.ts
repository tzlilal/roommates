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
  accountForm: FormGroup;
  tempUser = {}; 
  constructor(public authService: AuthService, private settingsService: SettingsService) { }

  ngOnInit() { 
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
  }

  change(field, newData: Event) {
    this.tempUser[field] = newData.target.value; 
  }

  onSubmit() { 
    this.settingsService.changeDetailAccount(this.tempUser)
    .subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }

  onDeleteAccount() { }

  onDeactivate() { }

}
