import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { ConnectionService } from '../services/connection.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-product-city',
  templateUrl: './product-city.component.html',
  styleUrls: ['./product-city.component.css']
})
export class ProductCityComponent implements OnInit {

  recommended_hotels = [];
  recommended_ratehawk_hotels = [];

  website_language: string = "";
  idSlug: string;
  city: string = "";
  iso : string = "";
  recommended_adventures = [];
  conversion_rate: any = '1';
  default_curr: string = '€';
  showConvertedPrice: boolean = false;
  tripster_city_id: number;

  showLoader: boolean = true;
  showAdventures: boolean = true;
  showHotels: boolean = true;
  showRecommendedLoaderEstates: boolean = true;
  showRecommendedLoaderAdventures: boolean = true;

  constructor(private datePipe: DatePipe, private router: Router, private route: ActivatedRoute,private data: HomeService, private connection: ConnectionService) { }

  ngOnInit() {
  
    this.getTripsterCityId(localStorage.getItem('city'));
    console.log(this.tripster_city_id)
    this.website_language = this.route.snapshot.params['website_language'];
    this.city = this.route.snapshot.params['city'];
    this.iso = this.route.snapshot.params['iso'];
    this.get_recommended_hotels(this.city, this.iso);
    this.get_recommended_hotels_from_ratehawkk(this.city, this.iso);
    const fromDateStorage = localStorage.getItem('fromDate');
    const toDateStorage = localStorage.getItem('toDate');
    setTimeout(() => {
          this.get_recommended_adventures(this.tripster_city_id, fromDateStorage, toDateStorage, 3);

    }, 2000);
    this.get_currency_logic(this.connection, this.data);
    localStorage.setItem('city', this.city)
    localStorage.setItem('iso', this.iso)

    const currentDomain = window.location.hostname;
  
  
    if (currentDomain === 'nobitour.ru') {
      this.default_curr = '₽';
      localStorage.setItem('lang', 'ru');
      localStorage.setItem('currency', 'rub');
    }
  }

  stripDecimals(price: number): string {
    return Math.floor(price).toString();
  }

  onShowLoader(value: boolean) {
    this.showLoader = value;
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

  get_recommended_hotels(city_value, iso_value){
    this.data.getCityEstates(city_value, iso_value).subscribe(
      (data)=>{
        if (data.products && data.products.length > 0) {
          this.recommended_hotels = data.products.slice(0, 10);
          this.showRecommendedLoaderEstates = false;
        } else {
          this.showHotels = false;
        }
      }
    )

  }

  get_recommended_hotels_from_ratehawkk(city_value, iso_value){
    const fromDateStorage = localStorage.getItem('fromDate');
    const toDateStorage = localStorage.getItem('toDate');
    this.data.getAllRateHawkEstates(fromDateStorage, toDateStorage, 'ru', city_value, iso_value,2,0).subscribe(
      (data)=>{
        if (data.data.length > 0) {
          this.recommended_ratehawk_hotels = data.data.slice(0, 10);
          this.showRecommendedLoaderEstates = false;
        } else {
          this.showHotels = false;
        }
      }
    )
  }

  get_recommended_adventures(city, start_date, end_date, persons_count){
    this.data.getTripsterAdventures(city, start_date, end_date, persons_count).subscribe(
      (data) => { 
        if (data.products && data.products.length > 0) {
          this.recommended_adventures = data.products.slice(0, 10);
          this.showRecommendedLoaderAdventures = false;
        } else {
          this.showAdventures = false;
        }
      }
    );
  }
  

  onCurrencyDataReceived(currencyData) {
    localStorage.setItem('currency', currencyData);
    this.get_currency_logic(this.connection, this.data);
  }

  get_currency_logic(conn, data) {
    console.log(1234567)
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
          console.log('imhere')
          if (curr == "amd" || curr == "rub" || curr == "bgn") {
            this.conversion_rate = data.rate;
            console.log(this.conversion_rate, 'conversionrate')
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

  redirectTo(estate) {
    if(estate.partnerId === "h"){
      const id = estate.id

      window.open('/redirect-to/' + this.website_language + '/' + id, '_blank');
    }

  }

  redirect_to_zenhotels(id, mid, city, country, region_id){
    const formattedCity = city.replace(/\s+/g, '_');
    const formattedCountry = country.replace(/\s+/g, '_');

    // window.open(url)
    const fromDate = localStorage.getItem('fromDate')
    const toDate = localStorage.getItem('toDate')
    const currency = localStorage.getItem('currency')
    const numberOfAdult = localStorage.getItem('numberOfAdult');
    const numberOfChildren = localStorage.getItem('numberOfChildren');
    
    // Convert string values to integers (parse as integers)
    const adultCount = numberOfAdult ? parseInt(numberOfAdult, 10) : 0;
    const childrenCount = numberOfChildren ? parseInt(numberOfChildren, 10) : 0;
    let curr = localStorage.getItem('currency');
    if (curr == 'euro'){
      curr = 'eur'
    }
    // Calculate guest count
    const guestCount = adultCount + childrenCount;
    const formattedFromDate = this.datePipe.transform(fromDate, 'dd.MM.yyyy');
    const formattedToDate = this.datePipe.transform(toDate, 'dd.MM.yyyy');
    const url_room = `https://www.ostrovok.ru/hotel/${formattedCountry}/${formattedCity}/mid${mid}/${id}/?q=${region_id}&cur=${curr}&lang=${this.website_language}&dates=${formattedFromDate}-${formattedToDate}&guests=${guestCount}&price=one&room=s-7b983416-48a1-5093-8569-0c07390fc5ad&serp_price=${id}.114931.RUB.h-e8a030f7-fbc1-5242-a8fe-2dfe3f8227bd&sid=3890f01f-c1ae-4d72-99f4-b9557575beb8`
    window.open(url_room)
  }
  navigateToIpRecommendedAdventureOrEstate(id, slug, product_type) {
    this.idSlug = id + '-' + slug;
    if(product_type === 'adventure'){
      this.router.navigate([this.website_language + '/home/' + product_type +'/' + this.idSlug])
    }
    else if(product_type === 'estate'){

      this.router.navigate([this.website_language + '/home/' + product_type +'/' + this.idSlug])
    }
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }

  navigateToMore(product_type){
    this.router.navigate([this.website_language + '/home/' + product_type +'/' + this.city + '/' + this.iso + '/1'])

  }
}
