import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SwiperComponent } from 'ngx-useful-swiper';
import { SwiperOptions } from 'swiper';
import { ConnectionService } from '../services/connection.service';
import { HttpClient } from '@angular/common/http';
import { HomeService } from '../services/home.service';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [DatePipe]
})
export class CarouselComponent implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
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
        slidesPerView: 5
      }
    },
  };

  @Output() changeProductEvent = new EventEmitter
  @Output() resetProgBarEvent = new EventEmitter();

  changeProductType(): void {
    this.changeProductEvent.emit(this.productType)
  }

  @ViewChild('usefulSwiperMenu', { static: false }) usefulSwiperMenu: SwiperComponent;
  @ViewChild('hiddenInput', { static: false }) hiddenInput!: ElementRef<HTMLInputElement>;

  website_language: string;
  showLoader = true;

  searchQuery: string;
  fromDate: any = localStorage.getItem("fromDate");
  toDate: any;
  adultCount: any;
  childrenCount: any;
  ipAddress : any;
  ip_country_name : any;
  showForm: boolean = true;
  parisSlideshow: string;
  pragueSlideshow: string;
  romeSlideshow: string;
  russiaHoteliFrameMessage: string;
  russianAdventureiFrameMessage: string;
  tokyoSlideshow: string;
  tbilisiSlideshow: string;
  athensSlideshow: string;
  sofiaSlideshow: string;
  yerevanSlideshow: string;
  showCheckout: boolean = true;
  productType: string;
  cPage: number = 1;
  is_device_mobile: boolean = false;
  minDate: Date = new Date();
  checkoutMinDate: Date; 
  showLocalTransfer: boolean = false;
  showGLobalTransfer :boolean= true;
  searchValue: string;
  searchCityValue: string;
  showDropdown: boolean;
  nobiCities: any;
  dropdownOpen = false;
  guestsCount = '';
  searchResults: any[];
  newFilterIso: string;
  newCityName: string;
  slideshowData = [];
  nobiCitiesFilterTest: any[] = [];
  full_url_for_filtering:string = "";
  countryNames = ["afghanistan","åland islands","albania","algeria","american samoa","andorra","angola","anguilla","antarctica","antigua and barbuda","argentina","armenia","aruba","australia","austria","azerbaijan","bahamas","bahrain","bangladesh","barbados","belarus","belgium","belize","benin","bermuda","bhutan","bolivia (plurinational state of)","bonaire, sint eustatius and saba","bosnia and herzegovina","botswana","bouvet island","brazil","british indian ocean territory","united states minor outlying islands","virgin islands (british)","virgin islands (u.s.)","brunei darussalam","bulgaria","burkina faso","burundi","cambodia","cameroon","canada","cabo verde","cayman islands","central african republic","chad","chile","china","christmas island","cocos (keeling) islands","colombia","comoros","congo","congo (democratic republic of the)","cook islands","costa rica","croatia","cuba","curaçao","cyprus","czech republic","denmark","djibouti","dominica","dominican republic","ecuador","egypt","el salvador","equatorial guinea","eritrea","estonia","ethiopia","falkland islands (malvinas)","faroe islands","fiji","finland","france","french guiana","french polynesia","french southern territories","gabon","gambia","georgia","germany","ghana","gibraltar","greece","greenland","grenada","guadeloupe","guam","guatemala","guernsey","guinea","guinea-bissau","guyana","haiti","heard island and mcdonald islands","vatican city","honduras","hungary","hong kong","iceland","india","indonesia","ivory coast","iran (islamic republic of)","iraq","ireland","isle of man","israel","italy","jamaica","japan","jersey","jordan","kazakhstan","kenya","kiribati","kuwait","kyrgyzstan","lao people's democratic republic","latvia","lebanon","lesotho","liberia","libya","liechtenstein","lithuania","luxembourg","macao","north macedonia","madagascar","malawi","malaysia","maldives","mali","malta","marshall islands","martinique","mauritania","mauritius","mayotte","mexico","micronesia (federated states of)","moldova (republic of)","monaco","mongolia","montenegro","montserrat","morocco","mozambique","myanmar","namibia","nauru","nepal","netherlands","new caledonia","new zealand","nicaragua","niger","nigeria","niue","norfolk island","korea (democratic people's republic of)","northern mariana islands","norway","oman","pakistan","palau","palestine, state of","panama","papua new guinea","paraguay","peru","philippines","pitcairn","poland","portugal","puerto rico","qatar","republic of kosovo","réunion","romania","russian federation","rwanda","saint barthélemy","saint helena, ascension and tristan da cunha","saint kitts and nevis","saint lucia","saint martin (french part)","saint pierre and miquelon","saint vincent and the grenadines","samoa","san marino","sao tome and principe","saudi arabia","senegal","serbia","seychelles","sierra leone","singapore","sint maarten (dutch part)","slovakia","slovenia","solomon islands","somalia","south africa","south georgia and the south sandwich islands","korea (republic of)","spain","sri lanka","sudan","south sudan","suriname","svalbard and jan mayen","swaziland","sweden","switzerland","syrian arab republic","taiwan","tajikistan","tanzania, united republic of","thailand","timor-leste","togo","tokelau","tonga","trinidad and tobago","tunisia","turkey","turkmenistan","turks and caicos islands","tuvalu","uganda","ukraine","united arab emirates","united kingdom of great britain and northern ireland","united states of america","uruguay","uzbekistan","vanuatu","venezuela (bolivarian republic of)","vietnam","wallis and futuna","western sahara","yemen","zambia","zimbabwe"]


  constructor(private renderer: Renderer2,private ele: ElementRef,private datePipe: DatePipe, private location: Location, private homeData: HomeService, private http: HttpClient, private router: Router, private data: ConnectionService) {
    const defaultFromDate = localStorage.getItem('fromDate');
    const defaultToDate = localStorage.getItem('toDate');
    const defaultAdultCount = localStorage.getItem('numberOfAdult');
    const defaultChildrenCount = localStorage.getItem('numberOfChildren');
    const defaultCityValue = localStorage.getItem("city");

    this.fromDate = defaultFromDate || '';
    this.toDate = defaultToDate || '';
    this.adultCount = Number(defaultAdultCount) || 0;
    this.childrenCount = Number(defaultChildrenCount) || 0;
    this.searchValue = defaultCityValue || '';
  }

  ngOnInit() {
    const sliderElement = this.ele.nativeElement.querySelector('.main_menu');
    this.searchCityValue = localStorage.getItem("city");

    this.renderer.setStyle(sliderElement, 'position', 'sticky');
    this.renderer.setStyle(sliderElement, 'top', '-0');
    this.renderer.setStyle(sliderElement, 'z-index', '10');
    this.full_url_for_filtering = this.location.path();
    this.is_device_mobile = this.detectMob();
    this.website_language = localStorage.getItem('lang');
    this.checkoutMinDate = new Date();
    if(localStorage.getItem('numberOfAdult') === null ){
      this.adultCount = 2;
    }
    if(this.full_url_for_filtering.includes('adventure')){
      this.showCheckout = false;
    }
    

    if (this.full_url_for_filtering.includes('transfer')) {
      this.showForm = false;
    }
    this.getSlideshowData();
    if(localStorage.getItem('ipUserCountry') == 'Russia'){
      this.showLocalTransfer = true;
      this.showGLobalTransfer = false;
    }
    else{
      this.showLocalTransfer = false;
      this.showGLobalTransfer = true;
    }
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

  navigateToRecommendedCity(city, iso, productType) {
    window.open('/' + this.website_language + '/home/' + productType + "/" + city.toLowerCase() + "/" + iso + "/1", "_blank")
  }

  goToHome(productType: string) {
    this.productType = productType;
    this.changeProductEvent.emit(this.productType)
    this.resetProgBarEvent.emit(this.productType)
    this.website_language = localStorage.getItem('lang');

    this.data.updateAnalyticsCounter(this.productType).subscribe(
      // data => {

      // },
      // error => {

      // }
    );;
    // if(localStorage.getItem('iso').toLowerCase() === 'ru'  && this.productType === 'estate'){
    //   this.router.navigate([this.website_language + '/home/estateRu/'])
    //   return
    // }

    if (this.website_language == null) {
      this.website_language = 'en';
    }
    

    if (this.is_device_mobile && this.productType == 'flight') {
      window.open('https://flights.nobitour.com', '__blank')
    }
    else if (this.productType != 'flight' && this.productType != 'rent-a-car' && this.productType != 'insurance' && this.productType != 'personal-transfer' && this.productType != 'estateRu' && this.productType != 'adventureRu' && this.productType != 'transfer' && this.productType != 'avia-bus-russia') {
      this.router.navigate([this.website_language + '/home/' + this.productType + "/" + localStorage.getItem('city') + "/" + localStorage.getItem('iso') + "/" + this.cPage.toString()])
    }
    else if (this.productType == 'flight' || this.productType == 'rent-a-car' || this.productType == 'insurance' || this.productType == 'personal-transfer' || this.productType == 'estateRu' || this.productType == 'adventureRu' || this.productType == 'transfer' || this.productType == 'avia-bus-russia') {
      this.router.navigate([this.website_language + '/home/' + this.productType]);
    }
    if(this.productType === 'adventure'){
      this.showCheckout = false;
    }else{
      this.showCheckout = true;
    }
    setTimeout(() => {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }, 2000);

  }



  getIpAddress() {
    this.data.getIPv4Address().subscribe(response => {
      this.ipAddress = response;
      this.ip_country_name = this.ipAddress.country_name;
      if (this.ip_country_name == "Russia" || this.ip_country_name == "Armenia") {
        this.showLocalTransfer = true;
        this.showGLobalTransfer = false;
      }else{
        this.showLocalTransfer = false;
        this.showGLobalTransfer = true;
      }

    })
  }

  nextMenu() {
    this.usefulSwiperMenu.swiper.slideNext();
  }

  prevMenu() {
    this.usefulSwiperMenu.swiper.slidePrev();
  }

  search(keyword: string): void {
    this.showLoader = true;
    console.log(this.showLoader)
  
    if (keyword) {
      this.homeData.requestOnServer(keyword).subscribe(
        homeData => {
          if (homeData != null) {
            setTimeout(() => {
              this.nobiCities = homeData.data;
              this.newFilterIso = homeData.data[0].countryIso;
              this.showLoader = false;
            }, 500);
          }
        }
      );
    }
  }
  
  

  changeCheckOutMin() {
    this.minDate = this.fromDate;
  }

  selectResult(city, iso, id) {
    this.newCityName = city;
    this.newFilterIso = iso;
    // if(this.location.path().length > 16 && this.location.path().length < 45){
    //   setTimeout(() => {
    //     location.reload();
    //   }, 200);
    // }
    // this.router.navigate([this.website_language + '/home/estate/' +city.toLowerCase() + '/' + iso.toLowerCase() + "/1"])
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  handleEnterClick() {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.searchValue)}&key=AIzaSyBRPDMwE4mfxJmPYiF1_8rQ_ohaZ8rzP1Y`)
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
            this.newFilterIso = iso;
          }
          
        }
        // if(this.location.path().length > 16 && this.location.path().length < 45){
        //   setTimeout(() => {
        //     location.reload();
        //   }, 200);
        // }
        // this.router.navigate([this.website_language + '/home/estate/' + this.searchValue.toLowerCase() + '/' + iso.toLowerCase() + "/1"])
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }



  handleEnterClickCity() {
    
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.searchCityValue)}&key=AIzaSyBRPDMwE4mfxJmPYiF1_8rQ_ohaZ8rzP1Y`)
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
            this.newFilterIso = iso;
            localStorage.setItem('iso', iso)

          }
          
        }
        localStorage.setItem('city', this.searchCityValue.toLowerCase())

        // if(this.location.path().length > 16 && this.location.path().length < 45){
        //   setTimeout(() => {
        //     location.reload();
        //   }, 200);
        // }
        if(this.location.path().includes('destination')){
          this.router.navigate([this.website_language + '/destination/' + this.searchCityValue.toLowerCase() + '/' + iso.toLowerCase()])

          setTimeout(() => {
             location.reload()
          }, 200);
         
        }
        else{
           this.router.navigate([this.website_language + '/destination/' + this.searchCityValue.toLowerCase() + '/' + iso.toLowerCase()])
        }
       
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // searchForCity() {
  //   const today = new Date();
  //   const defaultFrom = new Date(today);
  //   const defaultTo = new Date(defaultFrom);
  //   defaultFrom.setDate(defaultFrom.getDate() + 14);
  //   defaultTo.setDate(defaultTo.getDate() + 15);
  //   if (this.countryNames.includes(this.searchValue)) {
  //     this.router.navigate([this.website_language + '/home/country/' + this.searchValue.toLowerCase()])
  //   } else {
  //     let defaultFromDate = moment(defaultFrom).format("YYYY-MM-DD");
  //     let defaultToDate = moment(defaultTo).format("YYYY-MM-DD");
  //     let today_validate = moment(today).format("YYYY-MM-DD");

  //     localStorage.setItem("city", this.searchValue.toLowerCase());
  //     if (this.newFilterIso === undefined) {
  //       this.newFilterIso = localStorage.getItem("iso");
  //     } else {
  //       localStorage.setItem("iso", this.newFilterIso.toLowerCase());
  //     }

  //     if (localStorage.getItem('fromDate') < today_validate || localStorage.getItem('toDate') < today_validate || localStorage.getItem('fromDate') === null) {
  //       localStorage.setItem('fromDate', defaultFromDate)
  //       localStorage.setItem('toDate', defaultToDate)
  //     }
  //     else {
  //       localStorage.setItem("fromDate", this.datePipe.transform(this.fromDate, 'yyyy-MM-dd'));
  //       localStorage.setItem("toDate", this.datePipe.transform(this.toDate, 'yyyy-MM-dd'));
  //     }

  //     localStorage.setItem("numberOfChildren", this.childrenCount);
  //     localStorage.setItem("numberOfAdult", this.adultCount);
  //     // if (this.location.path().length > 16 && this.location.path().length < 52) {
  //     //   setTimeout(() => {
  //     //     location.reload();
  //     //   }, 200);
  //     // }

  //     let productTypeForNav = 'estate';
      
      

  //     if(this.location.path().includes('adventure')){
  //       productTypeForNav = 'adventure'
  //     }
  //     if(this.newFilterIso === 'RU'){
  //       this.router.navigate([this.website_language + '/home/estateRu/'])

  //     }
  //     else{
  //       this.router.navigate([this.website_language + '/home/' + productTypeForNav +'/' + this.searchValue.toLowerCase() + '/' + this.newFilterIso.toLowerCase() + "/1"])
  //     }
  //   }
  //   if (this.location.path().length > 16 && this.location.path().length < 52) {
  //     setTimeout(() => {
  //       location.reload();
  //     }, 200);
  //   }
  // }

  // searchForCity() {
  //   const today = new Date();
  //   const defaultFrom = new Date(today);
  //   const defaultTo = new Date(defaultFrom);
  //   defaultFrom.setDate(defaultFrom.getDate() + 14);
  //   defaultTo.setDate(defaultTo.getDate() + 15);

  
  //   const translateIfNeeded = (translatedSearchValue: string) => {
  //     if (this.countryNames.includes(translatedSearchValue)) {
  //       this.router.navigate([this.website_language + '/home/country/' + translatedSearchValue.toLowerCase()]);
  //     } else {
  //       let defaultFromDate = moment(defaultFrom).format("YYYY-MM-DD");
  //       let defaultToDate = moment(defaultTo).format("YYYY-MM-DD");
  //       let today_validate = moment(today).format("YYYY-MM-DD");
  
  //       localStorage.setItem("city", translatedSearchValue.toLowerCase());
  //       if (this.newFilterIso === undefined) {
  //         this.newFilterIso = localStorage.getItem("iso");
  //       } else {
  //         localStorage.setItem("iso", this.newFilterIso.toLowerCase());
  //       }
  
  //       if (localStorage.getItem('fromDate') < today_validate || localStorage.getItem('toDate') < today_validate || localStorage.getItem('fromDate') === null) {
  //         localStorage.setItem('fromDate', defaultFromDate)
  //         localStorage.setItem('toDate', defaultToDate)
  //       } else {
  //         localStorage.setItem("fromDate", this.datePipe.transform(this.fromDate, 'yyyy-MM-dd'));
  //         localStorage.setItem("toDate", this.datePipe.transform(this.toDate, 'yyyy-MM-dd'));
  //       }
  
  //       localStorage.setItem("numberOfChildren", this.childrenCount);
  //       localStorage.setItem("numberOfAdult", this.adultCount);
  

  
  //       let productTypeForNav = 'estate';
  
  //       if (this.location.path().includes('adventure')) {
  //         productTypeForNav = 'adventure';
  //       }
  
  //       if (this.newFilterIso === 'RU') {
  //         this.router.navigate([this.website_language + '/home/estateRu/']);
  //       } else {
  //         this.router.navigate([this.website_language + '/home/' + productTypeForNav + '/' + translatedSearchValue.toLowerCase() + '/' + this.newFilterIso.toLowerCase() + "/1"]);
  //       }
  //     }
  //     if (this.location.path().length > 16 && this.location.path().length < 52) {
  //       setTimeout(() => {
  //         location.reload();
  //       }, 200);
  //     }
  //   };
  
  //   const isRussian = (str: string) => {
  //     return /[а-яА-ЯЁё]/.test(str);
  //   };
  
  //   if (isRussian(this.searchValue)) {
  //     const apiKey = 'AIzaSyB-k4ohUZYjnHODXOZ3k6h1WMkv46eiX3Q';
  //     const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
  //     this.http.post(apiUrl, {
  //       q: this.searchValue,
  //       target: 'en'
  //     })
  //     .subscribe(response => {
  //       const translatedSearchValue = response['data']['translations'][0]['translatedText'];
  //       translateIfNeeded(translatedSearchValue);
  //     }, err => {
  //       console.error('Error while translating:', err);
  //       translateIfNeeded(this.searchValue);
  //     });
  //   } else {
  //     translateIfNeeded(this.searchValue);
  //   }
  // }

  searchForCity() {
    const today = new Date();
    const defaultFrom = new Date(today);
    const defaultTo = new Date(defaultFrom);
    defaultFrom.setDate(defaultFrom.getDate() + 14);
    defaultTo.setDate(defaultTo.getDate() + 15);

    
  
    const translateIfNeeded = (translatedSearchValue: string) => {
      if (this.countryNames.includes(translatedSearchValue)) {
        this.router.navigate([this.website_language + '/home/country/' + translatedSearchValue.toLowerCase()]);
      } else {
        let defaultFromDate = moment(defaultFrom).format("YYYY-MM-DD");
        let defaultToDate = moment(defaultTo).format("YYYY-MM-DD");
        let today_validate = moment(today).format("YYYY-MM-DD");
  
        localStorage.setItem("city", translatedSearchValue.toLowerCase());
        if (this.newFilterIso === undefined) {
          this.newFilterIso = localStorage.getItem("iso");
        } else {
          localStorage.setItem("iso", this.newFilterIso.toLowerCase());
        }
  
        if (localStorage.getItem('fromDate') < today_validate || localStorage.getItem('toDate') < today_validate || localStorage.getItem('fromDate') === null) {
          localStorage.setItem('fromDate', defaultFromDate)
          localStorage.setItem('toDate', defaultToDate)
        } else {
          localStorage.setItem("fromDate", this.datePipe.transform(this.fromDate, 'yyyy-MM-dd'));
          localStorage.setItem("toDate", this.datePipe.transform(this.toDate, 'yyyy-MM-dd'));
        }
  
        localStorage.setItem("numberOfChildren", this.childrenCount);
        localStorage.setItem("numberOfAdult", this.adultCount);
  
  
        let productTypeForNav = 'estate';
  
        if (this.location.path().includes('adventure')) {
          productTypeForNav = 'adventure';
        }

        // if (this.newFilterIso === 'RU' && productTypeForNav !== 'adventure') {
        //   this.router.navigate([this.website_language + '/home/estateRu/']);
        // } else {
        //   this.router.navigate([this.website_language + '/home/' + productTypeForNav + '/' + translatedSearchValue.toLowerCase() + '/' + this.newFilterIso.toLowerCase() + "/1"]);
        // }
        this.router.navigate([this.website_language + '/home/' + productTypeForNav + '/' + translatedSearchValue.toLowerCase() + '/' + this.newFilterIso.toLowerCase() + "/1"]);
      }
      if (this.location.path().length > 16 && this.location.path().length < 52) {
        setTimeout(() => {
          location.reload();
        }, 200);
      }
    };
  
    const isRussianOrArmenianOrGreekOrBulgarian = (str: string) => {
      return /[а-яА-ЯЁёա-ֆԱ-Ֆά-ωϊϋό-ώА-ЯЁёΑ-Ωά-ώ]/.test(str);
    };
  
    if (isRussianOrArmenianOrGreekOrBulgarian(this.searchValue)) {
      const apiKey = 'AIzaSyB-k4ohUZYjnHODXOZ3k6h1WMkv46eiX3Q';
      const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
      this.http.post(apiUrl, {
        q: this.searchValue,
        target: 'en'
      })
      .subscribe(response => {
        const translatedSearchValue = response['data']['translations'][0]['translatedText'];
        translateIfNeeded(translatedSearchValue);
      }, err => {
        console.error('Error while translating:', err);
        translateIfNeeded(this.searchValue);
      });
    } else {
      translateIfNeeded(this.searchValue);
    }
  }

  searchForCityFull() {
    if (!this.searchCityValue) {
      this.searchCityValue = localStorage.getItem('city') || '';
      this.newFilterIso = localStorage.getItem('iso') || '';
    }

    const today = new Date();
    const defaultFrom = new Date(today);
    const defaultTo = new Date(defaultFrom);
    defaultFrom.setDate(defaultFrom.getDate() + 14);
    defaultTo.setDate(defaultTo.getDate() + 15);

  
    const translateIfNeeded = (translatedSearchValue: string) => {
      if (this.countryNames.includes(translatedSearchValue)) {
        this.router.navigate([this.website_language + '/home/country/' + translatedSearchValue.toLowerCase()]);
      } else {
        // if (this.newFilterIso === 'RU' && productTypeForNav !== 'adventure') {
        //   this.router.navigate([this.website_language + '/home/estateRu/']);
        // } else {
        //   this.router.navigate([this.website_language + '/home/' + productTypeForNav + '/' + translatedSearchValue.toLowerCase() + '/' + this.newFilterIso.toLowerCase() + "/1"]);
        // }
        this.router.navigate([this.website_language + '/destination/' + this.searchCityValue.toLowerCase() + '/' +  this.newFilterIso.toLowerCase()]);
        localStorage.setItem('city', this.searchCityValue.toLowerCase())
        localStorage.setItem('iso', this.newFilterIso.toLowerCase())

      }
      if (this.location.path().length > 16 && this.location.path().length < 52) {
        setTimeout(() => {
          location.reload();
        }, 200);
      }
    };
  
    const isRussianOrArmenianOrGreekOrBulgarian = (str: string) => {
      return /[а-яА-ЯЁёա-ֆԱ-Ֆά-ωϊϋό-ώА-ЯЁёΑ-Ωά-ώ]/.test(str);
    };
  
    if (isRussianOrArmenianOrGreekOrBulgarian(this.searchValue)) {
      const apiKey = 'AIzaSyB-k4ohUZYjnHODXOZ3k6h1WMkv46eiX3Q';
      const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
      this.http.post(apiUrl, {
        q: this.searchValue,
        target: 'en'
      })
      .subscribe(response => {
        const translatedSearchValue = response['data']['translations'][0]['translatedText'];
        translateIfNeeded(translatedSearchValue);
      }, err => {
        console.error('Error while translating:', err);
        translateIfNeeded(this.searchValue);
      });
    } else {
      translateIfNeeded(this.searchValue);
    }
  }

  validateAdultCount() {
    if (this.adultCount < 1) {
      this.adultCount = 1;
    }
  }
  
  validateChildrenCount() {
    if (this.childrenCount < 0) {
      this.childrenCount = 0;
    }
  }
  

  getSlideshowData() {
    this.homeData.getSlideshowData().subscribe(
      data => {
        this.slideshowData = data;
      }
    )
  }

  getAllCitiesNamesAndIsos() {
    this.http.get<any>('https://admin.nobitour.com/api/public/allcities').subscribe(data => {
      this.nobiCitiesFilterTest = data.data
    })
  }
}