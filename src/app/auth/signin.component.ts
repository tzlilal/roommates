import { Router } from '@angular/router';
import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit{
    signinForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit(){
        const user = new User(this.signinForm.value.email, this.signinForm.value.password);
        this.authService.signin(user)
            .subscribe(
                // saving the data to the local storage of the browser 
                data => {

                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.authService.getProfile().subscribe(u => {}); 
                    this.router.navigateByUrl('/users'); // was only '/'
                },
                error => console.error(error)
            );

        // after submitting all data the form will reset
        this.signinForm.reset();
    }

    ngOnInit(){
        this.signinForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}