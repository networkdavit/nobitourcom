import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../services/snackbar.service';
import { ProductService } from '../services/product.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Product } from '../models/product.interface';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { SeoService } from '../services/seo.service';
import { CanonicalUrlService } from '../services/canonical-url.service';
import { Meta, Title, DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Location } from '@angular/common';
import { PageTitleService } from '../services/page-title.service';
import { DialogError500popupComponent } from '../dialog-error500popup/dialog-error500popup.component';
import { ConnectionService } from '../services/connection.service';
import { HttpClient } from '@angular/common/http';
import { DialogLoginRegComponent } from '../dialog-login-reg/dialog-login-reg.component';
import { ImageGalleryDialogComponent } from '../image-gallery-dialog/image-gallery-dialog.component';
import { HeaderComponent } from '../header/header.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { HotelImageDialogComponent } from '../hotel-image-dialog/hotel-image-dialog.component';
import { HomeService } from '../services/home.service';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-product-estate',
  templateUrl: './product-estate.component.html',
  styleUrls: ['./product-estate.component.css'],
})
export class ProductEstateComponent implements OnInit {

  @ViewChild('resetBookingForm', {
    static: true
  }) resetBookingForm: NgForm;
  @ViewChild(HeaderComponent, { static: true }) header: HeaderComponent;

  bookingFormGroup: FormGroup;

  private routeSub: Subscription;
  productId: any;
  productType: any;
  estate: Product;

  showLoader: boolean = true;

  valueRoom = 0;
  valueAdults = 0;
  valueChildren = 0;

  enableRoom = true;
  enableAdult = true;
  enableChildren = true;
  reviews: any[] = [];

  clientId = this.cookieService.get('clientId');
  favoriteId: number;

  recommendedCities = [];
  estateId: any;
  url: any;
  copied = false;

  translateSnackBar: any;
  minDate: any;

  fromDate: any = '';
  toDate: any = '';

  search: string = '';

  googlePlaceUrl: string;
  currentLang = this.cookieService.get('currentLang');
  isAgoda: boolean = false;
  twitterHref: any;
  href: string;

  full_url_for_filtering: any;
  showConvertedPrice: boolean = false;
  filtered_website_language: any;
  pageTitle: string;
  canNavigateBack: boolean = false;
  cityName: string;
  cityNameTranslated: string;
  countryISO: string;
  countryName: string;
  filtered_url_slug: string;
  nameForTour: string;
  canonicalURL: string;
  productIdAndSlug: string;
  imageURL: string;
  description: string;
  showMTData: boolean = true;

  numberOfAdultsForApi: any = '1';
  numberOfChildrenForApi: any = '0';
  postUrl: any;
  postTitle: any;
  isLoading: boolean = false;

  ipAddress: any;
  ip_country_name: any;
  isRussianIp: boolean = false;
  metaDecription: any;

  checkIn: string;
  checkOut: string;
  adults = 1;
  children = 0;
  showGuests: boolean = false;

  filterFormGroup: FormGroup;
  checkInForm: any = '';
  checkOutForm: any = '';
  book_field: boolean = true;
  enquiry_field: boolean = false;
  newProductId: string = '';
  amenities = [];
  services = [];
  policies_available_MT: boolean = false;
  policies_available_HL: boolean = true;
  showHighlights: boolean = false;
  isHotelLook: boolean = false;
  inUrlPartnerId: string = "";
  videoEmbedUrl: SafeResourceUrl;
  videoAvailable: boolean = false;
  checkInTimePolicy: string = "";
  checkOutTimePolicy: string = "";
  policies = [];
  property_types = [];
  recommended_cities_mt_hl = [];
  imageURLs = [];
  rooms_HL = [];
  isLoggedIn: boolean = false;
  hotelUrl: string;
  content_MT: string;
  availabilityForm: FormGroup;
  adultsRange = Array.from({ length: 10 }, (_, i) => i + 1);
  childrenRange = Array.from({ length: 10 }, (_, i) => i);
  googleCoordinates
  currentImage: string = "";
  startIndex = 0;
  endIndex = 4;
  data_for_rooms;
  totalPrice = 0;
  roomTotalPrice = 0;
  token: string = '';
  showTerms: boolean = true;
  children_add_to_cart: any = '';
  adults_add_to_cart: any = '';
  from_add_to_cart: any = '';
  to_add_to_cart: any = '';
  selectedGuests: { roomId: number, guests: number }[] = [];
  minDateFrom: Date = new Date();
  hotel_id: number;
  is_able_to_book: boolean = false;
  is_verified: boolean = false;
  isRoomSelected: boolean = false;
  extra_selected: boolean = false;
  extra_price = [];
  service_fee: number = 0;
  showPropertyTypes: boolean = false;
  showAmenities: boolean = false;
  showServices: boolean = false;
  conversion_rate: any = '1';
  default_curr: string =  '₽';
  translated_Description: any;
  isDateClicked: boolean = false;
  singleRoom =[];
  action = "";

  constructor(private homeData: HomeService,private media: MediaMatcher, private http: HttpClient, public sanitizer: DomSanitizer, private connection: ConnectionService, private data: ProductService, private snackBar: SnackBarService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private formBuilder: FormBuilder, private translate: TranslateService, private cookieService: CookieService, private seo: SeoService, private meta: Meta, private location: Location, private titleName: Title, private pageTitleService: PageTitleService, private canonicalUrlService: CanonicalUrlService) {

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
      fromDate: '',
      toDate: '',
      adults: 1,
      children: 0
    });

  }

  ngOnInit() {

    console.log(this.filtered_website_language)
    this.action = `https://admin.nobitour.com/${this.filtered_website_language}/booking/addToNobiCart`
    this.getJsonData();
    this.valueAdults  = Number(localStorage.getItem('numberOfAdult'));
    this.valueChildren = Number(localStorage.getItem('numberOfChildren'));
    const storedFromDate = localStorage.getItem('fromDate');
    const storedToDate = localStorage.getItem('toDate');
    if (storedFromDate) {
      this.availabilityForm.controls['fromDate'].setValue(new Date(storedFromDate));
    }
    if (storedToDate) {
      this.availabilityForm.controls['toDate'].setValue(new Date(storedToDate));
    }

    if (this.valueAdults) {
      this.availabilityForm.controls['adults'].setValue(this.valueAdults);
    }
    if (this.valueChildren) {
      this.availabilityForm.controls['children'].setValue(this.valueChildren);
    }

    if (localStorage.getItem('ipUserCountry') === null) {
      this.getIpAddress();
    }
    // this.get_currency_logic(this.connection, this.homeData);
    
    const curr = localStorage.getItem('currency')
    if (curr == 'amd') {
      this.default_curr = '֏';
    } else if (curr == 'bgn') {
      this.default_curr = 'лв';
    }
    else if (curr == 'rub') {
      this.default_curr = '₽';
    }

    this.homeData.get_rate(curr).subscribe(
      homeData =>{
        if(curr == "amd" || curr == "rub" || curr == "bgn"){
          this.conversion_rate = homeData.rate;
        }
        if(homeData.rate == null){
          this.default_curr = '€';
          this.conversion_rate = '1';
          this.showConvertedPrice = true; 
        }
      }
    )

    this.token = localStorage.getItem("token")
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
    setTimeout(() => {
      window.scrollTo({ top:500, behavior: 'smooth' });

    }, 1000);

    this.twitterHref = 'https://twitter.com/intent/tweet?text=' + window.location.href;


    this.href = window.location.href;


    this.routeSub = this.route.params.subscribe(params => {
      this.productType = params['product'];
      this.productIdAndSlug = params['idSlug'];
      let splitProductUrl = this.productIdAndSlug.split("-");

      if (splitProductUrl[0] == "a") {
        this.newProductId = splitProductUrl[1];
        this.inUrlPartnerId = "a-";
        this.showMTData = false;
        this.isAgoda = true;
      } else {
        this.newProductId = splitProductUrl[0];
        this.inUrlPartnerId = "";
        this.showMTData = true;
        this.hotel_id = Number(splitProductUrl[0]);
      }
    });

    this.productType = 'estate';
    if(this.inUrlPartnerId != 'a-'){
      this.isRoomSelected = false;
      const fromDate = localStorage.getItem('fromDate');
      const toDate = localStorage.getItem('toDate');
      const adults = localStorage.getItem('numberOfAdult');
      const children = localStorage.getItem('numberOfChildren');
  
      const toDateObj = new Date(toDate);
      const fromDateOjb = new Date(fromDate)

  
  
      const updatedToDate = toDateObj.toISOString().slice(0, 10);
      const updatedFromDate = fromDateOjb.toISOString().slice(0, 10)
  
      this.children_add_to_cart = children;
      this.adults_add_to_cart = adults;
      this.from_add_to_cart = updatedFromDate;
      this.to_add_to_cart = updatedToDate;
      this.is_able_to_book = true;
    this.data.checkAvailability(this.hotel_id, updatedFromDate, updatedToDate, adults, children, false).subscribe(
        data => {
          this.data_for_rooms = data
          if(this.data_for_rooms.rooms[0].terms ===null){
            this.showTerms = false;
          }
          console.log(this.data_for_rooms.rooms[0].terms, 192834712948379)
          console.log(this.data_for_rooms.rooms[0].terms[33].child)
          for(let i = 0; i <this.data_for_rooms.rooms.length; i++){
            this.singleRoom.push(this.data_for_rooms.rooms[i].terms)
            console.log(1)
            console.log(this.data_for_rooms.rooms[i].terms)
          }
          setTimeout(() => {
            console.log(this.singleRoom)

          }, 1000);
        }
      )

      const currentDomain = window.location.hostname;
  
  
      if (currentDomain === 'nobitour.ru') {
        this.default_curr = '₽';
      }
      
    }
    


    this.getEstateData();

    this.createFilterDateForms();
    this.createForms();


    
    this.translate.get('partnerAddRestaurantSnackBar').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });


    this.full_url_for_filtering = this.location.path();
    let splitUrl = this.full_url_for_filtering.split('/');
    this.filtered_website_language = splitUrl[1];


    this.filtered_url_slug = splitUrl[5];

    this.postUrl = encodeURI(document.location.href);
    this.postTitle = encodeURI("Hi everyone, please check this out: ");
    setTimeout(() => {
      this.is_verified = this.header.is_verified;
    }, 5000);


  }
  // onCurrencyDataReceived(currencyData){
  //   localStorage.setItem('currency', currencyData);
  //   this.get_currency_logic(this.connection, this.homeData);
  // }
  
  
  onShowLoader(value: boolean) {
    this.showLoader = value;
  }


  range(max: number): number[] {
    return Array(max + 1).fill(0).map((x, i) => i);
  }

  updateTotalPrice(room) {
    this.totalPrice = 0;
    this.isRoomSelected = true;
    for (let room of this.data_for_rooms.rooms) {
      this.totalPrice += room.number_selected * room.price;
    }
    for (let extra of this.extra_price) {
      if (extra.selected) {
        this.extra_selected = true;
        this.totalPrice += Number(extra.price);
      }
    }
    if (this.totalPrice === 0) {
      this.isRoomSelected = false;
    }
    room.roomTotalPrice = room.number_selected * room.price;
    for (let extra of this.extra_price) {
      if (extra.selected) {
        this.extra_selected = true;
        this.totalPrice += Number(extra.price);
      }
    }
  }


  // openGalleryDialog(gallery: any[], terms: any[], title: string) {
  //   this.dialog.open(ImageGalleryDialogComponent, {
  //     data: { gallery, terms, title }
  //   });

  // }

  openGalleryDialog(room: any[], title: string) {
    this.dialog.open(ImageGalleryDialogComponent, {
      data: { room: room, title }
    });
    console.log(123)
  }
  


  getTotalPrice(room: any) {
    return room.total_price;
  }

  get_currency_logic(conn, data){
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
          if(data.rate == null || data.error){
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
              this.showConvertedPrice = true;

            }
          },
          error => {
            this.default_curr = '€';
            this.conversion_rate = '1';
          }
        )
      })
    }
  }

  onCheckAvailability() {
    this.isRoomSelected = false;
    const fromDate = this.availabilityForm.get('fromDate').value
    const toDate = this.availabilityForm.get('toDate').value;
    const adults = this.availabilityForm.get('adults').value;
    const children = this.availabilityForm.get('children').value;

    const toDateObj = new Date(toDate);
    const fromDateOjb = new Date(fromDate)

    if(this.isDateClicked){
      toDateObj.setDate(toDateObj.getDate() + 1);
      fromDateOjb.setDate(fromDateOjb.getDate() + 1)
    }


    const updatedToDate = toDateObj.toISOString().slice(0, 10);
    const updatedFromDate = fromDateOjb.toISOString().slice(0, 10)

    this.children_add_to_cart = children;
    this.adults_add_to_cart = adults;
    this.from_add_to_cart = updatedFromDate;
    this.to_add_to_cart = updatedToDate;
    this.is_able_to_book = true;
    this.data.checkAvailability(this.hotel_id, updatedFromDate, updatedToDate, adults, children, false).subscribe(
      data => {
        this.data_for_rooms = data
      }
    )
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  saveCurrentUrl() {
    const current_path = this.location.path();
    localStorage.setItem('go_to_this_location', current_path)
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

  getJsonData() {
    const script = document.createElement('script');
    script.src = 'https://admin.nobitour.com/getAdminData/js';
    script.setAttribute('crossorigin', 'use-credentials');
    console.log('test')
    script.onload = () => {
      const json = (window as any).json;
      const jsonData = JSON.parse(json)


      this.token = jsonData.token
      console.log(this.token, ' this token')

      if (jsonData.user.name !== null) {
        this.isLoggedIn = true;

        this.is_verified = jsonData.user.is_verified;
      }
    }
    document.body.appendChild(script);
    
  }


  
  createFilterDateForms() {
    this.filterFormGroup = this.formBuilder.group({
      keywordSearch: [''],
      checkInForm: [''],
      checkOutForm: [''],
      countryISO: [''],
      numberOfAdult: [2],
      numberOfChildren: [0]
    });
  }


  handlePlusChildren() {
    this.enableChildren = true;
    this.filterFormGroup.patchValue({
      numberOfChildren: this.filterFormGroup.controls.numberOfChildren.value + 1
    });
  }
  handlePlusAdults() {
    this.enableAdult = true;
    this.filterFormGroup.patchValue({
      numberOfAdult: this.filterFormGroup.controls.numberOfAdult.value + 1
    });
  }
  handleMinusAdult() {
    if (this.filterFormGroup.controls.numberOfAdult.value <= 1) {
      this.enableAdult = false;
    } else {

      this.filterFormGroup.patchValue({
        numberOfAdult: this.filterFormGroup.controls.numberOfAdult.value - 1
      });

    }
  }
  handleMinusChildren() {
    if (this.filterFormGroup.controls.numberOfChildren.value < 1) {
      this.enableChildren = false;
    } else {

      this.filterFormGroup.patchValue({
        numberOfChildren: this.filterFormGroup.controls.numberOfChildren.value - 1
      });

    }
  }

  toggleGuests() {
    this.showGuests = !this.showGuests;
  }

  incrementAdults() {
    this.adults++;
  }

  decrementAdults() {
    this.adults--;
  }

  incrementChildren() {
    this.children++;
  }

  decrementChildren() {
    this.children--;
  }



 

  createForms() {

    this.bookingFormGroup = this.formBuilder.group({
      checkin: [''],
      checkout: ['']
    });

  }

  translateText(text: string, targetLanguage: string) {
    const apiKey = 'AIzaSyB-k4ohUZYjnHODXOZ3k6h1WMkv46eiX3Q';
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
    const requestPayload = {
      q: text,
      target: targetLanguage
    };
  
    this.http.post(apiUrl, requestPayload).subscribe(
      (response: any) => {
        const translatedText = response.data.translations[0].translatedText;
        this.description = translatedText;
      },
      error => {
        console.error(error);
      }
    );
  }
  

  getEstateData() {
    this.data.getEstateData(this.inUrlPartnerId, this.newProductId, this.filtered_website_language).subscribe(
      data => {
        this.estate = data;

        this.content_MT = data.content;
        this.hotel_id = data.id;
        this.description = data.description;
        this.translateText(this.description, this.filtered_website_language)
        this.estateId = data.id;
        this.pageTitle = data.seo.pageTitle;
        this.countryName = data.country;
        this.extra_price = data.extra_price;
        if (data.service_fee !== null) {
          this.service_fee = data.service_fee;
        }
        this.imageURLs = this.estate.imageUrl;
        this.currentImage = this.imageURLs[this.imageURLs.length - 1]
        // this.currentImage = this.imageURLs[0];
        this.googleCoordinates = data.googleCoordinates;
        this.recommendedCities = data.recommendedCities;
        this.recommended_cities_mt_hl = data.recommendedCities;
        if (data.video != null) {
          this.videoAvailable = true;
          this.videoEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.video.replace("watch?v=", "embed/"));
        }
        this.metaDecription = data.seo.pageDescription;
        this.cityNameTranslated = data.city;
        this.cityName = data.city.toLowerCase();
        this.countryISO = data.countryISO.toLowerCase();
        this.checkInTimePolicy = data.check_in_time;
        this.checkOutTimePolicy = data.check_out_time;
        this.policies = data.policy;
        this.recommended_cities_mt_hl = data.recommendedCities;
        if (this.inUrlPartnerId == "a-") {
          this.amenities = data.amenities;
          this.rooms_HL = data.rooms;
          this.hotelUrl = data.outerLink;
          this.services = this.amenities.filter(item => item.group === 'Services');
        } else {
          this.isAgoda = false;
          this.showLoader = false;

          this.hotelUrl = data.seo.canonicalUrl;
          if(data.attributes[0]  != undefined){
            this.property_types = data.attributes[0].child;
            this.showPropertyTypes = true

          }
          if(data.attributes[1] != undefined){
            this.amenities = data.attributes[1].child;
            this.showAmenities = true

          }
          if(data.attributes[2] != undefined){
            this.services = data.attributes[2].child;
            this.showServices = true
          }
        }

        localStorage.setItem('city', this.cityName);
        localStorage.setItem('iso', this.countryISO);
        this.nameForTour = data.name;
        this.canonicalURL = data.seo.canonicalURL;
        if (data.highlights) {
          this.showHighlights = true;
        }
        if (data.partnerId == "a") {
          this.isHotelLook = true;
          if (data.arrival == null || data.leaving || null) {
            this.policies_available_HL = false;
          }
        }

        if(data.policy == null){
          this.policies_available_MT = false;
          this.policies_available_HL = true;
        }
        else if (data.policy.length > 0 ) {
          this.policies_available_MT = true;
          this.policies_available_HL = false;
        }
        if (this.description.length < 3) {
          this.showMTData = false;
        }


        if (data.placeId) {
          this.googlePlaceUrl = 'https://www.google.com/maps/embed/v1/place?q=place_id:' + data.placeId + '&key=AIzaSyBRPDMwE4mfxJmPYiF1_8rQ_ohaZ8rzP1Y';
        } else {
          this.googlePlaceUrl = 'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJW_FUNtNEwRkRjewxVg5NI7E&key=AIzaSyBRPDMwE4mfxJmPYiF1_8rQ_ohaZ8rzP1Y';
        }

        this.cookieService.set('title', data.seo.pageTitle);
        this.cookieService.set('description', data.seo.pageDescription);
        this.cookieService.set('url', data.seo.canonicalURL);

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
          this.showLoader = false;
        }
      });
  }

  selectImage(image) {
    this.currentImage = image;
  }
  scrollThumbnails(direction) {
    this.startIndex += direction;
    this.endIndex += direction;
    if (this.startIndex < 0) {
      this.startIndex = 0;


    } else if (this.endIndex >= this.imageURLs.length) {
      this.endIndex = this.imageURLs.length - 1;

    }
  }


  navigateToRecommendedCity(city, iso) {
    this.router.navigate([this.filtered_website_language + '/home/' + this.productType + "/" + city + "/" + iso + "/1"])
    // window.open('/' + this.filtered_website_language + '/home/' + this.productType + "/" + city.toLowerCase() + "/" + iso.toLowerCase() + "/1", "_blank")
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
    let localLang = localStorage.getItem('lang');

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

  changeCheckOutMin() {
    this.isDateClicked = true;
    const fromDateValue = this.availabilityForm.get('fromDate').value;
    const fromDate = new Date(fromDateValue);
    fromDate.setDate(fromDate.getDate() + 2);
    this.minDate = fromDate.toISOString().slice(0, 10);

    this.isRoomSelected = false;
    this.getJsonData();
    console.log('test')
  }

  bookingNextStep() {
    if (this.fromDate && this.toDate) {
      const checkin = this.bookingFormGroup.controls.checkin.value;
      const checkout = this.bookingFormGroup.controls.checkout.value;
      this.router.navigate(['reservation-estate-details/' + this.productId + '/' + checkin + '/' + checkout]);
    } else {
      this.snackBar.openSnackWrongBar(this.translateSnackBar.incorectlyFieldFill, this.translateSnackBar.close)
    }
  }
  changeChildrenAdult() {
    this.isRoomSelected = false;
  }

  handleMinusRoom() {
    if (this.valueRoom <= 1) {
      this.enableRoom = false;
    } else {
      this.valueRoom--;
    }
  }

  handlePlusRoom() {
    this.enableRoom = true;
    this.valueRoom++;
  }


  getIpAddress() {
    this.connection.getIPv4Address().subscribe(response => {
      this.ipAddress = response;
      this.ip_country_name = this.ipAddress.country_name;
      //session storage here
      localStorage.setItem('ipUserCountry', this.ip_country_name);
      if (this.ip_country_name == "Russia") {
        this.isRussianIp = true;
      }
    })
  }


  redirectTo() {

    if (this.isLoggedIn && this.inUrlPartnerId != "a-") {
      window.open(this.hotelUrl);
    }
    else if (this.inUrlPartnerId == "a-") {
      window.open('/redirect-to/' + this.currentLang + '/' + this.newProductId, '_blank');
    }
    else {

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = false;

      dialogConfig.data = {
        id: 1,
        title: 'Angular For Beginners'
      };

      this.dialog.open(DialogLoginRegComponent, dialogConfig);

    }

  }


  redirect(url) {
    window.open(`/redirect${url}}`)
  }

  backToSearchResults() {
    let cPage = localStorage.getItem('cPage')
    this.router.navigate([`${this.filtered_website_language}/home/estate/${this.cityName}/${this.countryISO}/${cPage}`]);
  }

}
