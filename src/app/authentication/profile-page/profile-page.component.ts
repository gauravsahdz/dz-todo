import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifyUserDeletionComponent } from '../../components/verify-user-deletion/verify-user-deletion.component';
import { environment as config } from '../../../environments/environment';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  userDetails: any = [];
  userId: any;
  usernameForm: any;
  emailForm: any;
  currentUser!: User;
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  selectedFile!: ImageSnippet | string;
  imageFile: File = new File([], '');

  picUrl = config.picUrl;

  hiddenUsername: boolean = true;
  hiddenInputUsername: boolean = false;
  hiddenEmail: boolean = true;
  hiddenInputEmail: boolean = false;
  editBtnUser: boolean = true;
  editBtnEmail: boolean = true;
  saveBtnUser: boolean = false;
  saveBtnEmail: boolean = false;

  galleryForm: any;

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
    this.galleryForm = this.formBuilder.group({
      imageFile: [null, Validators.required],
    });

    this.usernameForm = this.formBuilder.group({
      username: ['', Validators.required],
    });

    this.emailForm = this.formBuilder.group({
      email: ['', Validators.required],
    });

    this.getUserDetails();
  }

  getUserDetails() {
    this.apiService
      .getCurrentUser(this.currentUser['data'].user._id)
      .subscribe({
        next: (res: any) => {
          console.log({ res });
          this.userDetails = res.data.user;
          this.username = this.userDetails.username;
          this.email = this.userDetails.email;
          this.password = this.userDetails.password;
          this.role = this.userDetails.role;
          this.userId = this.userDetails._id;
          this.selectedFile = `${this.picUrl}/${this.userDetails.photo}`;
        },
        error: (err) => {
          if (err.status == 401) {
            this._snackBar.open(
              '✗ User recently changed password! Please log in again.',
              'X',
              {
                duration: 2000,
                panelClass: ['error-snackbar'],
                verticalPosition: 'top',
              }
            );
            this.router.navigate(['/login']);
          }
          this._snackBar.open('✗' + err.error.message, 'X', {
            duration: 2000,
            panelClass: ['error-snackbar'],
            verticalPosition: 'top',
          });
          this.apiService.loader.next(false);
        },
      });
  }

  updateUsername() {
    this.hiddenInputUsername = true;
    this.hiddenUsername = false;
    this.editBtnUser = false;
    this.saveBtnUser = true;
  }

  saveNewUsername() {
    this.authService.updateCurrentUser(this.usernameForm.value).subscribe({
      next: (res) => {
        this.hiddenInputUsername = false;
        this.hiddenUsername = true;
        this.editBtnUser = true;
        this.saveBtnUser = false;
        this.getUserDetails();
        window.location.reload();
        this._snackBar.open('✔ Username updated successfully', 'X', {
          duration: 2000,
          panelClass: ['success-snackbar'],
          verticalPosition: 'top',
        });
        this.apiService.loader.next(false);
      },
      error: (err) => {
        this._snackBar.open('✗' + err.error.message, 'X', {
          duration: 2000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
        });
        this.apiService.loader.next(false);
      },
    });
  }

  updateEmail() {
    this.hiddenInputEmail = true;
    this.hiddenEmail = false;
    this.editBtnEmail = false;
    this.saveBtnEmail = true;
  }

  saveNewEmail() {
    this.authService.updateCurrentUser(this.emailForm.value).subscribe({
      next: (res) => {
        this.hiddenInputEmail = false;
        this.hiddenEmail = true;
        this.editBtnEmail = true;
        this.saveBtnEmail = false;
        this.getUserDetails();
        this._snackBar.open('✔ Username updated successfully', 'X', {
          duration: 2000,
          panelClass: ['success-snackbar'],
          verticalPosition: 'top',
        });
        this.apiService.loader.next(false);
      },
      error: (err) => {
        this._snackBar.open('✗' + err.error.message, 'X', {
          duration: 2000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
        });
        this.apiService.loader.next(false);
      },
    });
  }

  onFormSubmit() {
    this.apiService
      .addGallery(this.galleryForm.get('imageFile').value._files[0])
      .subscribe({
        next: (res: any) => {
          this._snackBar.open('✔ Image updated successfully', 'X', {
            duration: 2000,
            panelClass: ['success-snackbar'],
            verticalPosition: 'top',
          });
          this.apiService.loader.next(false);
          window.location.reload();
        },
        error: (err) => {
          this._snackBar.open('✗ ' + err.error.message, 'X', {
            duration: 2000,
            panelClass: ['error-snackbar'],
            verticalPosition: 'top',
          });
          this.apiService.loader.next(false);
        },
      });
  }

  deleteAccount() {
    this.dialog
      .open(VerifyUserDeletionComponent, {
        width: '481px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res.value === 'deleted') {
          this._snackBar.open('✔ Deleted successfully', 'X', {
            duration: 2000,
            panelClass: ['success-snackbar'],
            verticalPosition: 'top',
          });
          this.authService.logout();
          this.router.navigate(['/']);
          window.location.reload();
          this.apiService.loader.next(false);
        }
      });
  }
}
