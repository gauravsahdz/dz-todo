import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as config } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotifiationService {
  url = `${config.baseUrl}/notifications`;
  constructor(private http: HttpClient) {}

  newNotificationsCount: number = 0;

  incrementNewNotificationsCount(count: number) {
    this.newNotificationsCount = count;
  }

  getNewNotificationsCount() {
    return this.newNotificationsCount;
  }

  getNotifications(userId: string) {
    return this.http.get(`${this.url}/${userId}`);
  }
}
