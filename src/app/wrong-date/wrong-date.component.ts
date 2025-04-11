import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-wrong-date',
  templateUrl: './wrong-date.component.html',
  styleUrls: ['./wrong-date.component.css']
})
export class WrongDateComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<WrongDateComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
