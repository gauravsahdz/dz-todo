import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {


  exploreUsers: any[] = [];
  exploreTopics: any[] = [];

  constructor(
    private postService: PostService,
    private apiService: ApiService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.explore();
  }


  explore(){
    this.postService.explorePosts('Elon').subscribe({
      next: (data: any) => {
        this.exploreUsers = data.users;
        this.exploreTopics = data.topics;
        console.log(this.exploreUsers);
      },
      error: (error: any) => {
        this._snackBar.open('✗ error while fetching explore', 'X', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
        });
      },
    });
  }

}
