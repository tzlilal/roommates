import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
    signupForm: FormGroup;

    onSubmit(){
        // after submitting all data the form will reset
        this.signupForm.reset();
    }

    ngOnInit(){
        this.signupForm = new FormGroup({
            firstName: new FormControl(null, Validators.required), 
            lastName: new FormControl(null, Validators.required), 
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}