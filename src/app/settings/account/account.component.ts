import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../user.model';
import { UserService } from '../../user.service';
import { SettingsService } from './../settings.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountForm: FormGroup;
  tempUser = {}; 
  imagePreview: string; 

  constructor(
    public userService: UserService, 
    private settingsService: SettingsService
  ) { }

  ngOnInit() { 
    this.accountForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(2)]), 
      lastName: new FormControl(null, Validators.required), 
      email: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required), 
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern("/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im")
      ]), 
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType]})
    });
  }

  get firstName() {
    return this.accountForm.get("firstName"); 
  }

  change(field, newData) {
    this.tempUser[field] = (newData.target as HTMLInputElement).value; 
  }

  onSubmit() { 
    // if (this.accountForm.invalid)
    //   return; 
    console.log(this.tempUser);
    this.settingsService.changeDetailAccount(this.tempUser, this.accountForm.value.image)
    .subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }

  onImagePicked(event: Event) { 
    const file = (event.target as HTMLInputElement).files[0]; 
    this.accountForm.patchValue({image: file}); 
    this.accountForm.get('image').updateValueAndValidity(); 
    const reader = new FileReader(); 
    reader.onload = () => {
      this.imagePreview = reader.result; 
    };
    reader.readAsDataURL(file); 
  }

  onDeleteAccount() { }

  onDeactivate() { }

}
