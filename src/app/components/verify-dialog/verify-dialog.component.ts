import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-verify-dialog',
  templateUrl: './verify-dialog.component.html',
  styleUrls: ['./verify-dialog.component.scss']
})
export class VerifyDialogComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public id: any, public dialogRef: MatDialogRef<VerifyDialogComponent>,private api: ApiService) { }

  ngOnInit(): void {
  }

  public deleteTodo() {
    //this.showLoader = true;
    this.api.deleteDatas(this.id).subscribe({
      next: (res) => {
        let element: any = {}
        element['value'] = 'deleted';
        this.dialogRef.close(element);
      }
    })
  }




}
