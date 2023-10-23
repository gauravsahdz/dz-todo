import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post-service.service';
import { VerifyModal } from 'src/app/utils/modal/verify-modal';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  posts: any[] = [];
  currentUser: any;
  userId: string = '';
  @Input() reload: boolean = false;
  @Input() mine: boolean = false;

  constructor(
    private postService: PostService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }

  ngOnInit(): void {
    this.getAllPosts();
    this.userId = this.currentUser.data.user.userId;
  }

  ngOnChanges() {
    if (this.reload) {
      this.getAllPosts();
    }
  }

  getAllPosts() {
    this.postService.getPosts().subscribe((data: any) => {
      if (data.data && data.data.posts) {
        this.posts = data.data.posts;
        if (this.mine) {
          this.posts = this.posts.filter((post) => post.userId === this.userId);
        }
      }
    });
  }

  editPost(post: any) {
    // Add code to handle the edit action for the selected post
    console.log('Edit post:', post);
  }

  deletePost(post: any) {
    this.dialog
      .open(VerifyModal, {
        data: {
          id: post._id,
          action: 'Are you sure you want to delete this post?',
          actionBtn: 'Delete',
        },
      })
      .afterClosed()
      .subscribe((data: any) => {
        if (data === 'success') {
          this.getAllPosts();
        }
      });
  }

  likePost(post: any) {
    this.postService.likePost(post._id).subscribe((data: any) => {
      if (data.data && data.data.post) {
        this.getAllPosts();
      }
    });
  }

  retweetPost(post: any) {
    this.postService.tweetPost(post._id).subscribe((data: any) => {
      if (data.data && data.data.post) {
        this.getAllPosts();
      }
    });
  }
}
