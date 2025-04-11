import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.css']
})
export class BottomComponent implements OnInit {

  website_language: string;
  currentYear: number = new Date().getFullYear();

  constructor(private router: Router) { }

  ngOnInit() {
    this.website_language = localStorage.getItem('lang');
  }

  goToHome(searchKey: string) {
    this.website_language = localStorage.getItem('lang');
    let cityLocal = localStorage.getItem('city');
    let isoLocal = localStorage.getItem('iso');
    // if(cityLocal == null && isoLocal == null){
    //   cityLocal = 'london';
    //   isoLocal = 'gb'
    // }
    if(this.website_language == null){
      this.website_language = 'en';
    }
    if (searchKey != 'flight' && searchKey != 'rent-a-car' && searchKey != 'insurance' && searchKey != 'personal-transfer' && searchKey != 'avia-bus-russia') {
      this.router.navigate([this.website_language + '/home/' + searchKey + "/" + localStorage.getItem('city') +  "/" + localStorage.getItem('iso') + "/1"])
      .then(() => {
        window.location.reload();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    else if (searchKey == 'flight' || searchKey == 'rent-a-car' || searchKey == 'insurance' || searchKey == 'personal-transfer' || searchKey == 'avia-bus-russia'){
      this.router.navigate([this.website_language +'/home/' + searchKey]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }    // return false;
  }

  
  goToWhilteLabel(url){
    window.open(url)
  }
  
  openFooterLink(page){
    this.website_language = localStorage.getItem('lang');
    this.router.navigate([this.website_language + '/' + page]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
