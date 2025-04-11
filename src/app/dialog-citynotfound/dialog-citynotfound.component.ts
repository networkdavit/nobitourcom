import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dialog-citynotfound',
  templateUrl: './dialog-citynotfound.component.html',
  styleUrls: ['./dialog-citynotfound.component.css']
})

export class DialogCitynotfoundComponent implements OnInit {

  website_language: string;
  product_type: string;
  full_url_for_filtering: any;
  city_not_found_message: string;
  popular_cities: string[] = ['london', 'berlin', 'bangkok', 'dubai', 'paris'];
  popular_cities_iso: string[] = ['gb', 'de', 'th', 'ae', 'fr'];
  isEstate: boolean = false;
  isAdventure: boolean = false;

  constructor(private dialogRef: MatDialogRef<DialogCitynotfoundComponent>, @Inject(MAT_DIALOG_DATA) data, public translate: TranslateService, private cookieService: CookieService, private router: Router, private location: Location) {
    this.full_url_for_filtering = this.location.path();
    let splitUrl = this.full_url_for_filtering.split('/');
    this.website_language = splitUrl[1];
    this.product_type = splitUrl[3];
    if(this.product_type == 'estate'){
      this.isEstate = true;
    } else if(this.product_type == 'adventure'){
      this.isAdventure = true;
    }
  }

  ngOnInit() {
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }

  showMessage() {
    this.website_language = localStorage.getItem('lang');
    this.dialogRef.close();
  }

  redirectToPopularCity(i, iso){
    this.router.navigate([`${this.website_language}/home/${this.product_type}/${this.popular_cities[i]}/${iso}/1`])
    .then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  
  }

  close() {
    this.dialogRef.close();
  }

  openWhitelabel(link){
    this.router.navigate([this.website_language + '/home/' + link]);
    this.dialogRef.close();
  }
}
