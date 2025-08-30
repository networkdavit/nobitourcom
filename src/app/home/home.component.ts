
import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HomeService } from '../services/home.service';
import { SnackBarService } from '../services/snackbar.service';
import * as moment from 'moment';
import { Observable, Subscription, from } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { PageTitleService } from '../services/page-title.service';
import { CanonicalUrlService } from '../services/canonical-url.service';
import { DialogCitynotfoundComponent } from '../dialog-citynotfound/dialog-citynotfound.component';
import { DialogError500popupComponent } from '../dialog-error500popup/dialog-error500popup.component';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';
import { ConnectionService } from '../services/connection.service';
import { DatePipe } from '@angular/common';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

interface WeatherForecast {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})

export class HomeComponent implements OnInit {
  city: string = '';
  citySearch: string;
  fromDateSearch: any;
  toDateSearch: any;
  adultCountSearch: number;
  childrenCountSearch: number;
  isoSearch: string;
  isEstate: boolean = false;
  isAdventure: boolean = false;
  show_search_bar: boolean = false;

  childrenCount: number = 0;
  adultCount: number = 2;
  starRatings: number[] = [1, 2, 3, 4, 5];
  selectedStarRatings: number[] = [];
  config: SwiperOptions = {
    slidesPerView: 7,
    spaceBetween: 30,
    navigation: {
      prevEl: '.partner-btn-prev',
      nextEl: '.partner-btn-next',
    },
    pagination: {
      el: '.partner-pagination',
      clickable: true
    },
    breakpoints: {
      0: {
        slidesPerView: 'auto'
      },
      500: {
        slidesPerView: 1
      },
      600: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      800: {
        slidesPerView: 4
      },
      900: {
        slidesPerView: 5
      },
      1000: {
        slidesPerView: 7
      }
    },
  };

  @ViewChild('resetFilterForm', {
    static: true
  }) resetFilterForm: NgForm;
  @ViewChild('usefulSwiperMenu', { static: false }) usefulSwiperMenu: SwiperComponent;


  showPeopleInputs = false;

  propertyTypes = ['Hotels, living quarters', 'Hostels, lodging houses', 'Apartments', 'Apartment hotels', 'Guesthouses', 'Cottages, villas, bungalows', 'Campgrounds', 'Glampings'];
  facilitiesAndServices = ['Free Internet', 'Transfer', 'Parking', 'Swimming Pool', 'Fitness centre', 'Bar or restaurant', 'Conference hall', 'Spa Services', 'Ski slope nearby', 'Beach nearby', 'Jacuzzi', 'Electric car charging'];
  accommodationFeatures = ['Air-conditioning', 'Private Bathroom', 'Kitchen', 'Balcony'];
  accommodationOptions = ['Suitable for children', 'For guests with disabilities', 'Pets allowed', 'Smoking allowed'];

  coordinates = [];

  filterFormGroup: FormGroup;
  weatherForecast: WeatherForecast[] = [];
  today: WeatherForecast;
  remainingForecast: WeatherForecast[];

  image: any;
  newProductId = "";
  breakpoint: number;
  showSearchField: boolean;
  clientId: string;

  showLoader: boolean = false;
  showLoaderForSearch: boolean = false;

  freeDates: string[] = [];

  limit: number = 24;
  offset: number = 0;
  cPage: number = 1;
  totalResult: number;

  search: string = '';
  fromPrice: any = '';
  toPrice: any = '';
  fromDate: any = '';
  cityLat = 40.7128;
  cityLng = -74.0060;
  mapZoom = 10;
  toDate: any = '';
  guests: number;
  formattedDateFrom: any;
  formattedDateTo: any;
  productType: string;
  language: string = this.cookieService.get('currentLang');
  keywordSearch: string = '';
  countryISO: any = '';
  cityId: any = '';
  searchKey: string;
  showWeather: boolean = false;
  private routeSub: Subscription;
  underMaitenance: boolean = false;
  prevScrollpos: number;
  currentScrollPos: number;
  hideOnScroll: boolean = true;
  hideTextInNavigation: boolean;
  navigationHeight: number = 80;
  dropdownOpen: boolean = false;

  minDate: Date = new Date();
  checkoutMinDate: Date;
  minToDate: Date;

  showFlights: boolean;
  showInsurance: boolean;
  showCars: boolean;
  showEstates: boolean;
  showAdventures: boolean;
  showAviaBusRUssia: boolean;
  showPersonalTransfer: boolean;
  showEstatesRu: boolean;
  showAdventuresRu: boolean;
  showWhiteLabelMessageForRussia: boolean;
  conversion_rate: any = '1';

  showConvertedPrice: boolean = false;
  autoTicks = true;
  tripster_city_id: number;
  showTicks = true;
  step = 1;
  value = 0;
  default_curr: string =  '₽';

  enableAdult = true;
  enableChildren = true;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  adventure: any = { city: '' };
  adventureProucts: any = '';
  estate: any = { city: '' };
  estateProucts: any = '';
  restaurant: any = { city: '' };
  restaurantProucts: any = '';
  nobiCities: any;
  tiqetsAdventureCities: any;
  keyword: string = '';
  selectedPriceSortOption: string = 'default';
  selectedStarsSortOption: string = 'default';
  cityNotFoundText: boolean = false;

  isSelected: boolean = false;
  productCity: any;

  city_name_url_search: string = "";

  full_url_for_filtering: string;
  filtered_url_city: string;
  filtered_url_countryISO: string;
  filtered_city_and_countryISO: string;
  filtered_website_language: string;
  filtered_product_type: string;
  filtered_page_number: any;

  pageTitle: string;
  pageDescription: string;
  canonicalURL: string;
  isCityFiltered: boolean = false;
  isEstateTranslated: boolean = false;
  isAdventureTranslated: boolean = false;
  countryName: string;
  cityName: string;
  idSlug: string;
  cities_have_results: boolean = false;

  recommendedEstatesHeader: boolean = false;
  recommendedAdventuressHeader: boolean = false;


  estateRuRecommendedCities = []
  estateRuShowRandomCity = []
  estateRuRecommendedFinalList = []
  is_device_mobile: boolean = false;

  allEstates: any[] = [];
  rateHawkEstates: any;
  originalEstateData: any[] = [];
  allAdventures: any[] = [];
  autofilled_city: any;
  pageSize = 24;
  startIndex = 0;
  endIndex = this.pageSize;
  page_count = [];
  currentPage
  isMtEstate: boolean = false;
  isMyAdventure: boolean = false;

  prog_bar_value: number = 0;
  total_pages_count: number;
  nobiarts_recommended_items = [];
  adultCountForInput: any
  childreCountForInput: any

  suggestedCities = [
    { name: 'Paris', countryIso: 'fr' },
    { name: 'London', countryIso: 'gb' },
    { name: 'Paris', countryIso: 'fr' },
    { name: 'Paris', countryIso: 'fr' },
    { name: 'Paris', countryIso: 'fr' }
  ];

  constructor(private datePipe: DatePipe, private connection: ConnectionService, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, private data: HomeService, private dialog: MatDialog, private snackBar: SnackBarService, private router: Router, private route: ActivatedRoute, private cookieService: CookieService, private formBuilder: FormBuilder, private meta: Meta, private location: Location, private titleName: Title, private pageTitleService: PageTitleService, public translate: TranslateService, private canonicalUrlService: CanonicalUrlService) {
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.setFilteredDataBasedOnUrl(location);
        this.translate.setDefaultLang(this.language);
      } else {
        this.full_url_for_filtering = 'Home';
      }
    });
    this.minDate.setHours(0, 0, 0, 0);
  }
  onFromDateChange() {
    // Set the minimum date for the 'toDate' input to the next day after 'fromDate'
    if (this.fromDateSearch) {
      this.minToDate = new Date(this.fromDateSearch);
      this.minToDate.setDate(this.minToDate.getDate() + 1);
    }
  }
  getMarginValue(): string {
    return this.isAdventure ? '40vh' : '30vh';
  }

  ngOnInit(): void {
    const fromDateStorage = localStorage.getItem('fromDate');
    const toDateStorage = localStorage.getItem('toDate');

    // Parse the dates if they exist in localStorage
    if (fromDateStorage) {
      this.fromDateSearch = fromDateStorage;
    }

    if (toDateStorage) {
      this.toDateSearch = toDateStorage;
    }
    this.adultCountForInput = localStorage.getItem('numberOfAdult')
    this.childreCountForInput = localStorage.getItem('numberOfChildren')
    // console.log(localStorage.getItem('numberOfAdult'), 'test')
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Do something when navigation ends
        if (event.url.includes('estate')) {
          this.isEstate = true;
          this.isAdventure = false;
        }
        else if (event.url.includes('adventure')) {
          this.isAdventure = true;
          this.isEstate = false;
        }
        else {
          this.isAdventure = false;
          this.isEstate = false;
        }
      }
    });

    // if (localStorage.getItem("city")) {
    //   this.citySearch = localStorage.getItem("city")
    // }
    this.fetchWeatherData();
    this.checkoutMinDate = new Date();
    this.get_currency_logic(this.connection, this.data);

    this.showLoader = true;
    if (this.location.path().includes('estate')) {
      this.isEstate = true;
      this.isAdventure = false;
    }
    else if (this.location.path().includes('adventure')) {
      this.isAdventure = true;
      this.isEstate = false;
    }
    else {
      this.isAdventure = false;
      this.isEstate = false;
    }
    setTimeout(() => {
      // this.showLoader = false;
      window.scrollTo({ top: 700, behavior: 'smooth' });

    }, 1000);

    this.route.paramMap.subscribe(params => {
      this.currentPage = +params.get('page');
    });
    this.is_device_mobile = this.detectMob()
    this.createForms();



    let cityLocal = localStorage.getItem('city');
    let fromDateSession = localStorage.getItem('fromDate');
    let toDateSession = localStorage.getItem('toDate');
    this.autofilled_city = localStorage.getItem('city');

    if (this.autofilled_city && this.autofilled_city.trim() !== '') {
      this.citySearch = this.autofilled_city;
    }    const today = new Date();
    const defaultFrom = new Date(today);
    const defaultTo = new Date(defaultFrom);
    defaultFrom.setDate(defaultFrom.getDate() + 14);
    defaultTo.setDate(defaultTo.getDate() + 15);
    let defaultFromDate = moment(defaultFrom).format("YYYY-MM-DD");
    let defaultToDate = moment(defaultTo).format("YYYY-MM-DD");


    this.startIndex = (this.filtered_page_number - 1) * this.pageSize;
    if (fromDateSession != null && toDateSession != null) {
      this.fromDate = fromDateSession;
      this.toDate = toDateSession;
    }
    else {
      this.fromDate = defaultFromDate;
      this.toDate = defaultToDate;
      localStorage.setItem('fromDate', defaultFromDate);
      localStorage.setItem('toDate', defaultToDate);
    }

    if (this.myControl.value == null) {
      this.myControl.patchValue(cityLocal)
    }



    this.clientId = this.cookieService.get('clientId');

    this.routeSub = this.route.params.subscribe(params => {
      this.searchKey = params['searchKey'];
      if (this.location.path().length < 19) {
        this.full_url_for_filtering = this.location.path();
        let splitUrl = this.full_url_for_filtering.split('/');
        this.productType = splitUrl[3];
      }
      else {
        this.productType = this.searchKey;
      }

      this.full_url_for_filtering = this.location.path();
      let splitUrl = this.full_url_for_filtering.split('/');
      let cityAddToLocalStorage = splitUrl[4];
      let isoAddToLocalStorage = splitUrl[5]
      if (cityAddToLocalStorage !== undefined) {
        localStorage.setItem('city', cityAddToLocalStorage)
        localStorage.setItem('iso', isoAddToLocalStorage)
      }


      this.city_name_url_search = this.keywordSearch;
      if (this.productType == '') {
        this.productType = '';
        this.underMaitenance = true;
        this.showCars = false;
        this.showFlights = false;
        this.showInsurance = false;
        this.showPersonalTransfer = false;
        this.showLoader = false;
        this.showAviaBusRUssia = false;
        this.showEstatesRu = false;
        this.showAdventuresRu = false;
        this.show_search_bar = false;


      } else if (this.productType == 'flight') {
        this.showFlights = true;
        this.showCars = false;
        this.showInsurance = false;
        this.showPersonalTransfer = false;
        this.showLoader = false;
        this.showAviaBusRUssia = false;
        this.showEstatesRu = false;
        this.showAdventuresRu = false;
        this.show_search_bar = false;

      } else if (this.productType == 'insurance') {
        this.showInsurance = true;
        this.showCars = false;
        this.showFlights = false;
        this.showPersonalTransfer = false;
        this.showLoader = false;
        this.showEstates = false;
        this.showEstatesRu = false;
        this.showAviaBusRUssia = false;
        this.showAdventuresRu = false;
        this.show_search_bar = false;

      } else if (this.productType == 'rent-a-car') {
        this.showCars = true;
        this.showFlights = false;
        this.showPersonalTransfer = false;
        this.showInsurance = false;
        this.showLoader = false;
        this.showAviaBusRUssia = false;
        this.showEstatesRu = false;
        this.showAdventuresRu = false;
        this.show_search_bar = false;

      } else if (this.productType == 'personal-transfer') {
        this.showPersonalTransfer = true;
        this.showFlights = false;
        this.showCars = false;
        this.showInsurance = false;
        this.showAviaBusRUssia = false;
        this.showLoader = false;
        this.showEstates = false;
        this.showEstatesRu = false;
        this.showAdventuresRu = false;
        this.show_search_bar = false;

      } else if (this.productType == 'avia-bus-russia') {
        this.showPersonalTransfer = false;
        this.showFlights = false;
        this.showCars = false;
        this.showInsurance = false;
        this.showAviaBusRUssia = true;
        this.showLoader = false;
        this.showEstates = false;
        this.showEstatesRu = false;
        this.showAdventuresRu = false;
        this.show_search_bar = false;

      } else if (this.productType == 'estateRu') {
        this.showPersonalTransfer = false;
        this.showFlights = false;
        this.showCars = false;
        this.showInsurance = false;
        this.showLoader = false;
        this.showEstates = false;
        this.showEstatesRu = true;
        this.showAviaBusRUssia = false;
        this.showAdventuresRu = false;
        this.show_search_bar = false;

      } else if (this.productType == 'adventureRu') {
        this.showPersonalTransfer = false;
        this.showFlights = false;
        this.showCars = false;
        this.showInsurance = false;
        this.showLoader = false;
        this.showEstates = false;
        this.showAviaBusRUssia = false;
        this.showEstatesRu = false;
        this.showAdventuresRu = true;
      } else if (this.productType == 'estate' || this.productType == 'restaurant' || this.productType == 'adventure') {
        this.showEstates = true;
        this.showCars = false;
        this.showFlights = false;
        this.showPersonalTransfer = false;
        this.showInsurance = false;
        this.showAviaBusRUssia = false;
        this.underMaitenance = false;
        this.showEstatesRu = false;
        this.showAdventuresRu = false;
        this.show_search_bar = false;

        this.show_search_bar = true;
      }

      if (this.location.path().length > 20) {
        this.isCityFiltered = true;
      }

      if (this.productType === 'estate') {
        this.isEstateTranslated = true;
        this.isAdventureTranslated = false;
        this.isMtEstate = true;
        this.isMyAdventure = false;
        let fromDateForApi = localStorage.getItem('fromDate');
        let toDateForApi = localStorage.getItem('toDate');
        this.getRateHawkHotels(fromDateForApi, toDateForApi, this.filtered_website_language, localStorage.getItem('city'), localStorage.getItem('iso'), this.filterFormGroup.controls.numberOfAdult.value, this.filterFormGroup.controls.numberOfChildren.value)

        if (this.allEstates.length < 1) {

          let fromDateForApi = localStorage.getItem('fromDate');
          let toDateForApi = localStorage.getItem('toDate');
          this.getMyTravelEstates(fromDateForApi, toDateForApi, this.filtered_website_language, this.keywordSearch, this.countryISO, this.filterFormGroup.controls.numberOfAdult.value, this.filterFormGroup.controls.numberOfChildren.value)
          // console.log('oninitversion')
        }

      }
      else if (this.productType === 'adventure') {
        this.isAdventureTranslated = true;
        this.isEstateTranslated = false;
        this.isMtEstate = false;
        this.isMyAdventure = true;
        if (this.allAdventures.length < 1) {
          this.getTripsterCityId(localStorage.getItem('city'));
          setTimeout(() => {
            this.getMyTravelAdventures(this.filtered_website_language, this.keywordSearch, this.countryISO, this.filterFormGroup.controls.numberOfAdult.value, this.filterFormGroup.controls.numberOfChildren.value)
            this.getTripsterAdventures(this.tripster_city_id, this.fromDate, this.toDate, 3);
          }, 2000);
        }
      }


    });


    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;

    this.showSearchField = false;
    if (this.productType != 'flight' && this.productType != 'rent-a-car' && this.productType != 'insurance' && this.productType != 'personal-transfer' && this.productType != 'estateRu' && this.productType != 'adventureRu' && this.productType != 'avia-bus-russia') {

    }


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),

    );
    this.run_prog_bar();
    this.nobiarts_recommended_items = [
      {
        name: "35L Outdoor Backpack",
        url: "https://nobiarts.com/classifieds/sporting-goods/camping/35l-outdoor-backpack-men-women-waterproof-travel-trekking-backpack-climbing-hiking-camping-rucksack-tactical-sports-bags-232458.html",
        img: "https://nobiarts.com/files/05-2023/ad232458/35l-outdoor-backpack-men-women-waterproof-tra-388228651__large.jpg",
        price: 26.06
      },
      {
        name: "BlitzWolf® BW-HP5 bluetooth Headset",
        url: "https://nobiarts.com/classifieds/electronics-n-home-appliance/audio-video/blitzwolf-r-bw-hp5-bluetooth-headset-anc-headphone-dual-active-noise-canceling-dual-drivers-1000mah-aac-stereo-wireless-h-224718.html",
        img: "https://nobiarts.com/files/04-2023/ad224718/blitzwolf-r-bw-hp5-bluetooth-headset-anc-hea-2074086053__large.jpg",
        price: 46.77
      },
      {
        name: "Men's Vintage Yellowstone Western Print Cap",
        url: "https://nobiarts.com/classifieds/clothing-and-shoes/hats/men-s-vintage-yellowstone-western-print-cap-227683.html",
        img: "https://nobiarts.com/files/04-2023/ad227683/men-s-vintage-yellowstone-western-print-cap-1778075778__large.jpg",
        price: 9.30
      }
    ]

    setTimeout(() => {
      // console.log(this.allEstates, 'allestate')

    }, 5000);


    // if(this.location.path().split('/')[5]){
    //   // this.showLoader = true;
    //   setTimeout(() => {
    //     this.showLoader = true;
    //   }, 3000);
    //   setTimeout(() => {
    //     this.showLoader = false;
    //   }, 9000);
    // }
    
    const currentDomain = window.location.hostname;
  
  
    if (currentDomain === 'nobitour.ru') {
      this.default_curr = '₽';
    }
  }

  onCurrencyDataReceived(currencyData) {
    localStorage.setItem('currency', currencyData);
    this.get_currency_logic(this.connection, this.data);
  }

  stripDecimals(price: number): string {
    return Math.floor(price).toString();
  }

  run_prog_bar() {
    let interval;
    let product_type_for_prog_bar = this.filtered_product_type;
    if (this.filtered_product_type !== this.productType) {
      product_type_for_prog_bar = this.productType;
    }
    if (product_type_for_prog_bar === 'estate') {
      interval = 250;
    } else {
      interval = 70;
    }
    const prog_interval = setInterval(() => {
      this.prog_bar_value += 1;
      if (this.prog_bar_value >= 100) {
        this.prog_bar_value = 100;
        clearInterval(prog_interval)
      }
    }, interval);
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
        const country = response.country;
        console.log('123456')
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



  handleHeaderAndCarouselEvent(event: any): void {
    this.goToHome(event)
  }

  ngAfterViewInit() {
    if (this.productType != 'flight' && this.productType != 'rent-a-car' && this.productType != 'insurance' && this.productType != 'personal-transfer' && this.productType != 'estateRu' && this.productType != 'adventureRu' && this.productType != 'avia-bus-russia') {
    }

    
  }

  onShowLoader(value: boolean) {
    this.showLoader = value;
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

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  createForms() {
    this.filterFormGroup = this.formBuilder.group({
      keywordSearch: [''],
      checkIn: [''],
      checkOut: [''],
      countryISO: [''],
      numberOfAdult: [2],
      numberOfChildren: [0]
    });
  }

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
  }

  onCheckForProduct(productType) {
    this.goToHome(productType);
  }

  setKeywordToCityAndIso(productCity, countryIso, cityId) {
    this.cityId = cityId;
    this.keywordSearch = productCity;
    this.countryISO = countryIso;
    this.isSelected = true;

    this.myControl.patchValue(this.keywordSearch);

  }



  isSelectedFalse() {
    this.isSelected = false;
  }



  goToHome(productType: string) {
    this.showLoader = true;

    this.productType = productType;
    this.prog_bar_value = 0;
    this.run_prog_bar();


    if (this.productType == '') {
      this.productType = '';
      this.underMaitenance = true;
      this.showCars = false;
      this.showFlights = false;
      this.showAviaBusRUssia = false;
      this.showPersonalTransfer = false;
      this.showInsurance = false;
      // this.showLoader = false;
      this.showEstatesRu = false;
      this.showAdventuresRu = false;
    } else if (this.productType == 'flight') {
      this.showFlights = true;
      this.showPersonalTransfer = false;
      this.showCars = false;
      this.showInsurance = false;
      this.showAviaBusRUssia = false;
      // this.showLoader = false;
      this.showEstatesRu = false;
      this.showAdventuresRu = false;
    } else if (this.productType == 'rent-a-car') {
      this.showCars = true;
      this.showFlights = false;
      this.showPersonalTransfer = false;
      this.showAviaBusRUssia = false;
      this.showInsurance = false;
      // this.showLoader = false;
      this.showEstatesRu = false;
      this.showAdventuresRu = false;
    } else if (this.productType == 'insurance') {
      this.showInsurance = true;
      this.showCars = false;
      this.showPersonalTransfer = false;
      this.showFlights = false;
      this.showAviaBusRUssia = false;
      // this.showLoader = false;
      this.showEstatesRu = false;
      this.showAdventuresRu = false;
    } else if (this.productType == 'personal-transfer') {
      this.showPersonalTransfer = true;
      this.showFlights = false;
      this.showCars = false;
      this.showInsurance = false;
      this.showAviaBusRUssia = true;
      // this.showLoader = false;
      this.showAviaBusRUssia = false;
      this.showEstates = false;
      this.showEstatesRu = false;
      this.showAdventuresRu = false;
    } else if (this.productType == 'avia-bus-russia') {
      this.showPersonalTransfer = false;
      this.showFlights = false;
      this.showCars = false;
      this.showInsurance = false;
      this.showAviaBusRUssia = true;
      // this.showLoader = false;
      this.showEstatesRu = false;
      this.showAdventuresRu = false;
    } else if (this.productType == 'estateRu' && !this.is_device_mobile) {
      this.showPersonalTransfer = false;
      this.showFlights = false;
      this.showCars = false;
      this.showInsurance = false;
      // this.showLoader = false;
      this.showAviaBusRUssia = false;
      this.showEstatesRu = true;
      this.showAdventuresRu = false;
    } else if (this.productType == 'adventureRu') {
      this.showPersonalTransfer = false;
      this.showFlights = false;
      this.showCars = false;
      this.showInsurance = false;
      this.showAviaBusRUssia = false;
      // this.showLoader = false;
      this.showEstatesRu = false;
      this.showAdventuresRu = true;

    } else if (this.productType == 'estate' || this.productType == 'restaurant' || this.productType == 'adventure') {
      this.showEstates = true;
      this.showCars = false;
      this.showFlights = false;
      this.showPersonalTransfer = false;
      this.showInsurance = false;
      this.showAviaBusRUssia = false;
      this.underMaitenance = false;
      this.showEstatesRu = false;
      this.showAdventuresRu = false;
      this.limit = 24;
      this.offset = 0;
      this.cPage = 1;
    }

    if (this.productType == 'estate' || this.productType == 'estateRu' || this.productType == 'adventure' || this.productType == 'adventureRu') {
      this.showWhiteLabelMessageForRussia = true;
    }


    let cityLocal = localStorage.getItem('city');
    let capitalizedCitLocal = cityLocal.charAt(0).toUpperCase() + cityLocal.slice(1);
    let isoLocal = localStorage.getItem('iso');
    this.myControl.patchValue(capitalizedCitLocal);
    this.keywordSearch = cityLocal;
    this.countryISO = isoLocal;

    if (this.keywordSearch === undefined && this.countryISO === undefined) {
      this.keywordSearch = 'sofia';
      this.countryISO = 'bg';
    }


    if (this.productType == 'adventure') {
      this.isMtEstate = false;
      this.isMyAdventure = true;

    }
    else if (this.productType == 'estate') {
      this.isMtEstate = true;
      this.isMyAdventure = false;
    }

    if (this.productType == 'estateRu' && this.is_device_mobile) {
      window.open('https://hotels.nobitour.com', '__blank')
    }
    else if (this.productType == ' estate') {
      this.isMtEstate = true;
      this.isMyAdventure = false;

    }
    else if (this.productType != 'flight' && this.productType != 'rent-a-car' && this.productType != 'insurance' && this.productType != 'personal-transfer' && this.productType != 'estateRu' && this.productType != 'adventureRu' && this.productType != 'avia-bus-russia' && this.productType != 'estate') {
      //one of them
      this.isMtEstate = false;
      this.isMyAdventure = true;



    }
    else if (this.productType == 'flight' || this.productType == 'rent-a-car' || this.productType == 'insurance' || this.productType == 'personal-transfer' || this.productType == 'estateRu' || this.productType == 'adventureRu' || this.productType == 'avia-bus-russia') {
      this.router.navigate([this.filtered_website_language + '/home/' + this.productType]);
    }
    this.showLoader = true;

    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.estateProucts.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  getByKeyword(event: any) {
    this.showLoaderForSearch = true;
    const inputValue = event.target.value;
    if (inputValue.length > 2) {
      this.onGetByKeyword(inputValue);
      this.city_name_url_search = inputValue;
    } else {
      this.clearAllProducts();
    }
    setTimeout(() => {
      this.showLoaderForSearch = false;
    }, 500);
  }

  onGetByKeyword(keyword) {
    if (this.productType == 'estate') {
      this.data.requestOnServer(keyword).subscribe(
        data => {
          this.clearAllProducts();
          if (data != null) {
            this.nobiCities = data.data;
            // console.log(data, 'data')
            this.isoSearch = data.data[0].countryIso
          } else {
            this.clearAllProducts();
          }
        }
      );
    } else if (this.productType == 'adventure') {
      this.data.requestOnServer(keyword).subscribe(
        data => {
          this.clearAllProducts();
          if (data != null) {
            this.nobiCities = data.data;
            this.isoSearch = data.data[0].countryIso
          } else {
            this.clearAllProducts();
          }
        }
      );
    }
  }


  filterProducts() {
    this.cPage = 1;
    this.prog_bar_value = 0;
    this.run_prog_bar();

    let today = new Date();
    let today_validate = moment(today).format("YYYY-MM-DD");
    let fromDateForApi = moment(this.fromDate).format("YYYY-MM-DD");
    //session storage here until 710
    localStorage.setItem('fromDate', fromDateForApi);
    let toDateForApi = moment(this.toDate).format("YYYY-MM-DD");
    localStorage.setItem('toDate', toDateForApi);
    let numberOfAdultForApi = this.filterFormGroup.controls.numberOfAdult.value;
    localStorage.setItem('numberOfAdult', numberOfAdultForApi);
    let numberOfChildrenForApi = this.filterFormGroup.controls.numberOfChildren.value
    localStorage.setItem('numberOfChildren', numberOfChildrenForApi);
    if (this.productType == 'estate') {
      this.getMyTravelEstates(fromDateForApi, toDateForApi, this.filtered_website_language, this.keywordSearch, this.countryISO, this.filterFormGroup.controls.numberOfAdult.value, this.filterFormGroup.controls.numberOfChildren.value)

    }
    else if (this.productType == 'adventure') {
      this.getMyTravelAdventures(this.filtered_website_language, this.keywordSearch, this.countryISO, this.filterFormGroup.controls.numberOfAdult.value, this.filterFormGroup.controls.numberOfChildren.value)

    }


    if ((fromDateForApi.length === 10 && fromDateForApi >= today_validate) && (toDateForApi.length === 10 && toDateForApi >= today_validate)) {
      this.fromDate = localStorage.getItem('fromDate');
      this.toDate = localStorage.getItem('toDate');
    }
    else {
      this.fromDate = '';
      this.toDate = '';
      localStorage.setItem('fromDate', this.fromDate);
      localStorage.setItem('toDate', this.toDate);
    }
    this.getCityForUrl()
    this.showLoader = true;
    this.fetchWeatherData();
    if (!this.isSelected) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.myControl.value)}&key=AIzaSyBRPDMwE4mfxJmPYiF1_8rQ_ohaZ8rzP1Y`)
        .then(response => response.json())
        .then(data => {

          let iso = '';
          if (data.results && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            const countryComponent = addressComponents.find(component =>
              component.types.includes('country')
            );
            if (countryComponent) {
              iso = countryComponent.short_name;
            }
          }
          if (this.location.path().length > 16 && this.location.path().length < 45) {
            setTimeout(() => {
              location.reload();
            }, 200);
          }
          this.router.navigate([this.filtered_website_language + '/home/estate/' + this.myControl.value.toLowerCase() + '/' + iso.toLowerCase() + "/1"])
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }


  navigateToRecommendedCity(city, iso) {
    window.open('/' + this.language + '/home/' + this.productType + "/" + city.toLowerCase() + "/" + iso + "/1", "_blank")
  }

  navigateFromEstateRu(city, iso) {
    window.open('/' + this.language + '/home/estate/' + city.toLowerCase() + "/" + iso + "/1", "_blank")
  }


  pageChanged(event) {
    this.full_url_for_filtering = this.location.path();
    this.cPage = event;
    this.offset = 24 * (event - 1);

    if (this.limit == this.offset || this.limit < this.offset) {
    } else if (event == 1) {
      this.resetPagination();
    }
    this.router.navigate([this.language + '/home/' + this.productType + "/" + this.keywordSearch + "/" + this.countryISO + "/" + this.cPage.toString()])
  }

  resetPagination() {

    this.limit = 24;
    this.offset = 0;
    this.cPage = 1;

  }


  myFilter = (d: Date | null): boolean => {

    let freeDates = [
      "Mon Nov 02 2020 00:00:00 GMT+0200 (Eastern European Standard Time)",
    ]
    return d.toString() != freeDates[0] || d.toString() != freeDates[1] || d.toString() != freeDates[2] || d.toString() != freeDates[3] || d.toString() != freeDates[4] || d.toString() != freeDates[5] || d.toString() != freeDates[6] || d.toString() != freeDates[7] || d.toString() != freeDates[8] || d.toString() != freeDates[9] || d.toString() != freeDates[10] || d.toString() != freeDates[11] || d.toString() != freeDates[12] || d.toString() != freeDates[13] || d.toString() != freeDates[14] || d.toString() != freeDates[15] || d.toString() != freeDates[16] || d.toString() != freeDates[17] || d.toString() != freeDates[18] || d.toString() != freeDates[19] || d.toString() != freeDates[20] || d.toString() != freeDates[21] || d.toString() != freeDates[22] || d.toString() != freeDates[23] || d.toString() != freeDates[24] || d.toString() != freeDates[25] || d.toString() != freeDates[26] || d.toString() != freeDates[27] || d.toString() != freeDates[28] || d.toString() != freeDates[29] || d.toString() != freeDates[30] || d.toString() != freeDates[31];
  }

  changeCheckOutMin(checkInOrOut: string) {

    if (checkInOrOut == 'CheckIn') {
      this.minDate = new Date();

    } else if (checkInOrOut == 'CheckOut') {
      this.minDate = this.fromDate;
    }
    this.isSelected = true
  }

  setSearchToTrue() {
    this.isSelected = true
    this.minDate = this.fromDate;
  }

  openFilter() {
    let x = document.getElementById("filter");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
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

  handlePlusAdults() {
    this.enableAdult = true;
    this.filterFormGroup.patchValue({
      numberOfAdult: this.filterFormGroup.controls.numberOfAdult.value + 1
    });
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

  handlePlusChildren() {
    this.enableChildren = true;
    this.filterFormGroup.patchValue({
      numberOfChildren: this.filterFormGroup.controls.numberOfChildren.value + 1
    });
  }


  OnClearFilterForm() {
    this.filterFormGroup.patchValue({
      //numberOfAdult: 1,
      numberOfAdult: 2,
      numberOfChildren: 0,
      keywordSearch: '',
      checkIn: '',
      checkOut: '',
      countryISO: ''
    });

    this.keywordSearch = '';
    this.countryISO = '';
    this.cityId = '';

    this.clearAllProducts();
    this.OnCancelGuests();
    this.resetPagination();
  }

  OnCancelGuests() {
    this.filterFormGroup.patchValue({
      numberOfAdult: 2,
      numberOfChildren: 0
    });
  }

  clearAllProducts() {
    this.estate = [''];
    this.estateProucts = [''];
    this.adventure = [''];
    this.adventureProucts = [''];
    this.restaurant = [''];
    this.restaurantProucts = [''];
  }

  getCityForUrl() {
    const newUrl =
      this.language +
      '/home/' +
      this.productType +
      '/' +
      this.city_name_url_search.toLowerCase() +
      '/' +
      this.countryISO.toLowerCase() +
      '/' +
      this.cPage.toString();
    this.location.replaceState(newUrl);
  }

  openTour(id, slug) {
    this.idSlug = id + '-' + slug;
    this.router.navigate([this.language + '/home/' + this.productType + '/' + this.idSlug])
  }

  openCityNotFoundDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.panelClass = 'city-not-found-dialog';

    dialogConfig.data = {
    };

    const dialogRef = this.dialog.open(DialogCitynotfoundComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.filtered_website_language = localStorage.getItem('lang');
        this.translate.setDefaultLang(this.cookieService.get('currentLang'));
        return false;
      }
    );
    this.showLoader = false;

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


  setFilteredDataBasedOnUrl(location) {
    const today = new Date();
    const defaultFrom = new Date(today);
    const defaultTo = new Date(defaultFrom);
    defaultFrom.setDate(defaultFrom.getDate() + 14);
    defaultTo.setDate(defaultTo.getDate() + 15);

    let defaultFromDate = moment(defaultFrom).format("YYYY-MM-DD");
    let defaultToDate = moment(defaultTo).format("YYYY-MM-DD");
    let today_validate = moment(today).format("YYYY-MM-DD");

    if (localStorage.getItem('fromDate') < today_validate || localStorage.getItem('toDate') < today_validate) {
      localStorage.setItem('fromDate', defaultFromDate)
      localStorage.setItem('toDate', defaultToDate)
    }


    if (this.countryISO == 'all') {
      this.keywordSearch = '';
      this.countryISO = '';
      return;
    }

    this.full_url_for_filtering = location.path();
    let splitUrl = this.full_url_for_filtering.split('/');
    this.filtered_website_language = splitUrl[1];
    this.language = this.filtered_website_language;
    this.filtered_product_type = splitUrl[3];
    this.filtered_url_city = splitUrl[4];

    if (this.full_url_for_filtering.length > 19 && (this.filtered_product_type == 'estate' || this.filtered_product_type == 'adventure')) {


      this.filtered_url_city = decodeURIComponent(this.filtered_url_city);
      this.filtered_url_countryISO = splitUrl[5];
      this.filtered_page_number = splitUrl[6];
      this.keywordSearch = decodeURIComponent(this.filtered_url_city);
      this.countryISO = this.filtered_url_countryISO;
      // this.cPage = this.filtered_page_number.toString();
      this.cPage = this.filtered_page_number;

      if (splitUrl.length === 7) {
        localStorage.setItem('city', this.filtered_url_city);
        localStorage.setItem('iso', this.filtered_url_countryISO);
        localStorage.setItem('cPage', String(this.filtered_page_number))
      }

      if (this.filtered_product_type == 'estate') {
        this.recommendedEstatesHeader = true;
        this.recommendedAdventuressHeader = false;
      }
      else if (this.filtered_product_type == 'adventure') {
        this.recommendedAdventuressHeader = true;
        this.recommendedEstatesHeader = false;
      }

      if (this.filtered_page_number === '2') {
        this.offset = 24;
      }
    }
  }

async getRateHawkHotels(fromDate, toDate, lang, city, iso, numOfAdult, numOfChildren) {
  this.rateHawkEstates = []
  fromDate = localStorage.getItem('fromDate')
  toDate = localStorage.getItem('toDate')
  
  this.data.getAllRateHawkEstates(fromDate, toDate, lang, city, iso, numOfAdult, numOfChildren).subscribe(
    data => {


        data.data.sort((a, b) => b.star_rating - a.star_rating);
      this.rateHawkEstates = data.data;
      this.countryName = this.rateHawkEstates[0].country
      this.cityName = this.rateHawkEstates[0].city;


      // console.log(data.data, 'rate hawk');
      // Sort the data by star_rating in descending order


    },
    error => {
      console.error(error, "error");
      // this.cities_have_results = false;
    }
  );
  setTimeout(() => {
    this.showLoader = false;
  }, 7000);
}

redirect_to_zenhotels(id, mid, city, country, region_id){
  // window.open(url)
  const formattedCity = city.replace(/\s+/g, '_');
  const formattedCountry = country.replace(/\s+/g, '_');
  const fromDate = localStorage.getItem('fromDate')
  const toDate = localStorage.getItem('toDate')
  const currency = localStorage.getItem('currency')
  const formattedFromDate = this.datePipe.transform(fromDate, 'dd.MM.yyyy');
  const formattedToDate = this.datePipe.transform(toDate, 'dd.MM.yyyy');
  let curr = localStorage.getItem('currency');
  if (curr == 'euro'){
    curr = 'eur'
  }
  const guestCount = localStorage.getItem('numberOfAdult') + localStorage.getItem('numberOfChildren')
  const url = `https://www.ostrovok.ru/rooms/${id}/?cur=RUB&dates=${fromDate}-${toDate}&guests=${guestCount}&lang=${this.filtered_website_language}&partner_slug=124076.affiliate.030b&utm_medium=partners&utm_source=8194.affiliate.8194&partner_extra=8194`
  const url_room = `https://www.ostrovok.ru/hotel/${formattedCountry}/${formattedCity}/mid${mid}/${id}/?q=${region_id}&cur=${curr}&partner_slug=124076.affiliate.030b&lang=${this.filtered_website_language}&dates=${formattedFromDate}-${formattedToDate}&guests=${guestCount}&price=one&room=s-7b983416-48a1-5093-8569-0c07390fc5ad&serp_price=${id}.114931.RUB.h-e8a030f7-fbc1-5242-a8fe-2dfe3f8227bd&sid=3890f01f-c1ae-4d72-99f4-b9557575beb8`

  window.open(url_room)
}


  async getMyTravelEstates(fromDate, toDate, lang, city, iso, numOfAdult, numOfChildren) {
    let err_count = 0;
    this.cities_have_results = true;
    // try {
    //   const data = await this.data.getAllEstates(fromDate, toDate, lang, city, iso, numOfAdult, numOfChildren).toPromise();

    //   this.allEstates = data.products;

    //   if (data.totalNumberOfResults === 0) {
    //     this.cities_have_results = false;
    //   }

    //   this.addCoordinatesToMap();
    //   this.cityNotFoundText = false;
    // } catch (error) {
    //   console.error(error);
    //   err_count++;

    //   this.cities_have_results = false;
    //   setTimeout(() => {
    //     this.cityNotFoundText = true;
    //   }, 1000);

    // }

    try {
      const data = await this.data.getAgodaHotels(fromDate, toDate, lang, city, iso, numOfAdult, numOfChildren).toPromise();

      this.getEstateSeo(lang, city, iso);
      this.cityName = city;
      localStorage.setItem('city', city);
      localStorage.setItem('iso', iso);
      this.allEstates = []
      this.allEstates = this.allEstates.concat(data.products);
      this.originalEstateData = this.allEstates;
      // this.showLoader = false;
      let pages_count = this.allEstates.length / 24;
      this.page_count = Array(Math.round(pages_count + 1)).fill(0).map((x, index) => index);
      this.updatePageCount(this.currentPage, this.allEstates.length);
      this.prog_bar_value = 100;
      this.addCoordinatesToMap();
      this.cityNotFoundText = false;
      // console.log(this.allEstates, ' estaes frin hotel look')
      if (true) {

        // this.showLoader = false;
        // console.log(this.showLoader, 'asd')
        setTimeout(() => {
          this.cityNotFoundText = true;
        }, 1000);

      }
    } catch (error) {
      // console.log('did i get here?')

      // console.log(error);
      // if (err_count == 1) {

        // this.showLoader = false;
        setTimeout(() => {
          this.cityNotFoundText = true;
        }, 1000);
      // }
    }

    await this.getHotelLookHotels(); // Wait for this async function to complete

    // Perform any remaining operations here
  }

  async getHotelLookHotels() {
    if (localStorage.getItem('iso') === 'ru') {
      setTimeout(() => {
        this.showLoader = true;
      }, 500);
      setTimeout(() => {
        this.showLoader = false;
      }, 9000);
    }
    
    try {
      const data = await this.data.getHotelLookHotels(
        this.keywordSearch,
        this.countryISO,
        localStorage.getItem('fromDate'),
        localStorage.getItem('toDate'),
        this.filterFormGroup.controls.numberOfAdult.value,
        this.filterFormGroup.controls.numberOfChildren.value
      ).toPromise();
    
      // Merge new data into allEstates
      this.allEstates = this.allEstates.concat(data.products);
    
      // Sort allEstates by stars from higher to lower
      this.allEstates.sort((a, b) => b.starRating - a.starRating);
    
      // Check if city not found
      if (data.totalNumberOfResults === 0) {
        this.cityNotFoundText = true;
      } else {
        this.cityNotFoundText = false;
      }
    
      // Log the sorted estates
      // console.log(this.allEstates, "allEstates");
    
    } catch (error) {
      console.error(error);
    }
    
    // console.log(this.allEstates, "allestates")
    // this.allEstates.sort((a, b) => b.price - a.price);


  }

  redirectTo(estate) {
    if (estate.partnerId === "a") {
      const id = estate.id.slice(2)
      window.open('/redirect-to/' + this.filtered_website_language + '/' + id, '_blank');
    }
    else if (estate.partnerId === "h") {
      window.open(`https://search.hotellook.com/hotels?=1&adults=${localStorage.getItem('numberOfAdult')}&checkIn=${localStorage.getItem('fromDate')}&checkOut=${localStorage.getItem('toDate')}&children=${localStorage.getItem('numberOfChildren')}&currency=rub&hotelId=${estate.id}&language=${this.filtered_website_language}`)
      // const id = estate.id.slice(2)
      // console.log(id, "id")
      // window.open('/redirect-to/' + this.filtered_website_language + '/' + estate.id, '_blank');
    } else {
      this.router.navigate([`${this.filtered_website_language}/home/${this.filtered_product_type}/${estate.id}-${estate.slug}`]);

    }

  }

  addCoordinatesToMap() {
    this.coordinates = [];
    this.allEstates.forEach((estate) => {
      if (estate.coord) {
        const [latitude, longitude] = estate.coord.split(',');
        const coordinate = { lat: Number(latitude.trim()), lng: Number(longitude.trim()), label: estate.name };
        this.coordinates.push(coordinate);
      }
    });
  }

  togglePropertyType(property: string) {

  }

  toggleStarRating(star: number): void {
    // Toggle the star rating in the array
    const index = this.starRatings.indexOf(star);

    if (index !== -1) {
      this.starRatings.splice(index, 1);
    } else {
      this.starRatings.push(star);
    }

    // Filter the allEstates array based on the selected star ratings
    this.filterEstates();
  }

  // Function to check if a star rating is selected
  isChecked(star: number): boolean {
    return this.starRatings.includes(star);
  }

  // Function to filter allEstates based on selected star ratings
  filterEstates(): void {
    if (this.starRatings.length === 0) {
      // If no star ratings are selected, show all hotels
      this.allEstates = [...this.originalEstateData];
    } else {
      // Otherwise, filter based on selected star ratings
      this.allEstates = this.originalEstateData.filter(estate => this.starRatings.includes(estate.starRating));
    }
  }

  sortByPrice(sortOrder: string, productType: string) {
    if (sortOrder === 'asc' && productType === 'estate') {
      this.rateHawkEstates.sort((a, b) => {
        if (a.star_rating === b.star_rating) {
          return a.daily_prices[0] - b.daily_prices[0];
        }
        return a.star_rating - b.star_rating;
      });
    } else if (sortOrder === 'desc' && productType === 'estate') {
      this.rateHawkEstates.sort((a, b) => {
        if (a.star_rating === b.star_rating) {
          return b.daily_prices[0] - a.daily_prices[0];
        }
        return b.star_rating - a.star_rating;
      });
    } else if (sortOrder === 'def' && productType === 'estate') {
      this.showLoader = true;
      setTimeout(() => {
        this.showLoader = false;
      }, 1000);
      this.getMyTravelEstates(localStorage.getItem('fromDate'), localStorage.getItem('toDate'), this.filtered_website_language, this.keywordSearch, this.countryISO, this.filterFormGroup.controls.numberOfAdult.value, this.filterFormGroup.controls.numberOfChildren.value);
    }
  }


  sortByStars(sortOrder: string, productType: string) {
    if (sortOrder === 'asc' && productType === 'estate') {
      this.rateHawkEstates.sort((a, b) => a.star_rating - b.star_rating);
    } else if (sortOrder === 'desc' && productType === 'estate') {
      this.rateHawkEstates.sort((a, b) => b.star_rating - a.star_rating);
    } else if (sortOrder === 'def' && productType === 'estate') {
      this.showLoader = true;
      setTimeout(() => {
        this.showLoader = false;
      }, 1000);
      this.getMyTravelEstates(localStorage.getItem('fromDate'), localStorage.getItem('toDate'), this.filtered_website_language, this.keywordSearch, this.countryISO, this.filterFormGroup.controls.numberOfAdult.value, this.filterFormGroup.controls.numberOfChildren.value);
    }
  }

  defaultSorting() {
    this.selectedPriceSortOption = 'default';
    this.selectedStarsSortOption = 'default';

    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);

    this.getMyTravelEstates(localStorage.getItem('fromDate'), localStorage.getItem('toDate'), this.filtered_website_language, this.keywordSearch, this.countryISO, this.filterFormGroup.controls.numberOfAdult.value, this.filterFormGroup.controls.numberOfChildren.value);
  }



  getMyTravelAdventures(lang, city, iso, numOfAdult, numOfChildren) {
    let err_count = 0
    this.cities_have_results = true;
    this.allAdventures = [];

    this.data.getAllAdventures(lang, city, iso).subscribe(
      data => {
        this.allAdventures = [];
        this.allAdventures = this.allAdventures.concat(data.products);
      },
      error => {
        this.allAdventures = [];
        console.error(error, "error");
        err_count++
        this.cities_have_results = false;
      }
    );
    this.data.getTiqetsAdventures(lang, city, iso, numOfAdult, numOfChildren).subscribe(
      data => {
        this.getAdventureSeo(lang, city, iso)
        this.cityName = city;
        localStorage.setItem('city', city);
        localStorage.setItem('iso', iso);
        this.showLoader = false;
        this.allAdventures = this.allAdventures.concat(data.products);
        let pages_count = this.allAdventures.length / 24
        this.page_count = Array(Math.round(pages_count + 1)).fill(0).map((x, index) => index);
        this.updatePageCount(this.currentPage, this.allAdventures.length)
        this.prog_bar_value = 100
        this.cityNotFoundText = false;
        this.showLoader = false;
        if (data.totalNumberOfResults == 0 && !this.cities_have_results) {
          // this.openCityNotFoundDialog();

          this.showLoader = false;
          setTimeout(() => {
            this.cityNotFoundText = true;
          }, 1000);
        }
      },
      error => {
        console.error(error);
        if (err_count == 1) {
          // this.openCityNotFoundDialog();

          this.showLoader = false;
          setTimeout(() => {
            this.cityNotFoundText = true;
          }, 1000);
        }
      }
    )

  }

  getTripsterAdventures(city, start_date, end_date, persons_count) {
    this.data.getTripsterAdventures(city, start_date, end_date, persons_count).subscribe(
      data => {
        // console.log(data, 12312)
        // this.allAdventures = [];
        this.allAdventures = this.allAdventures.concat(data.products);
        this.allAdventures.sort((a, b) => b.starRating - a.starRating);
        this.cityNotFoundText = false;
      },
      error => {

        this.showLoader = false;
        setTimeout(() => {
          this.cityNotFoundText = true;
        }, 5000);

      }
    )
    // console.log(this.allAdventures, 1234123412421341)
  }

  getTripsterCityId(city_name) {
    // Capitalize the first letter of city_name
    if (typeof city_name === 'string') {
      city_name = city_name.charAt(0).toUpperCase() + city_name.slice(1).toLowerCase();
    }
  
    this.data.getTripsterCityId(city_name).subscribe(
      data => {
        this.tripster_city_id = data.results[0].id;
        console.log(this.tripster_city_id, 'city id');
      }
    );
  }
  

  redirectToAdventure(adventure) {
    // console.log(adventure.outerLink)
    if (adventure.partnerId === 'h') {
      this.router.navigate([`/${this.filtered_website_language}/home/${this.filtered_product_type}/a-${adventure.id}-${adventure.slug}`])
    } else {
      this.router.navigate([`/${this.filtered_website_language}/home/${this.filtered_product_type}/${adventure.id}-${adventure.slug}`])
    }
  }

  getEstateSeo(lang, city, iso) {
    this.data.getAllEstatesSeo(lang, city, iso).subscribe(
      data => {
        this.countryName = data.countryName;
        this.meta.updateTag({ name: 'description', content: data.pageDescription })
        this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
        this.meta.updateTag({ name: 'twitter:site', content: 'nobitour.com Travel Services' });
        this.meta.updateTag({ name: 'twitter:title', content: data.pageTitle });
        this.meta.updateTag({ name: 'twitter:description', content: data.pageDescription });
        this.meta.updateTag({ name: 'twitter:image', content: data.pageImage });

        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:site_name', content: 'nobitour.com Travel Services' });
        this.meta.updateTag({ property: 'og:title', content: data.pageTitle });
        this.meta.updateTag({ property: 'og:description', content: data.pageDescription });
        this.meta.updateTag({ property: 'og:image', content: data.pageImage });
        this.meta.updateTag({ property: 'og:url', content: data.canonicalURL });
      }
    )
  }

  getAdventureSeo(lang, city, iso) {
    this.data.getAllAdventuresSeo(lang, city, iso).subscribe(
      data => {
        this.countryName = data.countryName;
        this.meta.updateTag({ name: 'description', content: data.pageDescription })
        this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
        this.meta.updateTag({ name: 'twitter:site', content: 'nobitour.com Travel Services' });
        this.meta.updateTag({ name: 'twitter:title', content: data.pageTitle });
        this.meta.updateTag({ name: 'twitter:description', content: data.pageDescription });
        this.meta.updateTag({ name: 'twitter:image', content: data.pageImage });

        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:site_name', content: 'nobitour.com Travel Services' });
        this.meta.updateTag({ property: 'og:title', content: data.pageTitle });
        this.meta.updateTag({ property: 'og:description', content: data.pageDescription });
        this.meta.updateTag({ property: 'og:image', content: data.pageImage });
        this.meta.updateTag({ property: 'og:url', content: data.canonicalURL });
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.allEstates) {
      this.updatePageCount(this.currentPage, this.allEstates.length);
    }
  }

  updatePageCount(currentPage: number, totalCount: number) {
    if (this.productType == 'estate') {
      this.total_pages_count = Math.ceil(this.allEstates.length / 24);

    }
    else if (this.productType == 'adventure') {
      this.total_pages_count = Math.ceil(this.allAdventures.length / 24);

    }
    const pageCount = Math.ceil(totalCount / this.pageSize);
    const pageNumbers = [];
    if (pageCount <= 10) {
      for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(currentPage - 4, 1);
      let endPage = Math.min(startPage + 9, pageCount);
      if (endPage - startPage < 9) {
        startPage = Math.max(endPage - 9, 1);
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    this.page_count = pageNumbers;
  }
  previousPage(productType) {
    const page = +this.route.snapshot.paramMap.get('page');
    const previousPage = page - 1;
    const baseUrl = this.getBaseUrl();
    this.router.navigate([baseUrl, previousPage]);
    this.startIndex = (previousPage - 1) * this.pageSize;
    window.scrollTo({ top: 700, behavior: 'smooth' });
    this.currentPage = previousPage;
    if (productType == 'estate') {
      this.updatePageCount(this.currentPage, this.allEstates.length);

    } else if (productType == 'adventure') {
      this.updatePageCount(this.currentPage, this.allAdventures.length);

    }
    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
    }, 3000);
  }

  nextPage(productType) {
    const page = +this.route.snapshot.paramMap.get('page');
    const nextPage = page + 1;
    const baseUrl = this.getBaseUrl();
    this.router.navigate([baseUrl, nextPage]);
    this.startIndex = (nextPage - 1) * this.pageSize;
    window.scrollTo({ top: 700, behavior: 'smooth' });
    this.currentPage = nextPage;
    if (productType == 'estate') {
      this.updatePageCount(this.currentPage, this.allEstates.length);

    } else if (productType == 'adventure') {
      this.updatePageCount(this.currentPage, this.allAdventures.length);

    }
    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
    }, 3000);
  }

  navToSpecificPage(sp_page, productType) {
    const previousPage = sp_page;
    const baseUrl = this.getBaseUrl();
    this.router.navigate([baseUrl, previousPage]);
    this.startIndex = (previousPage - 1) * this.pageSize;
    window.scrollTo({ top: 700, behavior: 'smooth' });
    this.currentPage = previousPage;
    if (productType == 'estate') {
      this.updatePageCount(this.currentPage, this.allEstates.length);
    }
    else if (productType == 'adventure') {
      this.updatePageCount(this.currentPage, this.allAdventures.length);

    }
    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
    }, 3000);
  }

  getBaseUrl() {
    const url_parts = this.location.path().split('/');
    url_parts.pop()
    return url_parts.join('/');
  }

  fetchWeatherData() {

    const apiKey = 'b441076bd53adf9e4e56bd42eee9587a';

    this.data.getWeather(this.keywordSearch, apiKey, this.filtered_website_language).subscribe((data: any) => {
      const weatherData = data.list.reduce((acc: any[], item: any) => {
        const date = this.formatDate(item.dt_txt);
        const existingEntry = acc.find((entry) => entry.date === date);
        this.showWeather = true;
        if (!existingEntry) {
          acc.push({
            date,
            temperature: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].icon
          });
        } else {
          if (item.main.temp > existingEntry.temperature) {
            existingEntry.temperature = item.main.temp;
          }
          if (!existingEntry.description.includes(item.weather[0].description)) {
            existingEntry.description += `, ${item.weather[0].description}`;
          }
        }

        return acc;
      }, []);

      this.today = weatherData[0];
      this.remainingForecast = weatherData;
    });
  }

  handleEnterClick() {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.myControl.value)}&key=AIzaSyBRPDMwE4mfxJmPYiF1_8rQ_ohaZ8rzP1Y`)
      .then(response => response.json())
      .then(data => {

        let iso = '';
        if (data.results && data.results.length > 0) {
          const addressComponents = data.results[0].address_components;
          const countryComponent = addressComponents.find(component =>
            component.types.includes('country')
          );
          if (countryComponent) {
            iso = countryComponent.short_name;
          }
        }
        if (this.location.path().length > 16 && this.location.path().length < 45) {
          setTimeout(() => {
            location.reload();
          }, 200);
        }
        this.router.navigate([this.filtered_website_language + '/home/estate/' + this.myControl.value.toLowerCase() + '/' + iso.toLowerCase() + "/1"])
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  getWeatherIconUrl(icon: string): string {
    return `http://openweathermap.org/img/w/${icon}.png`;
  }


  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
  }

  redirectToCity(cityName: string, countryIso: string) {
    this.cityName = cityName;
    this.countryISO = countryIso;
    const url = `${this.filtered_website_language}/home/${this.productType}/${this.cityName.toLowerCase()}/${this.countryISO}/1`;
    this.router.navigateByUrl(url);
  }

  toggleAccommodationOption(option) {

  }

  toggleAccommodationFeature(option) {

  }

  toggleFacilityOrService(option) {

  }
  updateCounts(): void {
    this.adultCountForInput = this.adultCountSearch || 0;
    this.childreCountForInput = this.childrenCountSearch || 0;
  }

  
  // searchForCity() {
  //   // console.log('1231232')
    
  //   // console.log("City: ", this.citySearch);
  //   // console.log("From Date: ", this.fromDateSearch);
  //   // console.log("To Date: ", this.toDateSearch);
  //   // console.log("Adult Count: ", this.adultCount);
  //   // console.log("Children Count: ", this.childrenCount);
  //   // console.log("iso", this.isoSearch)
    
  //   localStorage.setItem("fromDate", this.datePipe.transform(this.fromDateSearch, 'yyyy-MM-dd'));
  //   localStorage.setItem("toDate", this.datePipe.transform(this.toDateSearch, 'yyyy-MM-dd'));
  //   localStorage.setItem("numberOfChildren", this.childrenCount.toString());
  //   localStorage.setItem("numberOfAdult", this.adultCount.toString());
    
  //   this.adultCountForInput = localStorage.getItem('numberOfAdult')
  //   this.childreCountForInput = localStorage.getItem('numberOfChildren')

  //   if (this.isEstate) {
  //     this.getMyTravelEstates(this.fromDateSearch, this.toDateSearch, this.filtered_website_language, this.citySearch.toLowerCase(), this.isoSearch.toLowerCase(), this.adultCountForInput, this.childreCountForInput);
  //     this.router.navigate([this.filtered_website_language + '/home/estate/' + this.citySearch.toLowerCase() + '/' + this.isoSearch.toLowerCase() + "/1"])
  //     this.showLoader = true;
  //   }
  //   else if (this.isAdventure) {
  //     // console.log(this.isAdventure)
  //     this.isAdventureTranslated = true;
  //     this.isEstateTranslated = false;
  //     this.isMtEstate = false;
  //     this.isMyAdventure = true;
  //     this.getMyTravelAdventures(this.filtered_website_language, this.citySearch.toLowerCase(), this.isoSearch.toLowerCase(), this.adultCountSearch, this.childrenCountSearch)
  //     this.getTripsterAdventures(this.tripster_city_id, this.fromDate, this.toDate, 3);
  //     // if (this.allAdventures.length < 1) {
  //     //   this.getTripsterCityId(localStorage.getItem('city'));
  //     //   setTimeout(() => {
  //     //     this.getMyTravelAdventures(this.filtered_website_language, this.citySearch.toLowerCase(), this.isoSearch.toLowerCase(), this.adultCountSearch, this.childrenCountSearch)
  //     //     this.getTripsterAdventures(this.tripster_city_id, this.fromDate, this.toDate, 3);
  //     //   }, 2000);
  //     // }
  //     this.router.navigate([this.filtered_website_language + '/home/adventure/' + this.citySearch.toLowerCase() + '/' + this.isoSearch.toLowerCase() + "/1"])
  //     this.showLoader = true;
  //   }
  //   setTimeout(() => {
  //     this.showLoader = false;
  //   }, 5000);

  //   // this.clearCityField();
  //   // setTimeout(() => {
  //   //   this.showLoader = false;
  //   // }, 2000);
  // }

  // searchForCity() {

    
  //   localStorage.setItem("fromDate", this.datePipe.transform(this.fromDateSearch, 'yyyy-MM-dd'));
  //   localStorage.setItem("toDate", this.datePipe.transform(this.toDateSearch, 'yyyy-MM-dd'));
  //   localStorage.setItem("numberOfChildren", this.childrenCount.toString());
  //   localStorage.setItem("numberOfAdult", this.adultCount.toString());
    
  //   this.adultCountForInput = localStorage.getItem('numberOfAdult')
  //   this.childreCountForInput = localStorage.getItem('numberOfChildren')
  //   console.log(this.isoSearch,' test')
  //   console.log( localStorage.getItem('iso'))
  //   console.log(this.citySearch)
  //   if(this.isoSearch == undefined || this.isoSearch == null){
  //     this.isoSearch = localStorage.getItem('iso')
  //   }
  //   localStorage.setItem('city', this.citySearch)

  //   if (this.isEstate) {
  //     this.getMyTravelEstates(this.fromDateSearch, this.toDateSearch, this.filtered_website_language, this.citySearch.toLowerCase(), this.isoSearch.toLowerCase(), this.adultCountForInput, this.childreCountForInput);
  //     this.router.navigate([this.filtered_website_language + '/home/estate/' + this.citySearch.toLowerCase() + '/' + this.isoSearch.toLowerCase() + "/1"])
  //     this.showLoader = true;
  //   }
  //   else if (this.isAdventure) {
  //     // console.log(this.isAdventure)
  //     this.isAdventureTranslated = true;
  //     this.isEstateTranslated = false;
  //     this.isMtEstate = false;
  //     this.isMyAdventure = true;
  //     this.getMyTravelAdventures(this.filtered_website_language, this.citySearch.toLowerCase(), this.isoSearch.toLowerCase(), this.adultCountSearch, this.childrenCountSearch)
  //     this.getTripsterAdventures(this.tripster_city_id, this.fromDate, this.toDate, 3);
  //     // if (this.allAdventures.length < 1) {
  //     //   this.getTripsterCityId(localStorage.getItem('city'));
  //     //   setTimeout(() => {
  //     //     this.getMyTravelAdventures(this.filtered_website_language, this.citySearch.toLowerCase(), this.isoSearch.toLowerCase(), this.adultCountSearch, this.childrenCountSearch)
  //     //     this.getTripsterAdventures(this.tripster_city_id, this.fromDate, this.toDate, 3);
  //     //   }, 2000);
  //     // }
  //     this.router.navigate([this.filtered_website_language + '/home/adventure/' + this.citySearch.toLowerCase() + '/' + this.isoSearch.toLowerCase() + "/1"])
  //     this.showLoader = true;
  //   }
  //   setTimeout(() => {
  //     this.showLoader = false;
  //   }, 5000);

  //   // this.clearCityField();
  //   // setTimeout(() => {
  //   //   this.showLoader = false;
  //   // }, 2000);
  // }

  searchForCity() {
    localStorage.setItem("fromDate", this.datePipe.transform(this.fromDateSearch, 'yyyy-MM-dd'));
    localStorage.setItem("toDate", this.datePipe.transform(this.toDateSearch, 'yyyy-MM-dd'));
    localStorage.setItem("numberOfChildren", this.childrenCount.toString());
    localStorage.setItem("numberOfAdult", this.adultCount.toString());
  
    this.adultCountForInput = localStorage.getItem('numberOfAdult');
    this.childreCountForInput = localStorage.getItem('numberOfChildren');
  
    if (this.isoSearch == undefined || this.isoSearch == null) {
      this.isoSearch = localStorage.getItem('iso');
    }
  
    localStorage.setItem('city', this.citySearch);
  
    if (this.isEstate) {
      // 🌍 Call RateHawk API here
      this.getRateHawkHotels(
        this.fromDateSearch,
        this.toDateSearch,
        this.filtered_website_language,
        this.citySearch.toLowerCase(),
        this.isoSearch.toLowerCase(),
        this.adultCountForInput,
        this.childreCountForInput
      );
  
      // this.getMyTravelEstates(
      //   this.fromDateSearch,
      //   this.toDateSearch,
      //   this.filtered_website_language,
      //   this.citySearch.toLowerCase(),
      //   this.isoSearch.toLowerCase(),
      //   this.adultCountForInput,
      //   this.childreCountForInput
      // );
      this.cityName = this.citySearch;
      console.log(this.adultCountForInput)
      this.router.navigate([
        this.filtered_website_language +
          '/home/estate/' +
          this.citySearch.toLowerCase() +
          '/' +
          this.isoSearch.toLowerCase() +
          '/1',
      ]);
      this.showLoader = true;
    } else if (this.isAdventure) {
      this.isAdventureTranslated = true;
      this.isEstateTranslated = false;
      this.isMtEstate = false;
      this.isMyAdventure = true;
  
      this.getMyTravelAdventures(
        this.filtered_website_language,
        this.citySearch.toLowerCase(),
        this.isoSearch.toLowerCase(),
        this.adultCountSearch,
        this.childrenCountSearch
      );
  
      this.getTripsterAdventures(
        this.tripster_city_id,
        this.fromDate,
        this.toDate,
        3
      );
  
      this.router.navigate([
        this.filtered_website_language +
          '/home/adventure/' +
          this.citySearch.toLowerCase() +
          '/' +
          this.isoSearch.toLowerCase() +
          '/1',
      ]);
      this.showLoader = true;
    }
  
    setTimeout(() => {
      this.showLoader = false;
    }, 7000);
  }

  
  clearCityField() {
    this.citySearch = '';

  }

  togglePeopleInputs() {
    this.showPeopleInputs = !this.showPeopleInputs;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
    // console.log('toggled', this.dropdownOpen)
  }

  selectOption(option: string): void {
    // Handle the selected option here
    // console.log('Selected option:', option);
    // You can close the dropdown after selecting an option if needed
    this.dropdownOpen = false;
  }

  onAdultCount(operator: string) {
    if (operator === '+') {
      this.adultCount > 1 ? --this.adultCount : 0;
    } else if (operator === '-') {
      (this.adultCount >= 0 && this.adultCount < 9) ? ++this.adultCount : 0;
    }
  }

  onChildCount(operator: string) {
    if (operator === '+') {
      this.childrenCount > 0 ? --this.childrenCount : 0;
    } else if (operator === '-') {
      (this.childrenCount >= 0 && this.childrenCount < 9) ? ++this.childrenCount : 0;
    }
  }

}