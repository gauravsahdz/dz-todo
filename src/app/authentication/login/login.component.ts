import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  username: string = '';
  Token: any;
  Auth: any;
  constructor(
    private api: AuthService,
    public http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  login() {
    if (this.loginForm.valid) {
      this.api.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.username = res.data.user.username;
          this.Token = res.token;
          this.router.navigate(['/todos'], {
            queryParams: {
              username: this.username,
              token: this.Token,
              }
              });
        }
      });
    }
    else{
      console.log('Please fill all the fields!');
    }
  }
}
