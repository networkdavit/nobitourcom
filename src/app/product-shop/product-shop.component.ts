// product-shop.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectionService } from '../services/connection.service';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ApiResponse {
  products: any[]; // Assuming an array of products is returned
}

@Component({
  selector: 'app-product-shop',
  templateUrl: './product-shop.component.html',
  styleUrls: ['./product-shop.component.css']
})
export class ProductShopComponent implements OnInit {

  showConvertedPrice: boolean = false;
  conversion_rate: any = '1';
  default_curr: string = '€';

  private apiUrl = 'https://fakestoreapi.com/products';
  products: Product[] = [];

  constructor(private router: Router, private http: HttpClient, private connection: ConnectionService, private homeData: HomeService) { }

  ngOnInit() {
    this.fetchProducts();
    this.fetchNobiartsProducts();
    this.get_currency_logic(this.connection, this.homeData);

    const currentDomain = window.location.hostname;
  
  
    if (currentDomain === 'nobitour.ru') {
      this.default_curr = '₽';
    }
  }

  private fetchProducts() {
    this.http.get<Product[]>(this.apiUrl).subscribe(
      (data) => {
        console.log(data, 'fakeproductrs')
        // this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  private fetchNobiartsProducts() {
    const nobiartsApiUrl = 'https://nobiarts.com/api/products';
    this.http.get<ApiResponse>(nobiartsApiUrl).subscribe(
      (data) => {
        console.log('Nobiarts Products:', data);
        this.products = data.products;
        console.log(this.products, 'test')
      },
      (error) => {
        console.error('Error fetching Nobiarts products:', error);
      }
    );
  }

  navigateToItem(id: number){
    console.log(id)
    const language = localStorage.getItem('lang');
    this.router.navigate([`${language}/shop/item/${id}`]);

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

  redirectTo(product){
    console.log(123)
  }
}
