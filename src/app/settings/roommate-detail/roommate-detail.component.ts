import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FormsService } from '../forms.service';

import { RoommateDetail } from './roommate-detail.model';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-roommate-detail',
  templateUrl: './roommate-detail.component.html',
  styleUrls: ['./roommate-detail.component.css']
})
export class RoommateDetailComponent implements OnInit {
  roommateDetailForm: FormGroup;
  rommate_age = []; 
  roommateDetail = new RoommateDetail(); 

  constructor(private formsService: FormsService, private settingsService: SettingsService) { 
    this.rommate_age = formsService.getAges(); 
  }

  ngOnInit() {
    this.roommateDetailForm = new FormGroup({
      minAge: new FormControl(""), 
      maxAge: new FormControl(""),
      female: new FormControl(""),
      male: new FormControl(""), 
      religion: new FormControl(""), 
      kosher: new FormControl(""), 
      kitchen: new FormControl(""),
      diet: new FormControl(""),
      smoking: new FormControl(""),
      animals: new FormControl(""), 
      cleaning: new FormControl("")
    }); 
  }

  onSubmit() {
    this.roommateDetail.minAge = this.roommateDetailForm.value.minAge; 
    this.roommateDetail.maxAge = this.roommateDetailForm.value.maxAge; 
    this.roommateDetail.female = this.roommateDetailForm.value.female; 
    this.roommateDetail.male = this.roommateDetailForm.value.male;  
    this.roommateDetail.religion = this.roommateDetailForm.value.religion; 
    this.roommateDetail.kosher = this.roommateDetailForm.value.kosher; 
    this.roommateDetail.kitchen = this.roommateDetailForm.value.kitchen; 
    this.roommateDetail.diet = this.roommateDetailForm.value.diet; 
    this.roommateDetail.smoking = this.roommateDetailForm.value.smoking; 
    this.roommateDetail.animals = this.roommateDetailForm.value.animals; 
    this.roommateDetail.cleaning = this.roommateDetailForm.value.cleaning; 
    this.settingsService.setRoommateDetail(this.roommateDetail)
    .subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }

}
