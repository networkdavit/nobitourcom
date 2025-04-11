import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectionService } from '../services/connection.service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-product-shop-item',
  templateUrl: './product-shop-item.component.html',
  styleUrls: ['./product-shop-item.component.css']
})
export class ProductShopItemComponent implements OnInit {
  product: any; 

  showConvertedPrice: boolean = false;
  conversion_rate: any = '1';
  default_curr: string = '€';

  constructor(private http: HttpClient,  private connection: ConnectionService, private homeData: HomeService) { }

  ngOnInit() {
    const productId = this.extractProductIdFromUrl(); // Assuming you have a method to extract the product ID from the URL
    this.fetchProduct(productId);
    this.get_currency_logic(this.connection, this.homeData);
    const currentDomain = window.location.hostname;
  
  
    if (currentDomain === 'nobitour.ru') {
      this.default_curr = '₽';
    }
  }

  private extractProductIdFromUrl(): number {
    // Logic to extract the product ID from the URL
    const url = window.location.href;
    const productId = parseInt(url.substring(url.lastIndexOf('/') + 1));
    return productId;
  }

  private fetchProduct(productId: number) {
    const apiUrl = `https://nobiarts.com/api/products/${productId}`;
    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        console.log('Product:', data);
        this.product = data; // Assign the retrieved product to the property
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
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
}
