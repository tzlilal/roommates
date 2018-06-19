import { Injectable, EventEmitter } from '@angular/core';

import { Error } from "./error.model";

@Injectable()
export class ErrorService {
  // emits new error whenerver handleError is called (gets called from signup, signin in the auth service)
  errorOccurred = new EventEmitter<Error>();
  
  constructor() { }

  handleError(error: any) {
    const errorData = new Error(error.title, error.error.message);
    this.errorOccurred.emit(errorData);
  }  

}
