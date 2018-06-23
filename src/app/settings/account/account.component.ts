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
  imageUploaded = false;

  constructor(
    public userService: UserService, 
    private settingsService: SettingsService
  ) { }

  ngOnInit() { 
    this.accountForm = new FormGroup({
      firstName: new FormControl("value", [Validators.required, Validators.minLength(2)]), 
      lastName: new FormControl("value", [Validators.required, Validators.minLength(2)]), 
      email: new FormControl('user@example.com', [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(''), 
      phoneNumber: new FormControl('054-7808668', [
        Validators.pattern("/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im")
      ]), 
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType]})
    });

  }

  get firstName() {
    return this.accountForm.get("firstName"); 
  }

  get lastName() {
    return this.accountForm.get("lastName"); 
  }
  
  get email() {
    return this.accountForm.get("email"); 
  }

  get phoneNumber() {
    return this.accountForm.get("phoneNumber"); 
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
    this.imageUploaded = true; 
    const file = (event.target as HTMLInputElement).files[0]; // the file the user selected
    this.accountForm.patchValue({image: file}); // target a single control - the img control and sets its value
    this.accountForm.get('image').updateValueAndValidity(); 

    // reading the image so we can preview it
    const reader = new FileReader(); 
    reader.onload = () => {  // get executed when it's done loading
      this.imagePreview = reader.result; 
    };
    reader.readAsDataURL(file); 
  }

  onDeleteAccount() { }

  onDeactivate() { }

}
