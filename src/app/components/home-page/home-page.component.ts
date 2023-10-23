import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post-service.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  reload: boolean = false;
  users: any[] = [];
  currentUser: any;
  userId: string = '';
  postFormControl = new FormControl();

  constructor(
    private postService: PostService,
    private apiService: ApiService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }

  ngOnInit(): void {
    this.userId = this.currentUser.data.user.userId;
  }

  onPostChange() {
    console.log(this.postFormControl.value);
  }

  /*
  Func: tweet
  params: none
  desc: post a tweet
  */
  tweet() {
    this.postService.addPost({ post: this.postFormControl.value }).subscribe({
      next: (data: any) => {
        if (data && data.status === 'success') {
          this.reload = true;
          this.postFormControl.reset();
        }
      },
      error: (error: any) => {
        this._snackBar.open('✗ error posting tweet', 'X', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
        });
      },
    });
  }
}
