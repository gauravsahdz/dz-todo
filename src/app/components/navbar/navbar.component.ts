import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  notLoggedIn: boolean = true;
  loggedIn: boolean = false;
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.checkLogin();
  }

  //function to check if the user is logged in or not
  // checkLogin() {
  //   if (localStorage.getItem('token') == null) {
  //     this.notLoggedIn = true;
  //     this.loggedIn = false;
  //   } else {
  //     this.notLoggedIn = false;
  //     this.loggedIn = true;
  //   }
  // }
 
  

  //function to logout the user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('_id');
    this.notLoggedIn = true;
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

}
