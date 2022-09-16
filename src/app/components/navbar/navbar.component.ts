import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  username: any;
  currentUser!: User;
  loggedIn = false;
  userImage: string = '';
  userDetails: any = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private _snackBar: MatSnackBar
  ) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }

  ngOnInit() {
    this.getUserDetails();
    //if user is logged in, then set loggedIn to true
    if (this.currentUser) {
      this.loggedIn = true;
    }
  }

  getUserDetails() {
    this.apiService
      .getCurrentUser(this.currentUser['data'].user._id)
      .subscribe({
        next: (res) => {
          this.userDetails = res.data.user;
          // this.userImage = `http://localhost:5000/img/users/${this.userDetails.photo}`;
          this.userImage = `https://dz-todo.herokuapp.com/img/users/${this.userDetails.photo}`;
          this.username = this.userDetails.username;
          this.apiService.loader.next(false);
        },
        error: (err) => {
          this._snackBar.open('✗'+err.error.message, 'X', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
          this.apiService.loader.next(false);
        }
      });
  }

  //function to logout the user
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.loggedIn = false;
    this.apiService.loader.next(false);
  }
}

