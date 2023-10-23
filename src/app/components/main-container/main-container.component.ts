import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post-service.service';
import { Router } from '@angular/router';
import { NotifiationService } from 'src/app/services/notifiation.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
})
export class MainContainerComponent implements OnInit {
  reload: boolean = false;
  users: any[] = [];
  currentUser: any;
  userId: string = '';
  postFormControl = new FormControl();
  exploreUsers: any[] = [];
  exploreTopics: any[] = [];

  sidebarOptions: any[] = [
    {
      name: 'Home',
      icon: 'home',
      route: '/home',
    },
    {
      name: 'Profile',
      icon: 'account_circle',
      route: '/profile',
    },
    {
      name: 'Explore',
      icon: 'explore',
      route: '/explore',
    },
    {
      name: 'Notifications',
      icon: 'notifications',
      route: '/notifications',
    },
    {
      name: 'Messages',
      icon: 'mail',
      route: '/messages',
    },
    {
      name: 'More',
      icon: 'more_horiz',
      route: '/more',
    },
  ];

  constructor(
    private postService: PostService,
    private apiService: ApiService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private noticeService: NotifiationService
  ) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }

  ngOnInit(): void {
    this.usersList();
    this.userId = this.currentUser.data.user.userId;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  /*
  Func: usersList
  params: none
  desc: get all users list to show in follow section
  */
  usersList() {
    this.apiService.getUsers().subscribe({
      next: (data: any) => {
        if (data && data.status === 'success') {
          this.users = data.data.users;
          //exclude current user from list
          this.users = this.users.filter((user) => user.userId !== this.userId);
        }
      },
      error: (error: any) => {
        this._snackBar.open('✗ error loading users', 'X', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
        });
      },
    });
  }

  /*
  Func: follow
  params: id of user to follow
  desc: follow a user
  */
  follow(id: string) {
    this.apiService.followUser(id).subscribe({
      next: (data: any) => {
        if (data && data.status === 'success') {
          this.usersList();
        }
      },
      error: (error: any) => {
        this._snackBar.open('✗ error while following user', 'X', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
        });
      },
    });
  }

  /*
  Func: newNotificationsCount
  params: none
  desc: get new notifications count to show in notification icon
  */
  get newNotificationsCount() {
    return this.noticeService.getNewNotificationsCount();
  }
}
