import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-estate-filtered',
  templateUrl: './estate-filtered.component.html',
  styleUrls: ['./estate-filtered.component.css']
})
export class EstateFilteredComponent implements OnInit {
  
  constructor(
    private HomeComponent: HomeComponent,
  ) { }

  ngOnInit() {

  }

  //this.HomeComponent.filterProducts()
  showLoader = this.HomeComponent.showLoader;
  underMaitenance = this.HomeComponent.underMaitenance;
  //cityId change
  cityId = this.HomeComponent.cityId;
  city_name_url_search = this.HomeComponent.city_name_url_search;
  
  fill_the_form(){
    //this is supposed to auto fill the search form with city name
  }
}
