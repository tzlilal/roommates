import { Injectable } from '@angular/core';

@Injectable()
export class FormsService {
  ages = []; 
  counter = 18; 

  constructor() {
    while(this.counter <= 99) 
    this.ages.push(this.counter++);
  }
  
  getAges() {
    return this.ages; 
  }
}
