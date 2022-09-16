import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-current-user-password',
  templateUrl: './update-current-user-password.component.html',
  styleUrls: ['./update-current-user-password.component.scss'],
})
export class UpdateCurrentUserPasswordComponent implements OnInit {
  updateCurrentUserPasswordForm: any;
  errorCurrentPassword: string = '';
  errorPassword: string = '';
  errorPasswordConfirm: string = '';
  show: boolean = false;
  eyeHidden: boolean = true;
  eyeShown: boolean = false;
  returnUrl: string = '';

  constructor(
    public http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.updateCurrentUserPasswordForm = this.formBuilder.group({
      passwordCurrent: ['', [Validators.required]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });

    //if password is less than 8 or more than 15 characters show error
    this.updateCurrentUserPasswordForm
      .get('passwordCurrent')
      .valueChanges.subscribe((value: string) => {
        if (value.length < 8 || value.length > 15) {
          this.errorCurrentPassword =
            'Password must be between 8 and 15 characters';
        } else {
          this.errorCurrentPassword = '';
        }
      });

    //if password is less than 8 or more than 15 characters show error
    this.updateCurrentUserPasswordForm
      .get('password')
      .valueChanges.subscribe((value: string) => {
        if (value.length < 8 || value.length > 15) {
          this.errorPassword = 'Password must be between 8 and 15 characters';
        } else {
          this.errorPassword = '';
        }
      });

    //if password confirm is not equal to password show error
    this.updateCurrentUserPasswordForm
      .get('passwordConfirm')
      .valueChanges.subscribe((value: string) => {
        if (
          value !== this.updateCurrentUserPasswordForm.get('password').value
        ) {
          this.errorPasswordConfirm = 'Passwords do not match';
        } else {
          this.errorPasswordConfirm = '';
        }
      });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/todos';
  }

  get f() {
    return this.updateCurrentUserPasswordForm.controls;
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

  updateCurrentUserPassword() {
    this.authService
      .updateCurrentUserPassword(this.updateCurrentUserPasswordForm.value)
      .subscribe({
        next: (data) => {
          this._snackBar.open('✔ Password updated successfully', 'X', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
          this.authService.logout();
          this.router.navigate(['/']);
          this.apiService.loader.next(false);
        },
        error: (error) => {
          if(error.status === 401) {
            this._snackBar.open('✗ Current password is incorrect', 'X', {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            });
          } else {
            this._snackBar.open('✗ Something went wrong', 'X', {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            });
          }
          this.apiService.loader.next(false);
        },
      });
  }
}
