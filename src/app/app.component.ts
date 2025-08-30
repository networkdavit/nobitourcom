import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { HostListener } from '@angular/core';
import { ConnectionService } from './services/connection.service';
import { DialogAdPopupComponent } from './dialog-ad-popup/dialog-ad-popup.component';
import * as moment from 'moment';

declare const gtag: Function;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentLang = {
    lang: '',
    title: ''
  };
  cookieValue: string;
  website_language: string;
  full_url_for_filtering: string;
  langLocal: string;
  ipAddress: any;
  ip_country_name: any;
  token = ''


  constructor(private connection: ConnectionService, @Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute, private meta: Meta, public router: Router, public translate: TranslateService, private dialog: MatDialog, private cookieService: CookieService, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (isPlatformBrowser(this.platformId)) {
          gtag('config', 'G-Q52GVGJGP8', { 'page_path': event.urlAfterRedirects });
        }
      }
    })
    translate.addLangs(['en', 'bg', 'el', 'hy', 'ru']);
    translate.setDefaultLang('en');
    this.full_url_for_filtering = this.location.path();
    // this.website_language = 'ru'
    // localStorage.setItem('currency', 'rub');
    // localStorage.setItem('lang', 'ru')
    let langLocal = localStorage.getItem('lang');
    if (this.location.path() == '' && langLocal == null) {

      this.connection.getIPv4Address().subscribe(response => {
        this.ipAddress = response;
        this.ip_country_name = this.ipAddress.country_name;

        // if (this.ip_country_name == "Armenia") {
        //   this.website_language = 'hy'
        //   localStorage.setItem('lang', 'hy')
        //   this.changeLanguage(this.website_language)

        // }
        // else if (this.ip_country_name == "Russia") {
        //   this.website_language = 'ru'
        //   localStorage.setItem('lang', 'ru')
        //   this.changeLanguage(this.website_language)

        // }
        // else if (this.ip_country_name == "Bulgaria") {
        //   this.website_language = 'bg'
        //   localStorage.setItem('lang', 'bg')
        //   this.changeLanguage(this.website_language)

        // }
        // else if (this.ip_country_name == "Greece") {
        //   this.website_language = 'el'
        //   localStorage.setItem('lang', 'el')
        //   this.changeLanguage(this.website_language)

        // } else {
        //   this.website_language = 'en'
        //   this.website_language = 'en'
        //   localStorage.setItem('lang', 'en')
        // }
        setTimeout(() => { this.reload(this.router.url.replace(/^.{3}/g, localStorage.getItem('lang'))) }, 100);
      })
    }
    else {
      let splitUrl = this.full_url_for_filtering.split('/');
      this.website_language = splitUrl[1];
    }
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    window.location.reload()
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getCurrentDomain()

    }, 1500);
    // this.getCurrentDomain()
    this.getJsonData()
    console.log('test123')
    // if(localStorage.getItem("visited") !== "yes"){
    //   setTimeout(() => {
    //     this.openAdDialog()
    //   }, 5000);
    // }
    
    // this.connection.getIPv4Address().subscribe(
    //   data => {
    //     // Handle success if needed
    //     console.log(data, 'success')
    //   },
    //   error => {
    //     console.error('Error:', error);
    //   }
    // );

    localStorage.setItem('welcome_executed', 'false');
    if(localStorage.getItem('numberOfAdult') === null){
      localStorage.setItem('numberOfAdult', '2')
    }
    if(localStorage.getItem('numberOfChildren') === null){
      localStorage.setItem('numberOfChildren', '0')
    }
    const today = new Date();
    const defaultFrom = new Date(today);
    const defaultTo = new Date(defaultFrom);
    defaultFrom.setDate(defaultFrom.getDate() + 14);
    defaultTo.setDate(defaultTo.getDate() + 15);
    if (localStorage.getItem('fromDate') === null) {
      localStorage.setItem('fromDate',moment(defaultFrom).format("YYYY-MM-DD"))
    }
    if (localStorage.getItem('toDate') === null) {
      localStorage.setItem('toDate',moment(defaultTo).format("YYYY-MM-DD"))
    } 
    
    const go_to_this_location = localStorage.getItem('go_to_this_location');
    if (go_to_this_location !== null) {
      this.router.navigate([go_to_this_location])
      localStorage.removeItem('go_to_this_location');
    }
    this.getIpAddress();
    this.meta.addTag({ name: 'twitter:card', content: 'summary' });
    this.meta.addTag({ name: 'twitter:site', content: 'nobitour.com Travel Services' });
    this.meta.addTag({ name: 'twitter:title', content: 'Nobi Tour' });
    this.meta.addTag({ name: 'twitter:description', content: 'nobitour.com Travel Services' });
    this.meta.addTag({ name: 'twitter:image', content: 'https://nobitour.com/assets/logo-dark.png' });

    this.meta.addTag({ property: 'og:type', content: 'article' });
    this.meta.addTag({ property: 'og:site_name', content: 'nobitour.com Travel Services' });
    this.meta.addTag({ property: 'og:title', content: 'Nobi Tour' });
    this.meta.addTag({ property: 'og:description', content: 'nobitour.com Travel Services' });
    this.meta.addTag({ property: 'og:image', content: 'https://nobitour.com/assets/logo-dark.png' });
    this.meta.addTag({ property: 'og:url', content: `https://nobitour.com` });

    this.full_url_for_filtering = this.location.path();
    let splitUrl = this.full_url_for_filtering.split('/');
    let filtered_website_language = splitUrl[1];

    let country = "";
    let default_city = "";
    let default_iso = "";
    this.connection.getIPv4Address().subscribe(
      data => {
        country = data.country;
        // console.log('country', country, data)
        // console.log('data', data.country_name, "test123")
        if (data.country_name == "Armenia") {
          default_city = "yerevan";
          default_iso = "am";
        }
        else if (data.country_name == "Bulgaria") {
          default_city = "sofia";
          default_iso = "bg";
        }
        else if (data.country_name == "Greece") {
          default_city = "athens";
          default_iso = "gr";
        }
        else if (data.country_name == "Russia") {
          default_city = "moscow";
          default_iso = "ru";
        }
        // else {
        //   default_city = "london";
        //   default_iso = "gb";
        // }


        // if (country == "Armenia") {
        //   default_city = "tsaghkadzor";
        //   default_iso = "am";
        // }
        // else if (country == "Bulgaria") {
        //   default_city = "sofia";
        //   default_iso = "bg";
        // }
        // else if (country == "Greece") {
        //   default_city = "athens";
        //   default_iso = "gr";
        // }
        // else {
        //   default_city = "sofia";
        //   default_iso = "bg";
        // }
        // console.log(default_city, default_iso, 'defaulttt')
        if (!localStorage.getItem('city')) {

          localStorage.setItem('city', default_city);
          localStorage.setItem('iso', default_iso);
        }


      },
      error => {
        console.error('Error retrieving IP address:', error);
        localStorage.setItem('city', 'sofia');
        localStorage.setItem('iso', 'bg');      }
    )

    if(localStorage.getItem('city') === undefined){
      localStorage.setItem('city', 'sofia');
      localStorage.setItem('iso', 'bg');     
    }

    if(localStorage.getItem('currency') === null && localStorage.getItem('ipUserCountry') === null){
      localStorage.setItem('ipUserCountry', 'France')
      localStorage.setItem('currency', 'euro')
    }
    
    // console.log(localStorage.getItem('currency'), 'tes11t')
    if (splitUrl[4] == 'undefined' || splitUrl[4] == 'null' || splitUrl[5] == 'undefined' || splitUrl[5] == 'null') {
      setTimeout(() => {
        location.reload();
      }, 1000);
      // this.router.navigate([`${this.website_language}/home/estate/london/gb/1`])
    }
    if (filtered_website_language != undefined && filtered_website_language.length < 3) {
      localStorage.setItem('lang', filtered_website_language)
    }
    if (filtered_website_language != 'en' && filtered_website_language != 'ru' && filtered_website_language != 'hy' && filtered_website_language != 'el' && filtered_website_language != 'bg' && filtered_website_language != undefined && !this.full_url_for_filtering.includes('redirect')) {
      this.router.navigate([`${localStorage.getItem('lang')}/404`])
    }

    if (localStorage.getItem('lang') === null) {
      localStorage.setItem('lang', 'en');
    }


    this.website_language = localStorage.getItem('lang');
    this.translate.setDefaultLang(this.website_language);

    let visited = localStorage.getItem('visited');

    if (visited == null) {
      localStorage.setItem('visited', "yes");
      let cc = window as any;
      cc.cookieconsent.initialise({
        palette: {
          popup: {
            background: "#5E0071"
          },
          button: {
            background: "#ffe000",
            text: "#164969"
          }
        },
        theme: "classic",
        content: {
          message: 'Этот веб-сайт использует файлы cookie для улучшения качества обслуживания наших пользователей',
          dismiss: 'Ok',
          link: null
        }
      });
    }
    if(this.full_url_for_filtering === "/" + localStorage.getItem('lang') +  "/home/adventure"){
        this.router.navigate([localStorage.getItem('lang') + '/home/adventure/' + localStorage.getItem('city') + '/' + localStorage.getItem('iso') + "/1"]);
    }
    else if(this.full_url_for_filtering === "/" + localStorage.getItem('lang') +  "/home/estate"){
        this.router.navigate([localStorage.getItem('lang') + '/home/estate/' + localStorage.getItem('city') + '/' + localStorage.getItem('iso') + "/1"]);
    }
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: false });
    return this.router.navigateByUrl(url);
  }

  changeLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
    this.translate.setDefaultLang(lang);
    setTimeout(() => { this.reload(this.router.url.replace(/^.{3}/g, this.currentLang.title.toLocaleLowerCase())) }, 100);
  }

  getIpAddress() {  
    // console.log('her12e')
    this.connection.getIPv4Address().subscribe(response => {
      // console.log(response, 'what is data')
      const country = response.country_name;
      if (country == "Armenia") {
        localStorage.setItem('currency', "amd")
      }
      else if (country == "Russia") {
        localStorage.setItem('currency', "rub")
      }
      else if (country == "Bulgaria") {
        localStorage.setItem('currency', "bgn")
      }

      else  {
        localStorage.setItem('currency', "euro")
      }
    })
    error => {
      // console.log('Error retrieving I:', error);
      localStorage.setItem('currency', "euro")
    }
  }

  openAdDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.data = {
    };

    const dialogRef = this.dialog.open(DialogAdPopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        return false;
      }
    );
  }

  getJsonData() {
    const script = document.createElement('script');
    script.src = 'https://admin.nobitour.com/getAdminData/js';
    script.setAttribute('crossorigin', 'use-credentials');
    console.log("TOKENNNNNNN", this.token)

    script.onload = () => {
      const json = (window as any).json;
      const jsonData = JSON.parse(json)


      this.token = jsonData.token
      console.log("TOKENNNNNNN", this.token)
      // if (jsonData.user.name !== null) {
      //   this.isLoggedIn = true;

      //   this.is_verified = jsonData.user.is_verified;
      // }
    }
    document.body.appendChild(script);
    // console.log(this.token, 'this token')
  }
  getCurrentDomain(): string {
    const currentDomain = window.location.hostname;
  
    localStorage.setItem('domain', currentDomain);
  
    if (currentDomain === 'nobitour.ru') {
      // localStorage.setItem('lang', 'ru');
      localStorage.setItem('currency', 'rub');

      const currentPath = window.location.pathname;
      const pathParts = currentPath.split('/');
  
      // Check if the first parameter is already 'ru'
      if (pathParts[1] !== 'ru') {
        // Check if there is a first parameter to replace
        if (pathParts.length > 1) {
          pathParts[1] = 'ru';
        } else {
          // Handle cases where the path is too short, e.g., '/'
          pathParts.push('ru');
        }
  
        // Join the parts back together and redirect
        const newPath = pathParts.join('/');
        const newUrl = `${window.location.origin}${newPath}${window.location.search}`;
        window.location.replace(newUrl);
      }
    }
  
    return currentDomain;
  }
  

}



