import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment as config } from '../../../../environments/environment';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  currentUser!: User;
  username: any;
  email: any;
  bio: any;
  mine: boolean = true;
  constructor(
    private apiService: ApiService,
    public http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }

  ngOnInit(): void {
    this.username = this.currentUser['data'].user.username;
    this.email = this.currentUser['data'].user.email;
    this.bio = this.currentUser['data'].user.bio;

  }
}
