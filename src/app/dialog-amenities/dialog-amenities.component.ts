import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-dialog-amenities',
  templateUrl: './dialog-amenities.component.html',
  styleUrls: ['./dialog-amenities.component.css']
})
export class DialogAmenitiesComponent implements OnInit {

  amenities: any;

  constructor(private dialogRef: MatDialogRef<DialogAmenitiesComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.amenities = data.amenities
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
