import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Observable } from 'rxjs';
import { HomeService } from '../services/home.service';
import { map, startWith } from 'rxjs/operators';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Meta } from '@angular/platform-browser';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';
import { ConnectionService } from '../services/connection.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})

export class IntroComponent implements OnInit {

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
      1200: {
        slidesPerView: 5
      },
      1400: {
        slidesPerView: 7
      }
    },
  };

  @ViewChild("placesRef", { static: false }) placesRef: GooglePlaceDirective;
  @ViewChild('usefulSwiperPartner', { static: false }) usefulSwiperPartner: SwiperComponent;
  @ViewChild('usefulSwiperMenu', { static: false }) usefulSwiperMenu: SwiperComponent;

  search: string = '';
  fromDate: any = '';
  toDate: any = '';
  guests: number;
  productType: string = 'estate';
  language: string;
  keywordSearch: string = '';
  countryISO: any = '';
  cityId: any = '';
  adultNumber = '';
  childrenNumber = '';
  cPage: number = 1;

  recommendedHotels = [];
  recommendedAdventures = [];
  randomRecommendedHotels = [[], [], []];
  randomRecommendedAdventures = [[], [], []];
  recommendedCountries = [];
  recommendedByIp = [];
  recommendedCitiesFromAgoda = [];
  recommendedAdventuresFromTripster: any[] = [];
  recommendedEstatesFromRateHawk : any;
  showLoader: boolean = false;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  adventure: any = { city: '' };
  adventureProucts: any = '';
  estate: any = { city: '' };
  estateProucts: any = '';
  restaurant: any = { city: '' };
  restaurantProucts: any = '';
  keyword: string = '';
  showConvertedPrice: boolean = false;

  isSelected: boolean = false;
  productCity: any;
  website_language: string;
  full_url_for_filtering: string;
  available_ip_adventures: boolean = false;

  randomCity: string;
  randomCityImage: string;
  randomCountryIso: string;
  idSlug: string;
  isMenuOpen: boolean = false;
  bot_options = [];
  bot_responses = [];
  top_level_bot = [];
  mid_level_bot_hotels = [];
  responses_bot_contact = [];
  responses_bot_hotels = [];
  load_option: boolean = false;
  showRecommendedLoader: boolean = true;

  conversion_rate: any = '1';
  default_curr: string = '€';
  ipAddress: any = "";
  ip_country_name: any= "";
  city: string = 'Yerevan';
  showBanners: boolean = false;

  constructor(private datePipe: DatePipe,private http: HttpClient, private connection: ConnectionService, private router: Router, private data: HomeService, private cookieService: CookieService, private meta: Meta, private location: Location) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),

    );
  }

  ngOnInit() {
    setTimeout(() => {
          this.get_currency_logic(this.connection, this.data);
    }, 1000);
    this.language = localStorage.getItem('lang');
    this.loadIntroAdventuresData();
    this.loadIntroEstatesData();
    this.full_url_for_filtering = this.location.path();
    this.getRecommendedData();
    this.website_language = localStorage.getItem('lang');
    this.getRecommendedDataByCountry(this.website_language, localStorage.getItem('ipUserCountry'));
    if (this.location.path() == "") {
      this.router.navigate(["/" + this.website_language])

    }
    this.getIpAddress();
    // this.getTripsterAdventures();
    this.getRecommendedAdventures();
    setTimeout(() => {
      console.log(this.recommendedByIp, 1)
    }, 3000);
  }


  getIpAddress() {
    this.connection.getIPv4Address().subscribe(response => {
      this.ipAddress = response;
      this.ip_country_name = this.ipAddress.country_name;
      console.log('12341234', this.ip_country_name)

      localStorage.setItem('ipUserCountry', this.ip_country_name);
      if (this.ip_country_name == "Russia" || this.ip_country_name == "Armenia" || this.ip_country_name == "Georgia") {
        this.showBanners = true;
      }

    })
  }


  get_currency_logic(conn, data) {
    if (localStorage.getItem('currency')) {
      const country = localStorage.getItem('ipUserCountry');
      if (country == "Armenia") {
        console.log('currency check')

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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  onCurrencyDataReceived(currencyData) {
    localStorage.setItem('currency', currencyData);
    this.get_currency_logic(this.connection, this.data);
  }

  setKeywordToCityAndIso(productCity, countryIso, cityId) {
    this.cityId = cityId;
    this.keywordSearch = productCity;
    this.countryISO = countryIso;
    this.isSelected = true;
  }

  onShowLoader(value: boolean) {
    this.showLoader = value;
  }

  goToHome(productType: string) {
    this.productType = productType;
    this.website_language = localStorage.getItem('lang');

    if (this.website_language == null) {
      this.website_language = 'en';
    }

    if (this.productType != 'flight' && this.productType != 'rent-a-car' && this.productType != 'insurance' && this.productType != 'personal-transfer' && this.productType != 'estateRu' && this.productType != 'adventureRu' && this.productType != 'avia-bus-russia') {
      this.router.navigate([this.website_language + '/home/' + this.productType + "/" + localStorage.getItem('city') + "/" + localStorage.getItem('iso') + "/" + this.cPage.toString()])

    }
    else if (this.productType == 'flight' || this.productType == 'rent-a-car' || this.productType == 'insurance' || this.productType == 'personal-transfer' || this.productType == 'estateRu' || this.productType == 'adventureRu' || this.productType == 'avia-bus-russia') {
      this.router.navigate([this.website_language + '/home/' + this.productType]);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.estateProucts.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  navigateToRecommendedCity(city, iso, productType) {
    this.website_language = localStorage.getItem('lang');
    this.router.navigate(['/' + this.website_language + '/home/' + productType + "/" + city.toLowerCase() + "/" + iso + "/1"])
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }

  navigateToIpRecommendedAdventureOrEstate(id, slug, product_type) {
    this.idSlug = id + '-' + slug;
    if(product_type === 'adventure'){
      this.router.navigate([this.language + '/home/' + product_type +'/' + this.idSlug])
    }
    else if(product_type === 'estate'){
      this.router.navigate([this.language + '/home/' + product_type +'/' + this.idSlug])
    }
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }


  myFilter = (d: Date | null): boolean => {

    let freeDates = [
      "Mon Nov 02 2020 00:00:00 GMT+0200 (Eastern European Standard Time)",
    ]
    return d.toString() != freeDates[0] || d.toString() != freeDates[1] || d.toString() != freeDates[2] || d.toString() != freeDates[3] || d.toString() != freeDates[4] || d.toString() != freeDates[5] || d.toString() != freeDates[6] || d.toString() != freeDates[7] || d.toString() != freeDates[8] || d.toString() != freeDates[9] || d.toString() != freeDates[10] || d.toString() != freeDates[11] || d.toString() != freeDates[12] || d.toString() != freeDates[13] || d.toString() != freeDates[14] || d.toString() != freeDates[15] || d.toString() != freeDates[16] || d.toString() != freeDates[17] || d.toString() != freeDates[18] || d.toString() != freeDates[19] || d.toString() != freeDates[20] || d.toString() != freeDates[21] || d.toString() != freeDates[22] || d.toString() != freeDates[23] || d.toString() != freeDates[24] || d.toString() != freeDates[25] || d.toString() != freeDates[26] || d.toString() != freeDates[27] || d.toString() != freeDates[28] || d.toString() != freeDates[29] || d.toString() != freeDates[30] || d.toString() != freeDates[31];
  }

  getRecommendedByIp() {
   
  }

  getTripsterAdventures(){
   
    this.data.getTripsterAdventures(146, localStorage.getItem('fromDate'), localStorage.getItem('toDate'), localStorage.getItem('numberOfAdult')).subscribe(
      data => {
       
        const adventures = data.products;
        for(let i=0; i< 2; i++){
          this.recommendedByIp.push(adventures[i])
          if(i === 1){
            this.showLoader = false;
            console.log(this.recommendedByIp, 'test')
          }
        }
       
      }
    )

    const cities = ["cairo", "rome", "sofia", "athens"]
    const isos = ["eg", "it", "bg", "gr"]

    for(let i = 0; i < cities.length; i ++){
      this.http.get(`https://admin.nobitour.com/api/public/t-adventure?language=en&city=${cities[i]}&countryISO=${isos[i]}&numberOfAdult=2&numberOfChildren=0&currency=EUR`).subscribe(
      (data: any) => {
        const adventures = data.products.slice(0, 2); // Get the first 8 results
        // this.recommendedByIp = adventures;
        this.recommendedByIp.push(adventures[0])
        this.recommendedByIp.push(adventures[1])
        console.log(adventures, "advs")
        this.showLoader = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.showLoader = false; // Handle errors appropriately
      }
    );
    }
    
  }

  getRecommendedAdventures(){
   
    this.data.getAdventuresRecommendedOwnApi().subscribe(
      data => {
        for(let i =0 ; i < 10; i++){
          this.recommendedByIp.push(data[i])
        }
        
      }
    )
  }
  

  getRecommendedDataByCountry(lang, country) {

  }

  // getRecommendedData() {
  //   let isoListForIntroRecommended = 'th,bg,es';
  //   this.data.getRecommendedForIntro(isoListForIntroRecommended).subscribe(data => {
  //     this.recommendedHotels = data.estate;
  //     this.recommendedAdventures = data.adventure;
  //     for (let i = 0; i < 3; i++) {
  //       this.recommendedCountries.push(this.recommendedHotels[i].country);
  //       let randomIndexes = [];
  //       let length = this.recommendedHotels[i].cities.length - 1;
  //       if (length === 0 || length === 1 || length === 2) {
  //         for (let j = 0; j < length + 1; j++) {
  //           let randomCity = { "name": "", "img": "", "iso": "", "url": "", "productType": "" };
  //           randomCity.name = this.recommendedHotels[i].cities[j].city;
  //           randomCity.img = this.recommendedHotels[i].cities[j].photo1;
  //           randomCity.iso = this.recommendedHotels[i].cities[j].country_iso.toLowerCase();
  //           randomCity.url = this.recommendedHotels[i].cities[j].photo1;
  //           randomCity.productType = 'estate';
  //           this.randomRecommendedHotels[i].push(randomCity);
  //         }
  //       }
  //       while (randomIndexes.length < 5 && length != 0 && length != 1 && length != 2) {
  //         let r = Math.floor(Math.random() * length) + 1;
  //         if (randomIndexes.indexOf(r) === -1) {
  //           randomIndexes.push(r);
  //           let randomCity = { "name": "", "img": "", "iso": "", "url": "", "productType": "" };
  //           randomCity.name = this.recommendedHotels[i].cities[r].city;
  //           randomCity.img = this.recommendedHotels[i].cities[r].photo1;
  //           randomCity.iso = this.recommendedHotels[i].cities[r].country_iso.toLowerCase();
  //           randomCity.url = encodeURI(randomCity.name).toLowerCase() + "/" + encodeURI(randomCity.iso);
  //           randomCity.productType = 'estate';
  //           this.randomRecommendedHotels[i].push(randomCity);
  //         }
  //       }
  //     }
  //     this.recommendedCountries = [];
  //     for (let i = 0; i < 3; i++) {
  //       this.recommendedCountries.push(this.recommendedAdventures[i].country);
  //       let randomIndexes = [];
  //       let length = this.recommendedAdventures[i].cities.length - 1;
  //       if (length === 0 || length === 1 || length === 2) {
  //         for (let j = 0; j < length + 1; j++) {
  //           let randomCity = { "name": "", "img": "", "iso": "", "productType": "" };
  //           randomCity.name = this.recommendedAdventures[i].cities[j].city;
  //           randomCity.img = this.recommendedAdventures[i].cities[j].photo1;
  //           randomCity.iso = this.recommendedAdventures[i].cities[j].country_iso.toLowerCase();
  //           randomCity.productType = 'adventure';
  //           this.randomRecommendedAdventures[i].push(randomCity);
  //         }
  //       }
  //       while (randomIndexes.length < 3 && length != 0 && length != 1 && length != 2) {
  //         let r = Math.floor(Math.random() * length) + 1;
  //         if (randomIndexes.indexOf(r) === -1) {
  //           randomIndexes.push(r);
  //           let randomCity = { "name": "", "img": "", "iso": "", "productType": "", "url": "" };
  //           randomCity.name = this.recommendedAdventures[i].cities[r].city;
  //           randomCity.img = this.recommendedAdventures[i].cities[r].photo1;
  //           randomCity.iso = this.recommendedAdventures[i].cities[r].country_iso.toLowerCase();
  //           randomCity.productType = 'adventure';
  //           randomCity.url = encodeURI(randomCity.name).toLowerCase() + "/" + encodeURI(randomCity.iso);
  //           this.randomRecommendedAdventures[i].push(randomCity);
  //         }
  //       }
  //     }
  //   })

  // }
  
  getRecommendedData() {
    const cities = [
      { city: 'yerevan', countryCode: 'am' },
      { city: 'sofia', countryCode: 'bg' },
      { city: 'tbilisi', countryCode: 'ge' },
      { city: 'athens', countryCode: 'gr' },
      { city: 'paris', countryCode: 'fr' }
    ];
  
    let fromDate = localStorage.getItem('fromDate');
    let toDate = localStorage.getItem('toDate');
    let adultNumber = localStorage.getItem('numberOfAdult');
    let childrenNumber = localStorage.getItem('numberOfChildren');
    let lang = localStorage.getItem('lang');
    // if(adultNumber === null){
    //   adultNumber = "2"
    // }
    // if(childrenNumber === null){
    //   childrenNumber = "0"
    // }
  
    // for (let i = 0; i < cities.length; i++) {
    //   const city = cities[i];
    //   this.data.getAgodaHotels(fromDate, toDate, lang, city.city, city.countryCode, adultNumber, childrenNumber).subscribe(
    //     data => {
    //       const recommendedData1 = data.products[0];
    //       const recommendedData2 = data.products[1];
    //       this.recommendedCitiesFromAgoda.push(recommendedData1, recommendedData2);
    //     }
    //   );
    // }

    this.data.getAgodaRecommendedOwnApi().subscribe(
      data => {
        for(let i = 0; i < 6; i++){

          console.log(data[0].data)
          this.recommendedCitiesFromAgoda.push(data[i].data[0])
          this.recommendedCitiesFromAgoda.push(data[i].data[1])

        }
        
        const recommendedData1 = data.products[0];
        const recommendedData2 = data.products[1];
        // this.recommendedCitiesFromAgoda.push(recommendedData1, recommendedData2);
      }
    )
    
  }
  

  nextPartner() {
    this.usefulSwiperPartner.swiper.slideNext();
  }

  prevPartner() {
    this.usefulSwiperPartner.swiper.slidePrev();
  }


  getRecommendedHotelsFromAgoda() {
    this.data.getRecommendedHotelsFromAgoda(this.website_language).subscribe(
      data=>{
        this.recommendedCitiesFromAgoda = data;
      }
    )
  }

  redirectTo(estate) {
    if(estate.partnerId === "a"){
      const id = estate.id.slice(2)
      window.open('/redirect-to/' + this.website_language + '/' + id, '_blank');
    }

  }


  loadIntroAdventuresData(): void {
    this.data.getAdventuresIntroData().subscribe(
      data => {
        console.log('JSON Data:', data);
        this.recommendedAdventuresFromTripster = data;
        console.log('Adventures:', this.recommendedAdventuresFromTripster);
      },
      error => {
        console.error('Failed to fetch intro data:', error);
      }
    );
  }

  loadIntroEstatesData(): void {
    this.data.getEstatesIntroData().subscribe(
      data => {
        console.log('JSON Data:', data);
        this.recommendedEstatesFromRateHawk = data.data;
        console.log('data for estates', data)
        console.log('Adventures:', this.recommendedEstatesFromRateHawk);
      },
      error => {
        console.error('Failed to fetch intro data:', error);
      }
    );
  }

  redirect_to_zenhotels(id, mid, city, country, region_id) {
    // Replace spaces in city name with underscores
    const formattedCity = city.replace(/\s+/g, '_');
    const formattedCountry = country.replace(/\s+/g, '_');
  
    // Calculate fromDate (7 days after today) and toDate (8 days after today)
    const today = new Date();
    const fromDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days later
    const toDate = new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000); // 8 days later
  
    // Format dates for URL
    const formattedFromDate = this.datePipe.transform(fromDate, 'dd.MM.yyyy');
    const formattedToDate = this.datePipe.transform(toDate, 'dd.MM.yyyy');
    
    console.log(`${formattedFromDate} ${formattedToDate} todatefromdate`);
  
    console.log(id, 'id');
  
    // Convert string values to integers (parse as integers)
    const numberOfAdult = localStorage.getItem('numberOfAdult');
    const numberOfChildren = localStorage.getItem('numberOfChildren');
    const adultCount = numberOfAdult ? parseInt(numberOfAdult, 10) : 0;
    const childrenCount = numberOfChildren ? parseInt(numberOfChildren, 10) : 0;
  
    // Calculate guest count
    const guestCount = adultCount + childrenCount;
    console.log(this.default_curr, 'defailt ')
    let curr = localStorage.getItem('currency');
    if (curr == 'euro'){
      curr = 'eur'
    }
    console.log(curr)
    // Construct the URL
    const url_room = `https://www.ostrovok.ru/hotel/${formattedCountry}/${formattedCity}/mid${mid}/${id}/?q=${region_id}&cur=${curr}&lang=${this.website_language}&dates=${formattedFromDate}-${formattedToDate}&guests=${guestCount}&price=one&room=s-7b983416-48a1-5093-8569-0c07390fc5ad&serp_price=${id}.114931.RUB.h-e8a030f7-fbc1-5242-a8fe-2dfe3f8227bd&sid=3890f01f-c1ae-4d72-99f4-b9557575beb8`;
  
    console.log(url_room, 'url room');
    window.open(url_room);
  }
  

}