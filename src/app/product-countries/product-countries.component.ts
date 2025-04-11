import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from '../services/connection.service';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-countries',
  templateUrl: './product-countries.component.html',
  styleUrls: ['./product-countries.component.css']
})
export class ProductCountriesComponent implements OnInit {

  country: string = "";
  website_language: string = "";
  country_hotels = [];
  country_adventures = [];
  cities = [];
  cityImages = [];
  conversion_rate: any = '1';
  default_curr: string = '€';
  showConvertedPrice: boolean = false;
  showLoader: boolean = false;
  idSlug: string;

  constructor(private router: Router, private route: ActivatedRoute, private connection: ConnectionService, private data: HomeService) { }

  ngOnInit() {
    this.get_currency_logic(this.connection, this.data);
    this.website_language = localStorage.getItem('lang');
    this.route.params.subscribe(params => {
      this.country = params['country'];
      console.log(this.country);
    });
    // this.getAllData();
    // this.getTempData();
    // this.fetchCityPhoto(this.cities);
    setTimeout(() => {
      window.scrollTo({ top:500, behavior: 'smooth' });
    }, 1000);
    this.getExcursionData();
    this.getEstateData();
  }

  getAllData() {
    this.showLoader = true;
    this.data.getCountryHotelsandAdventures(this.country).subscribe(
      data => {
        console.log(data);
        // this.country_adventures = data.data.slice(0, 9);
        this.country_hotels = data.data.slice(9, 18);
        this.cities = data.data.slice(18,21);
        this.showLoader = false;
      }
    );
  }
  
  getExcursionData(){
    this.data.getCountryExcursions(this.country).subscribe(
      data=>{
        this.country_adventures = data;
      }
    )
    console.log(this.country_adventures, "?????")
  }

  getEstateData(){
    // this.showLoader = true;
    this.data.getCountryEstates(this.country).subscribe(
      data=>{
        this.country_hotels = data.data;
        // this.showLoader = false;

      }
    )
    console.log(this.country_adventures, "?????")
  }


  fetchCityPhoto(cities) {
    const accessKey = 'uQltcCyvMH6_RmgOWpU6GU9c3K2xJqAbwTV-9Am0GXc';
    for (let city of cities) {
      fetch(`https://api.unsplash.com/photos/random?query=${this.country} ${city}&client_id=${accessKey}`)
        .then(response => response.json())
        .then(data => {
          const photoURL = data.urls.regular;
          this.cityImages.push({ city, photoURL });
        })
        .catch(error => {
          console.error('Error fetching photo:', error);
        });
    }
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

  onCurrencyDataReceived(currencyData) {
    localStorage.setItem('currency', currencyData);
    this.get_currency_logic(this.connection, this.data);
  }

  onShowLoader(value: boolean) {
    this.showLoader = value;
  }

  navigateToIpRecommendedAdventureOrEstate(id, slug, product_type) {
    this.idSlug = id + '-' + slug;
    if(product_type === 'adventure'){
      this.router.navigate([this.website_language + '/home/' + product_type + "/" + this.idSlug])
    }
    else if(product_type === 'estate'){
      this.router.navigate([this.website_language + '/home/' + product_type +'/a-' + this.idSlug])
    }
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }

  navigateToCity(city, iso){
    this.router.navigate([this.website_language + '/home/estate/' + city + "/" + iso + "/1"])
  }
}
