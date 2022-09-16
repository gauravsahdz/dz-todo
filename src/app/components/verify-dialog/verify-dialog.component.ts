import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-verify-dialog',
  templateUrl: './verify-dialog.component.html',
  styleUrls: ['./verify-dialog.component.scss'],
})
export class VerifyDialogComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public id: any,
    public dialogRef: MatDialogRef<VerifyDialogComponent>,
    private api: ApiService,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}

  public deleteTodo() {
    this.api.deleteDatas(this.id).subscribe({
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
