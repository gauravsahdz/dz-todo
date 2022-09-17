import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import * as EmailValidator from 'email-validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  username: string = '';
  returnUrl: string = '';
  show: boolean = false;
  eyeHidden: boolean = true;
  eyeShown: boolean = false;
  errorEmail: string = '';
  errorPassword: string = '';

  constructor(
    private authService: AuthService,
    public http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private apiService: ApiService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/todos']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    //use email-validator package to validate email
    this.loginForm.get('email').valueChanges.subscribe((value: string) => {
      if (!EmailValidator.validate(value)) {
        this.errorEmail = 'Please enter a valid email';
      } else {
        this.errorEmail = '';
      }
    });

    //if password is less than 8 or more than 15 characters show error
    this.loginForm.get('password').valueChanges.subscribe((value: string) => {
      if (value.length < 8 || value.length > 15) {
        this.errorPassword = 'Password must be between 8 and 15 characters';
      } else {
        this.errorPassword = '';
      }
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/todos';
  }

  get f() {
    return this.loginForm.controls;
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

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.router.navigate([this.returnUrl]);
          window.location.reload();
          this._snackBar.open('✔ Login successfull, welcome!', 'X', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            verticalPosition: 'top',
          });
        },
        error: (err) => {
          console.log('error from login:', err);
          if (err.status === 401) {
            this._snackBar.open('✗ Invalid email or password', 'X', {
              duration: 3000,
              panelClass: ['error-snackbar'],
              verticalPosition: 'top',
            });
          } else if (err.status === 403) {
            this._snackBar.open('✗ Account is not verified. Please check you mail to verify it.', 'X', {
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
      this.errorEmail = this.loginForm.get('email').errors.required
        ? 'Please enter a valid email'
        : '';
      this.errorPassword = this.loginForm.get('password').errors.required
        ? 'Please enter a valid password'
        : '';

      this.apiService.loader.next(false);
    }
  }
}
