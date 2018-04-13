import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormsService } from '../forms.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user_age = []; 
  constructor(private formsService: FormsService) { 
    this.user_age = formsService.getAges(); 
  }

  ngOnInit() {
  }

}
