import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { TodoServiceService } from '../../services/todo-service.service';
import { User } from 'src/app/models/user';
import { environment as config } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  username: any;
  userId: any;
  currentUser!: User;
  loggedIn = false;
  userImage: string = '';
  userDetails: any = [];
  picUrl = config.picUrl;
  statusTodos: any = [];

  button1Focused = false;
  button2Focused = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    private todoService: TodoServiceService
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
          this.userImage = `${this.picUrl}/${this.userDetails.photo}`;
          this.username = this.userDetails.username;
          this.userId = this.userDetails.uniqueID;
          this.apiService.loader.next(false);
        },
        error: (err) => {
          this._snackBar.open('✗' + err.error.message, 'X', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
          this.apiService.loader.next(false);
        },
      });
  }

  onButtonClick(buttonNumber: number) {
    if (buttonNumber === 1) {
      this.button1Focused = true;
      this.button2Focused = false;
      this.showActiveTodos('active');
    } else {
      this.button1Focused = false;
      this.button2Focused = true;
      this.showActiveTodos('completed');
    }
  }

  showActiveTodos(todoStatus: any) {
    this.apiService.todosByStatus(this.userId, todoStatus).subscribe({
      next: (res) => {
        this.todoService.setStatusTodos(res.data.todos);
        this.apiService.loader.next(false);
        // console.log('List of datas in navbar: ', res.data.todos);
      },
      error: (err) => {
        this._snackBar.open('✗' + err.error.message, 'X', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
        this.apiService.loader.next(false);
      },
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
