import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
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
  searchedProfile: any = [
    {
      image: 'assets/images/user.png',
      username: 'John Doe',
    },
    {
      image: 'assets/images/user.png',
      username: 'John Doe',
    },
    {
      image: 'assets/images/user.png',
      username: 'John Doe',
    }
  ];

  searchInput: string = ''; // Input from the search bar
  filteredItems: any[] = []; // Filtered items based on search

  filterItems() {
    if (this.searchInput) {
      this.filteredItems = this.searchedProfile.filter((item: any) =>
        item.username.includes(this.searchInput)
      );
    } else {
      this.filteredItems = []; // Clear the filtered items when search input is empty
    }
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
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
        next: (res: any) => {
          this.userDetails = res.data.user;
          this.userImage = `${this.picUrl}/${this.userDetails.photo}`;
          this.username = this.userDetails.username;
          this.userId = this.userDetails.uniqueID;
          this.apiService.loader.next(false);
        },
        error: (err: any) => {
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
