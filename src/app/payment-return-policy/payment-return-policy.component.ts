import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment-return-policy',
  templateUrl: './payment-return-policy.component.html',
  styleUrls: ['./payment-return-policy.component.css']
})
export class PaymentReturnPolicyComponent implements OnInit {

  showLoader: boolean = false;
  reveal: boolean = false;
  full_url_for_filtering: string;
  filtered_website_language: string;
  

  constructor(private location: Location) { }

  async ngOnInit() {
    this.full_url_for_filtering = this.location.path();
    let splitUrl = this.full_url_for_filtering.split('/');
    this.filtered_website_language = splitUrl[1];
    this.showLoader = true;
    await new Promise(r => setTimeout(r, 1000));
    this.showLoader = false;
    this.reveal = true;
    setTimeout(() => {
      window.scrollTo({ top:500, behavior: 'smooth' });
    }, 500);
  }
  
}
