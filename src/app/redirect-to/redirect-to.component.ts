import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-redirect-to',
  templateUrl: './redirect-to.component.html',
  styleUrls: ['./redirect-to.component.css']
})
export class RedirectToComponent implements OnInit {

  private routeSub: Subscription;
  productId: any;
  currentLang: string;
  agodaProductUrl: string;

  fromDate: any = '';
  toDate: any = '';
  numberOfAdultsForApi: any = '1';
  numberOfChildrenForApi: any = '0';
  inUrlPartnerId: string= "";
  newProductId: string = '';
  filtered_website_language: string= '';

  constructor( private location: Location, public translate: TranslateService, private route: ActivatedRoute, private data: ProductService, private cookieService: CookieService) {

   }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      console.log('params', params) //log the entire params object
      this.productId = params['productId'];
      this.currentLang = params['currentLang'];
    });
    this.filtered_website_language = localStorage.getItem('lang')
    const url = this.location.path();
    console.log(url)
    const splitProductUrl = url.split("/");
    this.newProductId= splitProductUrl[3];
    this.newProductId= "h-" + this.newProductId;
    console.log(splitProductUrl, splitProductUrl[3], "????")

    this.translate.setDefaultLang(this.currentLang);
    this.cookieService.set('currentLang', this.currentLang);
    //session storage everything here
    let fromDateSession = localStorage.getItem('fromDate');
    let toDateSession = localStorage.getItem('toDate');
    let numberOfAdultsSession = localStorage.getItem('numberOfAdult');
    let numberOfChildrenSession = localStorage.getItem('numberOfChildren');

    if(fromDateSession != null && toDateSession != null){
      this.fromDate = localStorage.getItem('fromDate');
      this.toDate = localStorage.getItem('toDate');
    }
    else{
      this.fromDate = '';
      this.toDate = '';
      localStorage.setItem('fromDate', this.fromDate);
      localStorage.setItem('toDate', this.toDate);
    }

    if(numberOfAdultsSession != null && numberOfChildrenSession != null){
      this.numberOfAdultsForApi = localStorage.getItem('numberOfAdult');
      this.numberOfChildrenForApi = localStorage.getItem('numberOfChildren');
    }
    if(numberOfAdultsSession === null && numberOfChildrenSession === null){
      this.numberOfAdultsForApi = 2;
      this.numberOfChildrenForApi = 0;
    }

    this.redirectToEstateorAdventure();
  }


  redirectToEstateorAdventure() {
    console.log(23098)

    this.data.getEstateDatav2(this.inUrlPartnerId,this.newProductId, this.filtered_website_language, this.fromDate, this.toDate, this.numberOfAdultsForApi, this.numberOfChildrenForApi).subscribe(
      data => {
        if(data != null){

          // this.agodaProductUrl = data.product_checkout_url;
          let tempUrl = `${data.outerLink}&adults=${this.numberOfAdultsForApi}&children=${this.numberOfChildrenForApi}`;
          console.log(tempUrl, "hotellook")
          setTimeout(function () { window.location.href = tempUrl }, 1000);

        }
      }
    )
    // this.data.getEstateById(this.productId, this.currentLang, this.fromDate, this.toDate, this.numberOfAdultsForApi, this.numberOfChildrenForApi).subscribe(
    //   data => {
    //     //if statement below makes the code more efficient and ignores estate data if it is null
    //     if(data != null){
    //       console.log('getProductById respons data', data)
    //       console.log(this.fromDate, this.toDate,  " asfasdfasfadsfas")
    //       this.agodaProductUrl = data.product_checkout_url;
    //       let tempUrl = this.agodaProductUrl;

    //       setTimeout(function () { window.location.href = tempUrl }, 2000);

    //     }
    //   }
    // );
    this.data.getAdventureById(this.productId, this.currentLang, this.fromDate, this.toDate, this.numberOfAdultsForApi, this.numberOfChildrenForApi).subscribe(
      data => {
        console.log('getProductById respons data adventure', data)
        this.agodaProductUrl = data.product_checkout_url;
        let tempUrl = this.agodaProductUrl;

        setTimeout(function () { window.location.href = tempUrl }, 500);

      }
    );
  }

}
