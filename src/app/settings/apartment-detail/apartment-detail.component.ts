import { Component, OnInit } from '@angular/core';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {
  floors_arr = [];
  constructor(private formsService: FormsService) {
    this.floors_arr = this.formsService.floors;
   }
  
  ngOnInit() {
  }

}
