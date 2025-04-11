import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../services/snackbar.service';
import { ProductService } from '../services/product.service';
import { DialogViewImagesComponent } from '../dialog-view-images/dialog-view-images.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { CanonicalUrlService } from '../services/canonical-url.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { PageTitleService } from '../services/page-title.service';
import { DialogError500popupComponent } from '../dialog-error500popup/dialog-error500popup.component';
import { ConnectionService } from '../services/connection.service';
import { HotelImageDialogComponent } from '../hotel-image-dialog/hotel-image-dialog.component';
import { HttpClient } from '@angular/common/http';
import { HomeService } from '../services/home.service';
import { Serializer } from '@angular/compiler';


@Component({
  selector: 'app-product-adventure',
  templateUrl: './product-adventure.component.html',
  styleUrls: ['./product-adventure.component.css']
})
export class ProductAdventureComponent implements OnInit {

  @ViewChild('resetBookingForm', {
    static: true
  }) resetBookingForm: NgForm;

  bookingFormGroup: FormGroup;

  private routeSub: Subscription;
  productId: any;
  adventure: any;
  freeDates: Date = new Date();
  minDateFrom: Date = new Date();

  showLoader: boolean = true;

  productType: any;

  clientId: string;

  recommendedCities = [];
  currentImage: string = "";

  adventureId: any;

  copied: boolean = false;
  existDate: boolean;
  translateSnackBar: any;

  minDate: any;
  fromDate: any = '';
  toDate: any = '';

  showConvertedPrice: boolean = false;
  advprice;

  googlePlaceUrl: string;
  currentLang: string;
  isTiqets: boolean = false;
  outerLinkForTiqets: string;

  full_url_for_filtering: string;
  filtered_website_language: string;
  pageTitle: string;
  canNavigateBack: boolean = false;
  cityName: string;
  imageURLs = [];
  cityNameTranslated: string;
  countryISO: string;
  countryName: string;
  filtered_url_slug: string;
  nameForTour: string;
  tourAddress: string;
  canonicalURL: string;
  productIdAndSlug: string;
  imageURL: string;
  description: string;
  showDescription: boolean = true;
  tripster_adventure: any;
  numberOfAdultsForApi: any = '1';
  numberOfChildrenForApi: any = '0';
  isTripster: boolean;
  ipAddress: any;
  ip_country_name: any;
  isRussianIp: boolean = false;
  metaDecription: any;
  availabilityForm: FormGroup;
  guestsRange: number[] = [];


  disabledDates: Date[];
  tour_id: number;
  price_includes = [];
  price_excludes = [];

  highlights = [];
  travel_styles = [];
  facilities = [];
  cPage: string;
  token: string = '';
  isLoggedIn: boolean = false;
  is_verified: boolean = false;
  service_id: any;
  startDate: any;
  guests: number = 1;
  updatedFormStartDate: any;
  partner: string;
  showInclusion: boolean = false;
  showExclusion: boolean = false;
  showDeparture: boolean = false;
  showItinerary: boolean = false;
  showHighlights: boolean = false;
  showFacilities: boolean = false;
  showTravelStyles: boolean = false;
  showRating: boolean = false;
  showLocation: boolean = false;
  inclusion: string;
  exclusion: string;
  itinerary: string;
  conversion_rate: any = '1';
  default_curr: string =  '₽';
  display_price: number;
  original_price: number;
  rub_price: number;
  tripsterProductType: string;
  duration: number;
  starRating: number;
  tripsterImages = [];
  tagline: string;
  tag_ids = [];
  tripsterTourId: string;

  constructor(private homeData: HomeService, public sanitizer: DomSanitizer, private http: HttpClient, private connection: ConnectionService, private data: ProductService, private snackBar: SnackBarService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private formBuilder: FormBuilder, private translate: TranslateService, private cookieService: CookieService, private location: Location, private titleName: Title, private pageTitleService: PageTitleService, private canonicalUrlService: CanonicalUrlService, private meta: Meta) {
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.changeLanguageBasedOnUrl(location);
        this.translate.setDefaultLang(this.currentLang);
      } else {
        this.full_url_for_filtering = 'Home';
      }
    });
    this.canNavigateBack = this.router.navigated;
    this.availabilityForm = this.formBuilder.group({
      startDate: '',
      guestCount: ''
    });
  }

  ngOnInit() {
    this.getJsonData();
    this.token = localStorage.getItem("token")
    // console.log(this.token, 'token')
    if (localStorage.getItem('ipUserCountry') === null) {
      this.getIpAddress();
    }
    this.get_currency_logic(this.connection, this.homeData)

    for (let i = 1; i <= 20; i++) {
      this.guestsRange.push(i);
    }


    this.cPage = localStorage.getItem('cPage')

    let fromDateSession = localStorage.getItem('fromDate');
    let toDateSession = localStorage.getItem('toDate');
    let numberOfAdultsSession = localStorage.getItem('numberOfAdult');
    let numberOfChildrenSession = localStorage.getItem('numberOfChildren');

    if (fromDateSession != null && toDateSession != null) {
      this.fromDate = localStorage.getItem('fromDate');
      this.toDate = localStorage.getItem('toDate');
    }
    else {
      this.fromDate = '';
      this.toDate = '';
      localStorage.setItem('fromDate', this.fromDate);
      localStorage.setItem('toDate', this.toDate);
    }

    if (numberOfAdultsSession != null && numberOfChildrenSession != null) {
      this.numberOfAdultsForApi = localStorage.getItem('numberOfAdult');
      this.numberOfChildrenForApi = localStorage.getItem('numberOfChildren');
    }
    if (numberOfAdultsSession === null && numberOfChildrenSession === null) {
      this.numberOfAdultsForApi = 2;
      this.numberOfChildrenForApi = 0;
    }

    this.routeSub = this.route.params.subscribe(params => {
      this.productType = params['product'];
      this.productIdAndSlug = params['idSlug'];

      let productIdFromUrl = this.productIdAndSlug.split("-");
      this.productId = productIdFromUrl[0] + '-' + productIdFromUrl[1]
    });

    if (this.productId[0] == 't') {
      // console.log('tiqetss')
      this.isTiqets = true;
      this.isTripster = false;
      // this.onGetAdventureById();
      this.service_id = this.productIdAndSlug.split("-")[0] + "-" + this.productIdAndSlug.split("-")[1];
      this.onGetAdventureById();
      // console.log(this.service_id, 'service id')

    }
    else  if (this.productId[0] == 's') {
      // console.log('tripsterrr')
      this.isTripster = true;
      this.isTiqets = false;
      this.service_id = this.productIdAndSlug.split("-")[0] + "-" + this.productIdAndSlug.split("-")[1];
      // console.log(this.productIdAndSlug.split("-")[1])
      this.getTripsterData(this.productIdAndSlug.split("-")[1], this.filtered_website_language)
      // console.log(this.service_id, 'service id')

    }
    
    else {
      this.service_id = this.productIdAndSlug.split("-")[0];
      this.onGetAdventureById();
      // console.log(this.service_id, 'service id')

    }
    // console.log('true', this.isTiqets)

    this.clientId = this.cookieService.get('clientId');

    this.productType = 'adventure';


    // this.onGetAdventureById();
    this.createForms();

    this.translate.get('partnerAddRestaurantSnackBar').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });


    this.full_url_for_filtering = this.location.path();
    let splitUrl = this.full_url_for_filtering.split('/');
    this.filtered_website_language = splitUrl[1];
    this.filtered_url_slug = splitUrl[5];

    setTimeout(() => {
      window.scrollTo({ top:500, behavior: 'smooth' });

    }, 1000);
    const currentDomain = window.location.hostname;
  
  
    if (currentDomain === 'nobitour.ru') {
      this.default_curr = '₽';
    }
  }

  changeCheckOutMin() {
    const startDateValue = this.availabilityForm.get('startDate').value;
    const startDate = new Date(startDateValue);
    startDate.setDate(startDate.getDate() + 2);
    this.minDate = startDate.toISOString().slice(0, 10);

    this.getJsonData();
  }

  onShowLoader(value: boolean) {
    this.showLoader = value;
  }

  getJsonData() {
    // console.log('hello?')
    const script = document.createElement('script');
    script.src = 'https://admin.nobitour.com/getAdminData/js';
    script.setAttribute('crossorigin', 'use-credentials');
    script.onload = () => {
      const json = (window as any).json;
      const jsonData = JSON.parse(json)


      this.token = jsonData.token
      // console.log("TOKENNNNNNN", this.token)
      if (jsonData.user.name !== null) {
        this.isLoggedIn = true;

        this.is_verified = jsonData.user.is_verified;
      }
    }
    document.body.appendChild(script);
  }

  createForms() {

    this.bookingFormGroup = this.formBuilder.group({
      checkin: ['']
    });

  }
  saveCurrentUrl() {
    const current_path = this.location.path();
    localStorage.setItem('go_to_this_location', current_path)
  }

  onCurrencyDataReceived(currencyData) {
    localStorage.setItem('currency', currencyData);
    this.get_currency_logic(this.connection, this.homeData);
  }

  stripDecimals(price: number): string {
    return Math.floor(price).toString();
  }

  checkTourAvailability() {

    const updatedStartDate = this.startDate.toISOString().slice(0, 10);
    const startDayObject = new Date(updatedStartDate);
    startDayObject.setDate(startDayObject.getDate() + 1);

    const updatedFromDate = startDayObject.toISOString().slice(0, 10);
    this.updatedFormStartDate = updatedFromDate;

    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1); // Monday of this week
    const endOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1 + (6 * 7)); // Sunday of the 6th week from now on
    const start = `${startOfWeek.getFullYear()}-${(startOfWeek.getMonth() + 1).toString().padStart(2, '0')}-${startOfWeek.getDate().toString().padStart(2, '0')}`;
    const end = `${endOfWeek.getFullYear()}-${(endOfWeek.getMonth() + 1).toString().padStart(2, '0')}-${(endOfWeek.getDate() - 1).toString().padStart(2, '0')}`; // Subtracting 1 from the end date as it should be the Saturday of the 6th week, not Sunday

    this.data.checkTourAvailability(this.tour_id, start, end).subscribe(
      data => {
        const disabledDates = [];
        data.forEach(date => {
          if (date.active !== 1) {
            disabledDates.push(new Date(date.start));
          }
        });
        const datePicker = this.fromDate._datepickerInput._elementRef.nativeElement;
        datePicker.disabledDates = disabledDates;
        datePicker.disabledDates = disabledDates;
      }
    )
  }

  onGetAdventureById() {
    this.data.getTiqetsAdventureById(this.service_id, this.currentLang).subscribe(
      data => {
        
        // console.log(data)
        this.adventure = data;
        if (this.isTiqets) {
          this.imageURLs = data.images;
          this.nameForTour = data.name;
          this.adventureId = data.id;
          this.countryISO = data.country_iso;
          this.outerLinkForTiqets = data.product_url;
          // console.log(this.outerLinkForTiqets, 'outer')

          this.countryName = data.countryName;
          this.cityNameTranslated = data.city;
          this.cityName = data.city_en;
          this.tourAddress = data.address;
          if (data.description) {
            this.description = data.description;
          }
          else {
            this.description = "";
          }

          if (data.googleCoordinates) {
            this.showLocation = true;
          }
          if (data.rating) {
            this.showRating = true;
          }

          if (data.inclusions) {
            this.showInclusion = true;
            this.inclusion = data.inclusions;
          }
          if (data.exclusions) {
            this.showExclusion = true;
            this.exclusion = data.exclusions;
          }
          this.advprice = data.price;



          localStorage.setItem('city', data.cityName.toLowerCase());
          localStorage.setItem('iso', data.country_iso.toLowerCase());

        }
        else {
          // console.log(data, ' data when loader is false')
          // console.log(data.tour.translation)
          this.nameForTour = data.tour.title;
          this.imageURLs = data.imageUrls;
          this.countryName = data.seo.countryName;
          this.tourAddress = data.tour.address;
          this.countryISO = data.seo.countryISO;

          this.cityName = data.seo.cityName;
          this.adventureId = data.tour.id;

          if (data.tour.content) {
            this.description = data.tour.content;
          }
          else {
            this.description = "";
          }

          if (data.tour.include) {
            this.showInclusion = true;
            this.inclusion = data.tour.include.map(item => item.title);
          }
          if (data.tour.exclude) {
            this.showExclusion = true;
            this.exclusion = data.tour.exclude.map(item => item.title);
          }
          if (data.departurePoint) {
            this.showDeparture = true;
          }
          if (data.tour.itinerary) {
            this.showItinerary = true;
            this.itinerary = data.tour.itinerary
          }
          if (data.highlights) {
            this.highlights = data.highlights;
            this.showHighlights = true;
          }
          if (data.travel_styles) {
            this.showTravelStyles = true;
            this.travel_styles = data.travel_styles;
          }
          if (data.facilities) {
            this.facilities = data.facilities;
            this.showFacilities = true;
          }
          this.advprice = data.tour.price;
          this.tour_id = data.tour.id;
          // console.log(this.advprice, 'adv price')
          localStorage.setItem('city', data.seo.cityName.toLowerCase());
          localStorage.setItem('iso', data.seo.countryISO.toLowerCase());
        }


        this.pageTitle = data.seo.pageTitle;
        this.metaDecription = data.seo.pageDescription;

        this.currentImage = this.imageURLs[0];
        this.canonicalURL = data.seo.canonicalURL;
        this.recommendedCities = data.recommendedCities;

        if (this.description.length < 3) {
          this.showDescription = false;
        }

        if (data.placeId) {
          this.googlePlaceUrl = 'https://www.google.com/maps/embed/v1/place?q=place_id:' + data.placeId + '&key=AIzaSyBRPDMwE4mfxJmPYiF1_8rQ_ohaZ8rzP1Y';
        } else {
          this.googlePlaceUrl = 'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJW_FUNtNEwRkRjewxVg5NI7E&key=AIzaSyBRPDMwE4mfxJmPYiF1_8rQ_ohaZ8rzP1Y';
        }


        this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
        this.meta.updateTag({ name: 'twitter:site', content: 'nobitour.com Travel Services' });
        this.meta.updateTag({ name: 'twitter:title', content: this.pageTitle });
        this.meta.updateTag({ name: 'twitter:description', content: this.metaDecription });

        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:site_name', content: 'nobitour.com Travel Services' });
        this.meta.updateTag({ property: 'og:title', content: this.pageTitle });
        this.meta.updateTag({ property: 'og:description', content: this.metaDecription });
        this.meta.updateTag({ property: 'og:url', content: this.canonicalURL });
        this.meta.updateTag({ name: 'description', content: this.metaDecription });
        this.showLoader = false;
        this.pageTitleService.changeTitleName(this.titleName, this.pageTitle);
        this.canonicalUrlService.createLinkForCanonicalURL(this.canonicalURL);
      },
      err => {
        if (err.status == 500) {
          this.openError500Dialog();

        }
      });
  }

  get_currency_logic(conn, data) {
    if (localStorage.getItem('currency')) {
      const country = localStorage.getItem('ipUserCountry');
      if (country == "Armenia") {
        localStorage.setItem('currency', "amd")
        this.default_curr = '֏';
      }
      else if (country == "Russia") {
        localStorage.setItem('currency', "rub")

        this.default_curr = '₽';
      }
      else if (country == "Bulgaria") {
        localStorage.setItem('currency', "bgn")
        this.default_curr = 'лв';
      }
      const curr = localStorage.getItem('currency');
      data.get_rate(curr).subscribe(
        data => {
          if (curr == "amd" || curr == "rub" || curr == "bgn") {
            this.conversion_rate = data.rate;
          }
          if (data.rate == null || data.error) {
            this.default_curr = '€';
            this.conversion_rate = '1';
          }
        },
        error => {
          this.default_curr = '€';
          this.conversion_rate = '1';
        }
      )
      this.showConvertedPrice = true;
    }
    else {
      conn.getIPv4Address().subscribe(response => {
        const country = response.country_name;
        localStorage.setItem('ipUserCountry', country);
        if (country == "Armenia") {
          localStorage.setItem('currency', "amd")
        }
        else if (country == "Russia") {
          localStorage.setItem('currency', "rub")
        }
        else if (country == "Bulgaria") {
          localStorage.setItem('currency', "bgn")
        }
        const curr = localStorage.getItem('currency')
        if (curr == 'amd') {
          this.default_curr = '֏';
        } else if (curr == 'bgn') {
          this.default_curr = 'лв';
        }
        else if (curr == 'rub') {
          this.default_curr = '₽';
        }

        data.get_rate(curr).subscribe(
          data => {
            if (curr == "amd" || curr == "rub" || curr == "bgn") {
              this.conversion_rate = data.rate;
            }
            if (data.rate == null) {
              this.default_curr = '€';
              this.conversion_rate = '1';
            }
          },
          error => {
            this.default_curr = '€';
            this.conversion_rate = '1';
          }
        )
        this.showConvertedPrice = true;
      })
    }
  }

  navigateToRecommendedCity(city, iso) {
    this.router.navigate([this.filtered_website_language + '/home/' + this.productType + "/" + city + "/" + iso + "/1"])
  }

  share_button(url) {
    let share_url = url + this.full_url_for_filtering;
    window.open(share_url, 'popup', 'width=600,height=600'); return false;
  }

  changeLanguageBasedOnUrl(location) {
    this.full_url_for_filtering = location.path();

    let splitUrl = this.full_url_for_filtering.split('/');
    this.filtered_website_language = splitUrl[1];

    this.currentLang = this.filtered_website_language;
  }

  openError500Dialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.data = {
    };

    const dialogRef = this.dialog.open(DialogError500popupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.filtered_website_language = localStorage.getItem('lang');
        return false;
      }
    );

  }


  openViewImages(imagePosition: number) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;


    dialogConfig.data = {
      imagePosition: imagePosition,
      title: this.adventure.name,
      images: this.adventure.images
    };

    this.dialog.open(DialogViewImagesComponent, dialogConfig);

  }


  selectHotelImage(index: number) {
    const dialogRef = this.dialog.open(HotelImageDialogComponent, {
      data: {
        images: this.imageURLs,
        currentImageIndex: index,
        currentImage: this.imageURLs[index]
      }
    });
  }


  bookingNextStep() {
    if (this.existDate == undefined || this.existDate == false) {
      this.snackBar.openSnackWrongBar(this.translateSnackBar.incorectlyFieldFill, this.translateSnackBar.close)
    } else {
      const checkin = this.bookingFormGroup.controls.checkin.value;
      this.router.navigate(['reservation-adventure-details/' + this.productId + '/' + checkin]);
    }
  }

  getIpAddress() {
    this.connection.getIPv4Address().subscribe(response => {
      this.ipAddress = response;
      this.ip_country_name = this.ipAddress.country;
      localStorage.setItem('ipUserCountry', this.ip_country_name);
      if (this.ip_country_name == "Russia") {
        this.isRussianIp = true;
      }

    })
  }

  redirectTo() {
    if (this.currentLang.length < 1) {
      this.currentLang = 'en';
    }
    window.open('/redirect-to/' + this.currentLang + '/' + this.productId, '_blank');
  }

  backToSearchResults() {
    this.router.navigate([`${this.filtered_website_language}/home/adventure/${this.cityName}/${this.countryISO}/${this.cPage}`]);
  }

  openTiqetsWhitelabel(link){
    this.router.navigate([this.filtered_website_language + '/home/' + link])
  }


  //tripster
  getTripsterData(id, lang){
    this.data.getTripsterAdventureById(id, lang).subscribe(
      data =>{
        // console.log(data);
        this.showLoader = false;
        this.tripster_adventure = data.products;
        this.nameForTour = this.tripster_adventure[0].name;
        this.display_price = this.tripster_adventure[0].price;
        this.original_price = this.tripster_adventure[0].originalPrice;
        this.rub_price = this.tripster_adventure[0].price;
        this.tripsterProductType = this.tripster_adventure[0].productType;
        this.description = this.stripHtmlTags(this.tripster_adventure[0].description[0][1]);
        // console.log(this.description,1234123)
        this.countryName = this.tripster_adventure[0].countryName;
        this.cityName = this.tripster_adventure[0].cityName;
        this.duration = this.tripster_adventure[0].duration;
        this.starRating = this.tripster_adventure[0].starRating;
        this.imageURLs = this.tripster_adventure[0].imageUrl.slice(1);
        this.currentImage = this.tripster_adventure[0].imageUrl[0].medium;
        this.tagline = this.tripster_adventure[0].tagline;
        this.tag_ids = this.tripster_adventure[0].tag_ids;
      }
    )
  }

  stripHtmlTags(htmlText: string): string {
    const div = document.createElement('div');
    div.innerHTML = htmlText;
    return div.textContent || div.innerText || '';
  }

  redirectToTripster(){
    const tour_id = this.tripster_adventure[0].id.split("-")[1];
    window.open(`https://experience.tripster.ru/experience/${tour_id}`)
  }

  redirectToTiqets(){
    window.open(this.outerLinkForTiqets)
  }
}
