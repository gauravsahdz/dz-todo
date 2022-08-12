import { Component, isDevMode, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { VerifyDialogComponent } from '../verify-dialog/verify-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  todos: any = [];
  actionBtnText: string = 'Add';
  formData: any;
  updateTodosId: any;
  actionTitle: string = 'Create';
  errorTitle: string = '';
  errorDesc: string = '';

  constructor(private api: ApiService,public http: HttpClient, private formBuilder: FormBuilder, private _snackBar: MatSnackBar,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.todosForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.getTodos();
  }


  resetForm() {
    this.todosForm.reset();
    this.actionBtnText = 'Add';
    this.actionTitle = 'Create';
  }

  getTodos() {
    this.api.getDatas().subscribe({
      next: (res) => {
        this.todos = res.data.todos;
        // console.log('listing of datas: ', this.todos);
      },
    });
  }

  addTodos() {
    //if the form is not getting edited then add the todo else update the todo
    if (this.actionBtnText === 'Add') {
      if (this.todosForm.valid) {
        this.api.addDatas(this.todosForm.value).subscribe({
          next: (res) => {
              this._snackBar.open('Added successfully','' ,{
                duration: 2000,
              });
            console.log('Added Successfully.');
            this.getTodos();
            this.todosForm.reset();
          },
          error: (err) => {
            console.log('error while adding!');
          },
        });
      }
      else{
        console.log('Please fill all the fields!');
      }
    }
    else {
      this.updateTodos();
    }
  }

  editTodo(items: any) {
    //fetch the saved title and description and set it to the form
    this.todosForm.patchValue({
      title: items.title,
      description: items.description,
    });
    this.actionBtnText = 'Update';
    this.actionTitle = 'Edit';
    this.updateTodosId = items._id;
  }

  updateTodos() {
    //fetch the id of the selected todo and pass it to the api service
    this.api.updateDatas(this.todosForm.value, this.updateTodosId).subscribe({
      next: (res) => {
        this._snackBar.open('Updated successfully','' ,{
          duration: 2000,
        });
        console.log('Updated Successfully.');
        this.getTodos();
        this.todosForm.reset();
        this.actionBtnText = 'Add';
        this.actionTitle = 'Create';
      },
    });
  }

  deleteTodos(id: any) {
    this.dialog
      .open(VerifyDialogComponent, {
        width: '481px',
        data: id,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res.value === 'deleted') {
          this.getTodos();
          this._snackBar.open('Deleted successfully','' ,{
            duration: 2000,
          });
        }
      });
  }

  todosForm!: FormGroup;
}
