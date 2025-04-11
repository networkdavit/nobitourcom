import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  showLoader: boolean = false;
  full_url_for_filtering: string;
  filtered_website_language: string;
  productType: string;
  

  constructor(private location: Location, private router: Router) { }

  async ngOnInit() {
    this.full_url_for_filtering = this.location.path();
    let splitUrl = this.full_url_for_filtering.split('/');
    this.filtered_website_language = splitUrl[1];
    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
      window.scrollTo({ top:500, behavior: 'smooth' });
    }, 500);
  }
}
