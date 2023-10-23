import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import * as EmailValidator from 'email-validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: any;
  username: string = '';
  returnUrl: string = '';
  show: boolean = false;
  eyeHidden: boolean = true;
  eyeShown: boolean = false;
  errorEmail: string = '';
  errorPassword: string = '';
  forgetPasswordPage: boolean = true;
  emailVerification: boolean = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    public http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/todos']);
    }
  }

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
    });

    //use email-validator package to validate email
    this.forgetPasswordForm
      .get('email')
      .valueChanges.subscribe((value: string) => {
        if (!EmailValidator.validate(value)) {
          this.errorEmail = 'Please enter a valid email';
        } else {
          this.errorEmail = '';
        }
      });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/todos';
  }

  get f() {
    return this.forgetPasswordForm.controls;
  }

  verify() {
    if (this.forgetPasswordForm.valid) {
      this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe({
        next: (res: any) => {
          this.forgetPasswordPage = false;
          this.emailVerification = true;
          // this.router.navigate(['/resetPassword']);
          this._snackBar.open('✔ Verification mail sent.', 'X', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
          this.apiService.loader.next(false);
        },
        error: (err: any) => {
          if (err.status === 404) {
            this._snackBar.open('✗ Email not found.', 'X', {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            });
          } else if (err.status === 500) {
            this._snackBar.open(
              '✗ There was an error sending the email. Try again later!',
              'X',
              {
                duration: 2000,
                verticalPosition: 'top',
                panelClass: ['error-snackbar'],
              }
            );
          } else {
            this._snackBar.open('✗ Something went wrong.', 'X', {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            });
          }

          this.apiService.loader.next(false);
        },
      });
    } else {
      this.errorEmail = this.forgetPasswordForm.get('email').errors.required
        ? 'Please enter a valid email'
        : '';
      this.apiService.loader.next(false);
    }
  }
}
