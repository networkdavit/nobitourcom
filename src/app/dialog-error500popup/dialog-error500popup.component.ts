import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-error500popup',
  templateUrl: './dialog-error500popup.component.html',
  styleUrls: ['./dialog-error500popup.component.css']
})
export class DialogError500popupComponent implements OnInit {

  website_language: string;
  adventure_type: string;
  full_url_for_filtering: any;
  error_500_message: string;
  popular_cities: string[] = ['geneva', 'berlin', 'bangkok', 'dubai', 'paris'];

  constructor(private dialogRef: MatDialogRef<DialogError500popupComponent>, @Inject(MAT_DIALOG_DATA) data, public translate: TranslateService,  private router: Router, private location: Location) {
    this.full_url_for_filtering = this.location.path();
    let splitUrl = this.full_url_for_filtering.split('/');
    this.website_language = splitUrl[1];
    this.adventure_type = splitUrl[3];
  }

  ngOnInit() {
  }

  // async reload(url: string): Promise<boolean> {
  //   await this.router.navigateByUrl('/', { skipLocationChange: true });
  //   return this.router.navigateByUrl(url);
  // }

  close() {
    this.dialogRef.close();
  }
}
