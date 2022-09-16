import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-verify-user-deletion',
  templateUrl: './verify-user-deletion.component.html',
  styleUrls: ['./verify-user-deletion.component.scss'],
})
export class VerifyUserDeletionComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public id: any,
    public dialogRef: MatDialogRef<VerifyUserDeletionComponent>,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  public deleteUser() {
    this.authService.deleteCurrentUser().subscribe({
      next: (res) => {
        let element: any = {};
        element['value'] = 'deleted';
        this.dialogRef.close(element);
      },
      error: (err) => {
        this._snackBar.open('✗ '+err.error.message, 'X', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
        this.apiService.loader.next(false);
      },
    });
  }
}
