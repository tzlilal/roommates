import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs";

@Injectable()
export class FormsService {
  ages = []; 
  ages_counter = 18; 

  floor = [];
  floor_counter = 1;

  constructor(private http: Http) {
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

  getRegions() { 
    const url = 'https://data.gov.il/api/action/datastore_search?resource_id=379e2eed-bc1a-444c-a97d-29119d2ea7fc'; 
    return this.http
      .get(url)
      .map((response: Response) => {
         return response.json();
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
