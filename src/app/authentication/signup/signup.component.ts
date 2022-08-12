import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: any;
  users: any = [];
  errorUsername: string = '';

  constructor(private api: AuthService,
    public http: HttpClient,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  signup() {
    if (this.signupForm.valid) {
      this.api.signup(this.signupForm.value).subscribe({
        next: (res) => {
            this._snackBar.open('Registration successfull, please login to continue!','' ,{
              duration: 3000,
            });
            this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('error while adding!');
        },
      });
    }
    else{
      console.log('Please fill all the fields!');
    }
  }
}
