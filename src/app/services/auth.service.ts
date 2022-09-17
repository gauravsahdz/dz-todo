import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { environment as config } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = config.baseUrl;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  loader = new BehaviorSubject(true);

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  signup(userDetails: any) {
    return this.http.post<any>(`${this.url}/users/signup`, userDetails);
  }


  login(userDetails: any) {
    return this.http.post<any>(`${this.url}/users/login`, userDetails).pipe(
      map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');

    // get the user nulled - typescript won't care
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  forgetPassword(email: any) {
    return this.http.post<any>(`${this.url}/users/forgotPassword`, email);
  }

  ValidPasswordToken(body: any): Observable<any> {
    return this.http.post(`${this.url}/users/valid-password-token`, body);
  }

  resetPassword(token: any, data: any) {
    return this.http.patch<any>(
      `${this.url}/users/resetPassword/${token}`,
      data
    );
  }

  updateCurrentUserPassword(data: any) {
    // console.log("data",data);
    return this.http.patch<any>(`${this.url}/users/updateMyPassword/`, data);
  }

  updateCurrentUser(data: any) {
    // console.log('data', data);
    return this.http.patch<any>(`${this.url}/users/updateMe/`, data);
  }

  deleteCurrentUser() {
    return this.http.delete<any>(`${this.url}/users/deleteMe/`);
  }
}
