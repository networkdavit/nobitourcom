import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  showLoader: boolean = false;
  reveal: boolean = false;
  isClient: boolean = true;
  isPartner: boolean = false;
  isPolicy: boolean = false;
  isInformationForBusinessPartners: boolean = false;
  isRomanticTour: boolean = false;
  clientButtonClass: string;
  partnerButtonClass: string;
  policyButtonClass: string;
  romanticButtonClass: string;
  businessButtonClass: string;

  hideTextInNavigation: boolean;
  prevScrollpos: number;
  currentScrollPos: number;
  navigationHeight: number = 80;
  full_url_for_filtering: string;
  filtered_website_language: string;
  productType: string;
  

  constructor( private location: Location, private router: Router) { }

  async ngOnInit() {

    // this.checkOnScroll();
    this.full_url_for_filtering = this.location.path();
    let splitUrl = this.full_url_for_filtering.split('/');
    this.filtered_website_language = splitUrl[1];
    this.clientButtonClass = 'mat-button';
    this.partnerButtonClass = 'mat-button';
    this.businessButtonClass = 'mat-button';
    this.policyButtonClass = 'mat-stroked-button';
    this.romanticButtonClass = 'mat-button';
    this.showLoader = true;
    await new Promise(r => setTimeout(r, 1000));
    this.showLoader = false;
    this.reveal = true;
    setTimeout(() => {
      window.scrollTo({ top:500, behavior: 'smooth' });
    }, 500);
  }

  showPolicy(){
    this.isPolicy = true;
    this.isPartner = false;
    this.isClient = false;
    this.isInformationForBusinessPartners = false;
    this.isRomanticTour = false;
    this.partnerButtonClass = 'mat-button';
    this.clientButtonClass = 'mat-button';
    this.businessButtonClass = 'mat-button';
    this.policyButtonClass = 'mat-stroked-button';
    this.romanticButtonClass = 'mat-button';
  }

  showClientFaq(){
    this.isPolicy = false;
    this.isClient = true;
    this.isPartner = false;
    this.isInformationForBusinessPartners = false;
    this.isRomanticTour = false;
    this.partnerButtonClass = 'mat-button';
    this.clientButtonClass = 'mat-stroked-button';
    this.businessButtonClass = 'mat-button';
    this.policyButtonClass = 'mat-button';
    this.romanticButtonClass = 'mat-button';
  }

  showPartnerFaq(){
    this.isPolicy = false;
    this.isPartner = true;
    this.isClient = false;
    this.isInformationForBusinessPartners = false;
    this.isRomanticTour = false;
    this.partnerButtonClass = 'mat-stroked-button';
    this.clientButtonClass = 'mat-button';
    this.businessButtonClass = 'mat-button';
    this.policyButtonClass = 'mat-button';
    this.romanticButtonClass = 'mat-button';
  }

  showInformationForBusinessPartners(){
    this.isPolicy = false;
    this.isPartner = false;
    this.isClient = false;
    this.isInformationForBusinessPartners = true;
    this.isRomanticTour = false;
    this.partnerButtonClass = 'mat-button';
    this.clientButtonClass = 'mat-button';
    this.businessButtonClass = 'mat-stroked-button';
    this.policyButtonClass = 'mat-button';
    this.romanticButtonClass = 'mat-button';
  }

  showRomanticAdventures(){
    this.isPolicy = false;
    this.isPartner = false;
    this.isClient = false;
    this.isInformationForBusinessPartners = false;
    this.isRomanticTour = true;
    this.partnerButtonClass = 'mat-button';
    this.clientButtonClass = 'mat-button';
    this.businessButtonClass = 'mat-button';
    this.policyButtonClass = 'mat-button';
    this.romanticButtonClass = 'mat-stroked-button';
  }


  goToHome(productType: string) {
    this.productType = productType;
    let cityLocal = localStorage.getItem('city');
    let isoLocal = localStorage.getItem('iso');
    if(this.productType == 'estate'){
      this.router.navigate([this.filtered_website_language + '/home/estate/' + cityLocal + '/' + isoLocal + '/1'])
    } else if(this.productType == 'adventure'){
      this.router.navigate([this.filtered_website_language + '/home/adventure/' + cityLocal + '/' + isoLocal + '/1'])
    } else if(this.productType == 'restaurant'){
      this.router.navigate([this.filtered_website_language + '/home/restaurant/' + cityLocal + '/' + isoLocal + '/1'])
    } else if(this.productType == 'flight' || this.productType == 'rent-a-car' || this.productType == 'insurance' || this.productType == 'personal-transfer' || this.productType == 'avia-bus-russia'){
      this.router.navigate([this.filtered_website_language + '/home/' + this.productType])
    }

    return false;
  }

}
