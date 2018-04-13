import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-roommate-detail',
  templateUrl: './roommate-detail.component.html',
  styleUrls: ['./roommate-detail.component.css']
})
export class RoommateDetailComponent implements OnInit {
  rommate_age = []; 
  constructor(private formsService: FormsService) { 
    this.rommate_age = formsService.getAges(); 
  }

  ngOnInit() {
  }


}
