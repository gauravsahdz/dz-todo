import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-mark-as-completed-todo-dialog',
  templateUrl: './mark-as-completed-todo-dialog.component.html',
  styleUrls: ['./mark-as-completed-todo-dialog.component.scss']
})
export class MarkAsCompletedTodoDialogComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public id: any,
    public dialogRef: MatDialogRef<MarkAsCompletedTodoDialogComponent>,
    private api: ApiService,
    private authService: AuthService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  public markAsCompletedTodo() {
    this.apiService.markAsCompleted(this.id).subscribe({
        next: (res) => {
        let element: any = {};
        element['value'] = 'completed';
        this.dialogRef.close(element);
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

}
