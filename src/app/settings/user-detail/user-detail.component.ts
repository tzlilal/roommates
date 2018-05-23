import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { FormsService } from '../forms.service';
import { UserDetail } from './user-detail.model';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userDetailForm: FormGroup;
  user_age = []; 
  userDetail= new UserDetail(); 

  constructor(private formsService: FormsService, private settingsService: SettingsService) { 
    this.user_age = formsService.getAges(); 
  }
  // ADD VALIDATION 
  ngOnInit() {
    this.userDetailForm = new FormGroup({
      sex: new FormControl(""), 
      age: new FormControl(""),
      martialStatus: new FormControl(""),
      hasChildren: new FormControl(""), 
      occupation: new FormControl(""), 
      sexualOrient: new FormControl(""), 
      religion: new FormControl(""),
      kosher: new FormControl(""),
      kitchen: new FormControl(""),
      diet: new FormControl(""), 
      smoking: new FormControl(""), 
      animals: new FormArray([
        new FormControl("כלב"),
        new FormControl("חתול"), 
        new FormControl("אחר")
      ]), 
      cleaning: new FormControl(""),
      additionalInfo: new FormControl(""),
    }); 
  }

  get animals() {
    return (this.userDetailForm.get('animals') as FormArray); 
  }

  change(name) {
    this.userDetail.animals[name] = !this.userDetail.animals[name]; 
  }

  onSubmit() {
    this.userDetail.sex = this.userDetailForm.value.sex; 
    this.userDetail.age = this.userDetailForm.value.age; 
    this.userDetail.martialStatus = this.userDetailForm.value.martialStatus; 
    this.userDetail.hasChildren = this.userDetailForm.value.hasChildren; 
    this.userDetail.occupation = this.userDetailForm.value.occupation; 
    this.userDetail.sexualOrient = this.userDetailForm.value.sexualOrient; 
    this.userDetail.religion = this.userDetailForm.value.religion; 
    this.userDetail.kosher = this.userDetailForm.value.kosher; 
    this.userDetail.kitchen = this.userDetailForm.value.kitchen; 
    this.userDetail.diet = this.userDetailForm.value.diet; 
    this.userDetail.smoking = this.userDetailForm.value.smoking; 
    this.userDetail.cleaning = this.userDetailForm.value.cleaning; 
    this.userDetail.additionalInfo = this.userDetailForm.value.additionalInfo; 
    this.settingsService.setUserDetail(this.userDetail)
    .subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }

}
