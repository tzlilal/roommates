import { Injectable } from '@angular/core';

@Injectable()
export class FormsService {
  ages = []; 
  ages_counter = 18; 

  floor = [];
  floor_counter = 1;

  constructor() {
    while(this.ages_counter <= 99) 
      this.ages.push(this.ages_counter++);
    this.floor.push("קרקע");
    this.floor.push("מרתף");
    this.floor.push("פרטר");
    while(this.floor_counter <= 50) 
      this.floor.push(this.floor_counter++);
    this.floor.push("מעל 50");
  }
  
  getAges() {
    return this.ages; 
  }

  get floors() {
    return this.floor; 
  }
}
