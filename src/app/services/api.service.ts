import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment as config } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = config.baseUrl;
  constructor(private http: HttpClient) {}
  loader = new BehaviorSubject(false);

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.url}/users`);
  }

  getCurrentUser(id: any): Observable<any> {
    return this.http.get<any>(`${this.url}/users/me`);
  }

  followUser(id: any): Observable<any> {
    return this.http.patch<any>(`${this.url}/users/follow/${id}`, {});
  }

  addGallery(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header,
    };

    const req = new HttpRequest(
      'PATCH',
      `${this.url}/users/updateMe`,
      formData,
      options
    );
    return this.http.request(req);
  }

}
