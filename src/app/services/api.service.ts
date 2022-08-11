import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  loader = new BehaviorSubject(false);
  
  getDatas():Observable<any> {
    return this.http.get<any>('https://dz-todo.herokuapp.com/api/v1/todos');
  }

  addDatas(datas: any) {
    return this.http.post<any>('https://dz-todo.herokuapp.com/api/v1/todos', datas);
  }

  updateDatas(data: any, id: any) {
    return this.http.patch<any>(
      `https://dz-todo.herokuapp.com/api/v1/todos/${id}`,
      data
    );
  }

  deleteDatas(id: any) {
    return this.http.delete<any>(`https://dz-todo.herokuapp.com/api/v1/todos/${id}`);
  }
}
