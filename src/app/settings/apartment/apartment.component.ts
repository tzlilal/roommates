import { Component, OnInit } from '@angular/core';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit {
  floors_arr = [];
  constructor(private formsService: FormsService) {
    this.floors_arr = this.formsService.floors; 
   }

  ngOnInit() {
  }

}
