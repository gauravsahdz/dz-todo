import { Component, isDevMode, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.scss'],
})
export class AddTodoDialogComponent implements OnInit {
  todosForm: any;
  todos: any = [];
  actionBtnText: string = 'Add';
  formData: any;
  updateTodosId: any;
  actionTitle: string = 'Create';
  errorTitle: string = '';
  errorDesc: string = '';
  scrollIcon: boolean = true;

  constructor(
    private apiService: ApiService,
    public http: HttpClient,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddTodoDialogComponent>
  ) {}

  ngOnInit(): void {
    this.todosForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    //if title is less than 5 or more than 15 characters show error
    this.todosForm.get('title').valueChanges.subscribe((value: string) => {
      if (value.length < 5 || value.length > 15) {
        this.errorTitle = 'Title must be between 5 and 15 characters';
      } else {
        this.errorTitle = '';
      }
    });

    //if description is less than 10 or more than 100 characters show error
    this.todosForm
      .get('description')
      .valueChanges.subscribe((value: string) => {
        if (value.length < 10 || value.length > 100) {
          this.errorDesc = 'Description must be between 10 and 100 characters';
        } else {
          this.errorDesc = '';
        }
      });
  }

  resetForm() {
    this.todosForm.reset();
    this.actionBtnText = 'Add';
    this.actionTitle = 'Create';
  }

  addTodos() {
    if (this.todosForm.valid) {
      this.apiService.addDatas(this.todosForm.value).subscribe({
        next: (res) => {
          let element: any = {};
          element['value'] = 'added';
          this.dialogRef.close(element);
          this.apiService.loader.next(false);
          this.todosForm.reset();
        },
        error: (err) => {
          this._snackBar.open('✗ '+err.error.message, 'X', {
            duration: 2000,
            panelClass: ['error-snackbar'],
            verticalPosition: 'top',
          });
          this.apiService.loader.next(false);
        },
      });
    } else {
      console.log('Please fill all the fields!');
      this.apiService.loader.next(false);
    }
  }
}
