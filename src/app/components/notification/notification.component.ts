import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotifiationService } from 'src/app/services/notifiation.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  currentUser: any;
  userId: string = '';
  currentUserNotifications: any[] = [];

  constructor(
    private noticeService: NotifiationService,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }

  ngOnInit(): void {
    this.userId = this.currentUser.data.user.userId;
    this.userNotifications();
  }

  userNotifications() {
    this.noticeService.getNotifications(this.userId).subscribe({
      next: (data: any) => {
        if (data && data.status === 'success') {
          this.currentUserNotifications = data.data.notifications;
          this.currentUserNotifications = this.currentUserNotifications.filter(
            (notification) => notification.postOwner === this.userId
          );
          this.noticeService.incrementNewNotificationsCount(
            this.currentUserNotifications.length
          );
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
