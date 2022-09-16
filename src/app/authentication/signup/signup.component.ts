import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as EmailValidator from 'email-validator';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: any;
  users: any = [];
  errorUsername: string = '';
  errorEmail: string = '';
  errorPassword: string = '';
  errorPasswordConfirm: string = '';
  show: boolean = false;
  eyeHidden: boolean = true;
  eyeShown: boolean = false;
  signupContainer: boolean = true;
  emailVerification: boolean = false;

  constructor(
    private authService: AuthService,
    public http: HttpClient,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });

    // this.formValidation();
    //if username is less than 5 or more than 15 characters show error
    this.signupForm.get('username').valueChanges.subscribe((value: string) => {
      if (value.length < 5 || value.length > 15) {
        this.errorUsername = 'Username must be between 5 and 15 characters';
      } else {
        this.errorUsername = '';
      }
    });

    //use email-validator package to validate email
    this.signupForm.get('email').valueChanges.subscribe((value: string) => {
      if (!EmailValidator.validate(value)) {
        this.errorEmail = 'Please enter a valid email';
      } else {
        this.errorEmail = '';
      }
    });

    //if password is less than 8 or more than 15 characters show error
    this.signupForm.get('password').valueChanges.subscribe((value: string) => {
      if (value.length < 8 || value.length > 15) {
        this.errorPassword = 'Password must be between 8 and 15 characters';
      } else {
        this.errorPassword = '';
      }
    });

    //if password confirm is not equal to password show error
    this.signupForm
      .get('passwordConfirm')
      .valueChanges.subscribe((value: string) => {
        if (value !== this.signupForm.get('password').value) {
          this.errorPasswordConfirm = 'Passwords do not match';
        } else {
          this.errorPasswordConfirm = '';
        }
      });
  }

  passwordShown() {
    this.show = !this.show;
    this.eyeShown = false;
    this.eyeHidden = true;
  }

  passwordHidden() {
    this.show = !this.show;
    this.eyeShown = true;
    this.eyeHidden = false;
  }

  signup() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: (res) => {
          // this.signupContainer = false;
          // this.emailVerification = true;
          this._snackBar.open('✔ Registration successfull', 'X', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            verticalPosition: 'top',
          });
          this.apiService.loader.next(false);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          if (err.status === 409) {
            this._snackBar.open('✗ Username or email already exists', 'X', {
              duration: 3000,
              panelClass: ['error-snackbar'],
              verticalPosition: 'top',
            });
          } else {
            this._snackBar.open('✗ Something went wrong', 'X', {
              duration: 3000,
              panelClass: ['error-snackbar'],
              verticalPosition: 'top',
            });
          }

          this.apiService.loader.next(false);
        },
      });
    } else {
      this.errorUsername = this.signupForm.get('username').errors.required
        ? 'Username is required'
        : '';
      this.errorEmail = this.signupForm.get('email').errors.required
        ? 'Email is required'
        : '';
      this.errorPassword = this.signupForm.get('password').errors.required
        ? 'Password is required'
        : '';
      this.errorPasswordConfirm = this.signupForm.get('passwordConfirm').errors
        .required
        ? 'Password confirm is required'
        : '';

      this.apiService.loader.next(false);
    }
  }
}
