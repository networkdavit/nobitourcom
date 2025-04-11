import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  ipAddress: any;
  ip_country_name: any;

  constructor(private connection: ConnectionService, private router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
    if(localStorage.getItem("welcome_executed") !== "true"){
      this.changeLangaBasedOnIp()
    }
  }


  changeLangaBasedOnIp() {
    this.connection.getIPv4Address().subscribe(response => {
      this.ipAddress = response;
      this.ip_country_name = this.ipAddress.country;
      if ( this.ip_country_name == "Armenia") {
        this.router.navigate(['hy/welcome'])
        this.translate.setDefaultLang('hy');
      }
      else if(this.ip_country_name == "Bulgaria"){
        this.translate.setDefaultLang('bg');
      }
      else if(this.ip_country_name == "Russia"){
        this.translate.setDefaultLang('ru');
      }
      else {
        this.translate.setDefaultLang('en');
      }
      localStorage.setItem('welcome_executed', 'true')
      
    })
   
  }
  
}
