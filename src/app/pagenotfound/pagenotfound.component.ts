import { Component, OnInit, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { Location } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { isPlatformServer } from '@angular/common';
import { Request } from 'express';


@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private location: Location, @Inject(PLATFORM_ID) private platformId: any,
  @Optional() @Inject(REQUEST) private request: Request) { }

  showLoader: boolean= false;
  reveal: boolean = false;

  async ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      if (this.request.res) {
        this.request.res.status(404);
      }
    }
    this.showLoader = true;
    await new Promise(r => setTimeout(r, 1000));
    this.showLoader = false;
    this.reveal = true;
  }

  goBack(){
    this.location.back();
  }
}
