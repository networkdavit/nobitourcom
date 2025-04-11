import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-dialog-view-images',
  templateUrl: './dialog-view-images.component.html',
  styleUrls: ['./dialog-view-images.component.css']
})
export class DialogViewImagesComponent implements OnInit {

  currentImg: number;
  title: string;
  images = [];
  breakpoint: number;
  width: number;
  height: number;

  constructor(private dialogRef: MatDialogRef<DialogViewImagesComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.currentImg = data.imagePosition;
    this.title = data.title;
    this.images = data.images;
  }

  ngOnInit() {
    this.dialogRef.updateSize('80%', '90%');
    this.width = window.innerWidth * 0.7;
    this.height = window.innerHeight * 0.8;
    console.log('awdawdawdawda', this.images.length)
  }

  changeImageNext() {
    if (this.currentImg == this.images.length - 1) {
      this.currentImg = 0;
    } else {
      this.currentImg++;
    }
    console.log('Next Image', this.currentImg)
  }

  changeImagePrev() {
    if (this.currentImg == 0) {
      this.currentImg = this.images.length - 1;
    } else {
      this.currentImg--;
    }
    console.log('Previous Image', this.currentImg)
  }

  // onResize(event) {
  //   this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
  // }

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
