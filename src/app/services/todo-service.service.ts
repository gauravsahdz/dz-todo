import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  private statusTodos = new BehaviorSubject<any>(null);

  constructor() {}

  setStatusTodos(todos: any) {
    this.statusTodos.next(todos); // this will make sure to tell every subscriber about the change.
  }

  // this will be called from other components
  getStatusTodos() {
    return this.statusTodos.asObservable(); 
  }
}
