import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterUserService } from './register.service';
import { Router } from '@angular/router';
import { RegisterUser } from './register-user';
import { ApiError } from 'src/app/core/model/api-error';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerUserForm = this.fb.nonNullable.group({
        username: new FormControl('',[Validators.required, Validators.minLength(10),Validators.maxLength(50)]),
        email: new FormControl('',[Validators.required, Validators.minLength(10),Validators.maxLength(50)]),
        password: new FormControl('',[Validators.required, Validators.minLength(10),Validators.maxLength(50)])
    });
    errorMessage: string = '';

    constructor(private router: Router, 
        private registerService: RegisterUserService, 
        private fb: FormBuilder) { }

    register() {
        this.registerService
            .registerUser(this.registerUserForm.value as RegisterUser)
            .subscribe({
                next: (response) => {
                    console.log('User registered successfully', response);
                    this.router.navigate(['/login']);
                },
                error: (error: HttpErrorResponse) => {
                    if (typeof error.error === 'object') {
                        var apiError = error.error as ApiError;
                        this.errorMessage = apiError.apiErrorStatus.message;
                    } else {
                        this.errorMessage = 'An unknown error occurred. Please try again later.';
                    }
                }
            });
    }
}
