import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dialog-ad-popup',
  templateUrl: './dialog-ad-popup.component.html',
  styleUrls: ['./dialog-ad-popup.component.css']
})
export class DialogAdPopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogAdPopupComponent>, @Inject(MAT_DIALOG_DATA) data, public translate: TranslateService, private cookieService: CookieService, private router: Router, private location: Location) { }

  ngOnInit() {
  }

  openNobiArts(){
    window.open("https://nobiarts.com")
  }

  close() {
    this.dialogRef.close();
  }

}
