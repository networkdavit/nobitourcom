import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-languages',
  templateUrl: './dialog-languages.component.html',
  styleUrls: ['./dialog-languages.component.css']
})

export class DialogLanguagesComponent implements OnInit {

  currentLang = {
    lang: '',
    title: ''
  };

  enBtnClass: string;
  bgBtnClass: string;
  elBtnClass: string;
  hyBtnClass: string;
  ruBtnClass: string;
  website_language: string;
  full_url_for_filtering: any;
  splitUrl: string;
  homeUrl: string;
  langLocal: string;

  constructor(private dialogRef: MatDialogRef<DialogLanguagesComponent>, @Inject(MAT_DIALOG_DATA) data, public translate: TranslateService, private cookieService: CookieService, private router: Router, private location: Location) {
    this.full_url_for_filtering = this.location.path();
    this.splitUrl = this.full_url_for_filtering.split('/');
    this.website_language = this.splitUrl[1];
    this.homeUrl = this.splitUrl[2];
    this.currentLang.lang = this.website_language;
    this.currentLang.title = data.currentTitle;
  }

  ngOnInit() {
    this.currentLang.lang = localStorage.getItem('lang');
    this.changeBtnClass();
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }

  changeLanguage(lang: string, title: string) {
    this.currentLang.title = title;
    this.currentLang.lang = lang;
    this.website_language = localStorage.getItem('lang');


    // below if statement checks if the current url is intro
    // and sets url to English if it is changed to English
    // since base url is /en and it doesn't allow to change to back to /en
    if(this.website_language === 'en' && this.homeUrl == 'home' && !this.splitUrl[3]){
      this.router.navigate(['en/home'])
    }

    //this.cookieService.set('currentLang', this.currentLang.lang);
    this.translate.setDefaultLang(this.currentLang.lang);
    setTimeout(() => {this.reload(this.router.url.replace(/^.{3}/g, localStorage.getItem('lang')))}, 100);

    this.dialogRef.close();
    this.changeBtnClass();
  }

  changeBtnClass() {
    // if(this.location.path() == ''){
    //   console.log(localStorage.getItem('lang'))
    // }
    this.langLocal = localStorage.getItem('lang');
    if(this.langLocal == null){
      this.langLocal = 'ru';
      this.currentLang.lang = this.langLocal;
    }

    if (this.currentLang.lang == 'en') {
      this.enBtnClass = 'mat-stroked-button';
      this.bgBtnClass = 'mat-button';
      this.elBtnClass = 'mat-button';
      this.hyBtnClass = 'mat-button';
      this.ruBtnClass = 'mat-button';
    } else if (this.currentLang.lang == 'bg') {
      this.enBtnClass = 'mat-button';
      this.bgBtnClass = 'mat-stroked-button';
      this.elBtnClass = 'mat-button';
      this.hyBtnClass = 'mat-button';
      this.ruBtnClass = 'mat-button';
    } else if (this.currentLang.lang == 'el') {
      this.enBtnClass = 'mat-button';
      this.bgBtnClass = 'mat-button';
      this.elBtnClass = 'mat-stroked-button';
      this.hyBtnClass = 'mat-button';
      this.ruBtnClass = 'mat-button';
    } else if (this.currentLang.lang == 'hy') {
      this.enBtnClass = 'mat-button';
      this.bgBtnClass = 'mat-button';
      this.elBtnClass = 'mat-button';
      this.hyBtnClass = 'mat-stroked-button';
      this.ruBtnClass = 'mat-button';
    } else if (this.currentLang.lang == 'ru') {
      this.enBtnClass = 'mat-button';
      this.bgBtnClass = 'mat-button';
      this.elBtnClass = 'mat-button';
      this.hyBtnClass = 'mat-button';
      this.ruBtnClass = 'mat-stroked-button';
    }
    localStorage.setItem('lang', this.currentLang.lang)
  }

  close() {
    this.dialogRef.close();
  }
}
