import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roommate-detail',
  templateUrl: './roommate-detail.component.html',
  styleUrls: ['./roommate-detail.component.css']
})
export class RoommateDetailComponent implements OnInit {
  chosenOption: string = "sdfdsf"; 
  animals = ['חתול', 'כלב'];  
  constructor() { }

  ngOnInit() {
  }

  print() {
    console.log("My input: ", this.chosenOption);
  }

}
