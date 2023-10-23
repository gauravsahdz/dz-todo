import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-verify-modal',
  templateUrl: './verify-modal.html',
  styleUrls: ['./verify-modal.scss'],
})
export class VerifyModal implements OnInit {
  action: string = '';
  actionBtn: string = '';

  constructor(
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VerifyModal>,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.action = this.data.action;
    this.actionBtn = this.data.actionBtn;
  }

  public actionFunc() {
    if (this.data.actionBtn === 'Delete') {
      this.postService.deletePost(this.data.id).subscribe((data: any) => {
        if (data && data.status === 'success') {
          this.dialogRef.close(data.status);
          this._snackBar.open('✓' + data.message, 'X', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });

        }
      });
    }
  }
}
