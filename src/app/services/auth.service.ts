import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  loader = new BehaviorSubject(false);

  signup(userDetails: any) {
    return this.http.post<any>(
      'http://localhost:5000/api/v1/users/signup',
      userDetails
    );
  }

  login(userDetails: any) {
    return this.http
      .post<any>('http://localhost:5000/api/v1/users/login', userDetails)
  }

}
