import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
// import * as AOS from 'aos';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Meta, Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { DialogLanguagesComponent } from '../dialog-languages/dialog-languages.component';
import { TranslateService } from '@ngx-translate/core';
import { HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../services/loading-service';
import { SnackBarService } from '../services/snackbar.service';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MediaMatcher]
})
export class HeaderComponent implements OnInit {

  @Output() changeProductEvent = new EventEmitter
  @Output() showLoader: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() currencyEvent = new EventEmitter<string>();

  changeProductType(): void {
    this.changeProductEvent.emit(this.productType)
  }
  @ViewChild('dataFrame', { static: false, read: ElementRef }) iframeRef: ElementRef;
  @ViewChild('authFrame', { static: false, read: ElementRef }) authFrame: ElementRef;

  breakpoint: number;
  showSearchField: boolean;
  is_device_mobile: boolean = false;
  showShopName: boolean = false;
  isAdminLogged: boolean = false;
  isClientLogged: boolean = false;
  isPartnerLogged: boolean = false;
  adminId: string;
  clientId: string;
  partnerId: string;
  mobileScreen: boolean;
  adminFirstName: string;
  adminLastName: string;
  width: number;
  screenHeight: number;
  screenWidth: number;
  current_url: string;
  productType: string;
  current_lang_code: string;
  isDropdownOpen: boolean = false;
  isCurrDropdownOpen: boolean = false;
  isNotRussia: boolean = false;
  currentLang = {
    lang: '',
    title: ''
  };
  cookieValue: string;
  website_language: string;
  full_url_for_filtering: any;
  langLocal: string;
  showLanguageIcon: boolean = true;

  splitUrl: string;
  homeUrl: string;
  isLoggedIn: boolean = false;
  userName: string;
  role_id;
  isPartnerMT: boolean = false;
  token: string = '';
  is_verified: boolean = false;
  selectedCurrency: string;
  currencies: object [];

  public logoutButtonHtml = '<button>Logout</button>';

  constructor(private media: MediaMatcher, private elementRef: ElementRef, public snackbar: SnackBarService, public loadingService: LoadingService, private http: HttpClient, private dialog: MatDialog, private router: Router, private meta: Meta, private cookieService: CookieService, private titleName: Title, private location: Location, public translate: TranslateService) {
    this.full_url_for_filtering = this.location.path();
    this.splitUrl = this.full_url_for_filtering.split('/');
    this.website_language = this.splitUrl[1];
    this.homeUrl = this.splitUrl[2];
    this.currentLang.lang = this.website_language;
    if(localStorage.getItem('currency') == null){
          this.setInitialCurrency()

    }
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.close_burger_css();
  }

  @HostListener('document:mousedown', ['$event.target'])
  onDocumentMouseDown(targetElement: HTMLElement) {
    const dropdownContainer = this.elementRef.nativeElement.querySelector('.dropdown-container');
    const headerElement = this.elementRef.nativeElement.querySelector('.header');
    const userElement = this.elementRef.nativeElement.querySelector('.header');

    if ( this.isCurrDropdownOpen && targetElement !== headerElement && !dropdownContainer.contains(targetElement) ) {
      setTimeout(() => {
        this.isCurrDropdownOpen = false;
      }, 500);
    }

    if(this.isDropdownOpen && targetElement !== userElement){
      setTimeout(() => {
        this.isDropdownOpen = false;
      }, 500);

    }
  }
  
  ngOnInit() {
    this. getJsonData() 
    this.currencies = [
      { label: 'EURO - EU', value: 'euro' },
      { label: 'AMD - Armenia', value: 'amd' },
      { label: 'RUB - Russia', value: 'rub' },
      { label: 'BGN - Bulgaria', value: 'bgn' }
    ];
    setTimeout(() => {

      this.selectedCurrency = localStorage.getItem('currency') || 'euro';
    }, 100);

    this.is_device_mobile = this.detectMob()

    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;

    this.showSearchField = false;

    this.clientId = this.cookieService.get('clientId');
    this.partnerId = this.cookieService.get('partnerId');
    this.adminId = this.cookieService.get('adminId');

    this.adminFirstName = this.cookieService.get('adminFirstName');
    this.adminLastName = this.cookieService.get('adminLastName');

    if (!this.clientId && !this.partnerId && !this.adminId) {
      this.cookieService.deleteAll();
    } else if (this.clientId) {
      this.isClientLogged = true;
    } else if (this.partnerId) {
      this.isPartnerLogged = true;
    } else if (this.adminId) {
      this.isAdminLogged = true;
    }

    this.setTitleBack();

    this.full_url_for_filtering = this.location.path();
    let splitUrl = this.full_url_for_filtering.split('/');
    if(this.full_url_for_filtering.includes('shop')){
      this.showShopName = true;
    }
    let filtered_website_language = splitUrl[1];
    if (filtered_website_language != undefined && filtered_website_language.length < 3) {
      localStorage.setItem('lang', filtered_website_language)
    }
    if (localStorage.getItem('lang') === null) {
      localStorage.setItem('lang', 'ru');
    }

    this.website_language = localStorage.getItem('lang');

    let productType = splitUrl[3];
    if (productType == 'flight' || productType == 'insurance' || productType == 'rent-a-car' || productType == 'personal-transfer' || productType == 'estateRu' || productType == 'adventureRu' || productType == 'avia-bus-russia') {
      this.showLanguageIcon = false;
    }

    if (this.website_language == "ru") {
      this.current_lang_code = "RU"
    } else if (this.website_language == "hy") {
      this.current_lang_code = "AM"
    } else if (this.website_language == "bg") {
      this.current_lang_code = "BG"
    } else if (this.website_language == "el") {
      this.current_lang_code = "GR"
    } else if (this.website_language == "en") {
      this.current_lang_code = "EN"
    }

    this.productType = splitUrl[3];

    if(localStorage.getItem('ipUserCountry') === "Russia"){
      this.isNotRussia = false;
    }
    else{
      this.isNotRussia = true;
    }
    // console.log(this.curren)
  }

  setInitialCurrency(): void {
    // Get user's IP location and map it to the corresponding currency
    ; // Implement this method in your currency service
    setTimeout(() => {
      let userCountry = localStorage.getItem('ipUserCountry')
    switch (userCountry) {
      case 'Armenia':
        this.selectedCurrency = 'amd';
        break;
      case 'Russia':
        this.selectedCurrency = 'rub';
        break;
      case 'Bulgaria':
        this.selectedCurrency = 'bgn';
        break;
      default:
        this.selectedCurrency = 'euro'; // Default to EURO if country not found or doesn't match specific countries
        break;
    }
    }, 1500);

  }

  saveCurrentUrl() {
    const current_path = this.location.path();
    localStorage.setItem('go_to_this_location', current_path)
  }

  detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  logoutIFrame() {
    const iFrameDoc = this.authFrame.nativeElement.contentWindow.document;
    const logoutButton = iFrameDoc.querySelector('#logoutButton');
    logoutButton.click();
    this.snackbar.showLogoutMessage()
    location.reload();
    this.loadingService.show();
  }
  loadAdminData() {
    this.iframeRef.nativeElement.src = 'https://admin.nobitour.com/getAdminData';
  }



  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  toggleCurrDropdown() {
    this.isCurrDropdownOpen = !this.isCurrDropdownOpen;
  }


  getJsonData() {
    const script = document.createElement('script');
    script.src = 'https://admin.nobitour.com/getAdminData/js';
    script.setAttribute('crossorigin', 'use-credentials');
    script.onload = () => {
      const json = (window as any).json;
      const jsonData = JSON.parse(json)

      this.token =jsonData.token

      
      if(jsonData.user !== null){
        this.isLoggedIn = true;
        this.userName = jsonData.user.name;
        this.is_verified = jsonData.user.is_verified;
        if(jsonData.user.role_id == 2){
          this.isPartnerMT = true;
        }
      }
    }
    document.body.appendChild(script);
  }

  openViewLanguages() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    if (this.currentLang.lang == 'en') {
      this.currentLang.title = 'English'
    } else if (this.currentLang.lang == 'bg') {
      this.currentLang.title = 'Български'
    } else if (this.currentLang.lang == 'el') {
      this.currentLang.title = 'Ελληνική'
    } else if (this.currentLang.lang == 'hy') {
      this.currentLang.title = 'Հայերեն'
    } else if (this.currentLang.lang == 'ru') {
      this.currentLang.title = 'Русский'
    }

    dialogConfig.data = {
      currentLang: this.currentLang.lang,
      currentTitle: this.currentLang.title
    };

    const dialogRef = this.dialog.open(DialogLanguagesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.currentLang.lang = localStorage.getItem('lang');
        this.website_language = localStorage.getItem('lang');
        if (this.location.path() == '') {
          window.location.reload();
        }

        return false;
      }
    );
  }


  goToHome(productType: string) {
    this.productType = productType;
    this.changeProductEvent.emit(this.productType)
    this.website_language = localStorage.getItem('lang');
    let cityLocal = localStorage.getItem('city');
    let isoLocal = localStorage.getItem('iso');
    if (cityLocal == null && isoLocal == null) {
      cityLocal = 'london';
      isoLocal = 'gb'
    }
    if (this.website_language == null) {
      this.website_language = 'en';
    }

    if (this.productType != 'flight' && this.productType != 'rent-a-car' && this.productType != 'insurance' && this.productType != 'personal-transfer' && this.productType != 'estateRu' && this.productType != 'adventureRu' && this.productType != 'avia-bus-russia') {
      this.router.navigate([this.website_language + '/home/' + this.productType + "/" + localStorage.getItem('city') + "/" + localStorage.getItem('iso') + "/1"])

    }
    else if (this.productType == 'flight' || this.productType == 'rent-a-car' || this.productType == 'insurance' || this.productType == 'personal-transfer' || this.productType == 'estateRu' || this.productType == 'adventureRu' || this.productType == 'avia-bus-russia') {
      this.router.navigate([this.website_language + '/home/' + this.productType])

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.close_burger_css()
  }


  goToHomeMainMenu(productType: string) {
    this.productType = productType;
    this.changeProductEvent.emit(this.productType)
    this.website_language = localStorage.getItem('lang');
    let cityLocal = localStorage.getItem('city');
    let isoLocal = localStorage.getItem('iso');
    if (cityLocal == null && isoLocal == null) {
      cityLocal = 'london';
      isoLocal = 'gb'
    }
    if (this.website_language == null) {
      this.website_language = 'en';
    }

    if (this.productType != 'flight' && this.productType != 'rent-a-car' && this.productType != 'insurance' && this.productType != 'personal-transfer' && this.productType != 'estateRu' && this.productType != 'adventureRu' && this.productType != 'avia-bus-russia') {
      this.router.navigate([this.website_language + '/home/' + this.productType + "/" + localStorage.getItem('city') + "/" + localStorage.getItem('iso') + "/1"])

    }
    else if (this.productType == 'flight' || this.productType == 'rent-a-car' || this.productType == 'insurance' || this.productType == 'personal-transfer' || this.productType == 'estateRu' || this.productType == 'adventureRu' || this.productType == 'avia-bus-russia') {
      this.router.navigate([this.website_language + '/home/' + this.productType])

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

  }

  goToWhilteLabel(url){
    window.open(url)
  }

  openHeaderLink(page) {
    this.website_language = localStorage.getItem('lang');
    this.router.navigate([this.website_language + '/' + page]);

    this.close_burger_css()
  }


  logout() {
    this.cookieService.deleteAll();
    window.location.reload();

    window.location.href = "https://nobitour.com"
  }


  openMenu() {
    let x = document.getElementById("menu");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  setTitleBack() {
    if (this.location.path() == "") {
      this.titleName.setTitle("Nobi Tour");
    }
  }

  goBackToIntro() {
    let localLang = localStorage.getItem('lang');
    if (localLang == null) {
      localLang = 'en';
    }
    this.router.navigate(['/' + this.website_language])

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  goToShop() {
    let localLang = localStorage.getItem('lang');
    if (localLang == null) {
      localLang = 'en';
    }
    this.router.navigate(['/' + this.website_language + '/shop'])

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onClickMenu() {

    this.close_burger_css()
  }

  onClickLangBtn() {

    const langBtn = document.querySelector('.lang__btn');
    const langList = document.querySelector('.lang__list');
    const langOverlay = document.querySelector('.lang-overlay');

    if (langList.classList.contains('active')) {
      langBtn.classList.remove('active');
      langList.classList.remove('active');
      langOverlay.classList.remove('active');
    } else {
      langBtn.classList.add('active');
      langList.classList.add('active');
      langOverlay.classList.add('active');
      document.addEventListener('click', this.onClickOutsideOfLangs.bind(this));

    }
  }

  onClickOutsideOfLangs(event) {
    const langBtn = document.querySelector('.lang__btn');
    const langList = document.querySelector('.lang__list');
    const langOverlay = document.querySelector('.lang-overlay');
    const isClickInside = langList.contains(event.target) || langBtn.contains(event.target);
  
    if (!isClickInside) {
      langBtn.classList.remove('active');
      langList.classList.remove('active');
      langOverlay.classList.remove('active');
      // Remove event listener from document
      document.removeEventListener('click', this.onClickOutsideOfLangs.bind(this));
    }
  }

  onClickLangBtns(lang: string, title: string) {
    this.full_url_for_filtering = this.location.path();
    this.currentLang.title = title;
    this.currentLang.lang = lang;
    this.website_language = localStorage.getItem('lang');
    if (this.website_language === 'en' && this.homeUrl == 'home' && !this.splitUrl[3]) {
      this.router.navigate(['en/home'])
    }

    this.translate.setDefaultLang(this.currentLang.lang);
    setTimeout(() => { this.reload(this.router.url.replace(/^.{3}/g, this.currentLang.title.toLocaleLowerCase())) }, 100);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.changeBtnClass();

    const langBtn = document.querySelector('.lang__btn');
    const langList = document.querySelector('.lang__list');
    const langOverlay = document.querySelector('.lang-overlay');

    langBtn.classList.remove('active');
    langList.classList.remove('active');
    langOverlay.classList.remove('active');
  }

  onClicklangOverlay() {

    const langList = document.querySelector('.lang__list');
    const langOverlay = document.querySelector('.lang-overlay');

    document.querySelector('.lang__btn').classList.remove('active');
    langList.classList.remove('active');
    langOverlay.classList.remove('active');
  }
  onChangeCurrency(curr){
    if(curr == 'bgn'){
      localStorage.setItem('ipUserCountry', 'Bulgaria');
      this.selectedCurrency = 'bgn'; 
    }else if(curr == 'amd'){
      localStorage.setItem('ipUserCountry', 'Armenia');
      this.selectedCurrency = 'amd'; 
    }
    else if(curr == 'euro'){
      localStorage.setItem('currency', 'euro');
      localStorage.setItem('ipUserCountry', 'default');
      this.selectedCurrency = 'euro'; 
    }
    else if(curr == 'rub'){
      localStorage.setItem('ipUserCountry', 'Russia');
      this.selectedCurrency = 'rub'; 
    }
    this.toggleCurrDropdown();
    this.showLoader.emit(true);
    setTimeout(() => {
      this.showLoader.emit(false);
      this.currencyEvent.emit(curr)
    }, 300);
  }
  

  changeBtnClass() {

    this.langLocal = localStorage.getItem('lang');
    if (this.langLocal == null) {
      this.langLocal = 'ru';
      this.currentLang.lang = this.langLocal;
    }

    if (this.currentLang.lang == 'en') {

    } else if (this.currentLang.lang == 'bg') {

    } else if (this.currentLang.lang == 'el') {

    } else if (this.currentLang.lang == 'hy') {

    } else if (this.currentLang.lang == 'ru') {

    }
    localStorage.setItem('lang', this.currentLang.lang)
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: false });
    return this.router.navigateByUrl(url);
  }

  partner_login() {
    this.router.navigate([`${this.website_language}/login`])
  }

  contact_us() {
    this.router.navigate([`${this.website_language}/contact-us`])
  }

  close_burger_css() {
    const burgers = document.querySelectorAll('.burger');
    const menu = document.querySelector('.menu');

    menu.classList.toggle('active');
    burgers[0].classList.toggle('active');
    document.body.classList.toggle('body-block');
    document.querySelector('html').classList.toggle('body-block');
  }
}