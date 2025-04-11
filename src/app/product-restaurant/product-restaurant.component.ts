import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../services/snackbar.service';
import { ProductService } from '../services/product.service';
import { DialogViewImagesComponent } from '../dialog-view-images/dialog-view-images.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DialogAmenitiesComponent } from '../dialog-amenities/dialog-amenities.component';
import { Product } from '../models/product.interface';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product-restaurant',
  templateUrl: './product-restaurant.component.html',
  styleUrls: ['./product-restaurant.component.css']
})
export class ProductRestaurantComponent implements OnInit {

  @ViewChild('resetBookingForm', {
    static: true
  }) resetBookingForm: NgForm;

  bookingFormGroup: FormGroup;

  private routeSub: Subscription;
  productId: any;
  restaurant: any;
  freeDates: Date = new Date();
  minDate: Date = new Date();

  showLoader: boolean = true;

  valueRoom = 0;
  valueAdults = 0;
  valueChildren = 0;

  enableRoom = true;
  enableAdult = true;
  enableChildren = true;
  productType: any;

  reviews: any[] = [];

  clientId: string;
  favoriteId: number;

  tours = [];
  restorantId: any;
  isFavorite: boolean;
  url: any;
  copied = false;
  existDate: boolean;
  translateSnackBar: any;

  limit: number = 24;
  offset: number = 0;
  totalResult: number;

  search: string = '';
  fromPrice: any = '';
  toPrice: any = '';
  fromDate: any = '';
  toDate: any = '';

  formattedDateFrom: any;
  formattedDateTo: any;
  idRestaurant: any;

  hideTextInNavigation: boolean;
  prevScrollpos: number;
  currentScrollPos: number;
  navigationHeight: number = 80;

  googlePlaceUrl: string;
  currentLang: string;

  constructor(private data: ProductService, private snackBar: SnackBarService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private formBuilder: FormBuilder, private translate: TranslateService, private cookieService: CookieService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.productType = params['product'];
    });

    this.clientId = this.cookieService.get('clientId');
    this.currentLang = this.cookieService.get('currentLang');

    this.onGetRestaurantById();
    this.onGetReviewsById();
    this.onGetFreeDates();
    this.createForms();

    this.onGetAllPaginatedProducts(this.offset, this.limit, this.search, this.fromPrice, this.toPrice, this.fromDate, this.toDate, this.productType);

    this.translate.get('partnerAddRestaurantSnackBar').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });

    // this.checkOnScroll();
  }

  ngAfterViewInit(){
    setTimeout(function () {
      document.getElementById('ScrollTo').scrollIntoView();
    }, 100);
  }

  onGetAllPaginatedProducts(offset: number, limit: number, search: string, fromPrice: number, toPrice: number, fromDate: any, toDate: any, productType: string) {

    if (!this.clientId) { this.clientId = '0' };
    this.data.getAllPaginatedProducts(parseInt(this.clientId), offset, limit, this.search, this.fromPrice, this.toPrice, this.formattedDateFrom, this.formattedDateTo, this.productType).subscribe(
      data => {
        this.tours = data.products;
        console.log('respons data adv', this.tours)
        for (var i = 0; i < this.tours.length; i++) {
          this.idRestaurant = this.tours[i].id;
          if (this.idRestaurant == this.productId) {
            if (this.tours[i].isFavorite == 1) {
              this.isFavorite = true;
            } else {
              this.isFavorite = false;
            }
          }
        }
      }
    );
  }


  createForms() {

    this.bookingFormGroup = this.formBuilder.group({
      checkin: ['']
    });

  }

  onGetRestaurantById() {
    this.data.getRestaurantById(this.productId, this.currentLang).subscribe(
      data => {
        console.log('getProductById respons data', data)
        this.restaurant = data;
        this.restorantId = data.id;
        if (data.placeId) {
          this.googlePlaceUrl = 'https://www.google.com/maps/embed/v1/place?q=place_id:' + data.placeId + '&key=AIzaSyBRPDMwE4mfxJmPYiF1_8rQ_ohaZ8rzP1Y';
        } else {
          this.googlePlaceUrl = 'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJW_FUNtNEwRkRjewxVg5NI7E&key=AIzaSyBRPDMwE4mfxJmPYiF1_8rQ_ohaZ8rzP1Y';
        }
        this.onGetRestaurantImages();
      }
    );
  }

  onGetRestaurantImages() {
    this.data.getRestaurantImages(this.productType, this.productId).subscribe(
      data => {

        this.restaurant.images = data;

        this.showLoader = false;
        // setTimeout(function () {
        //   document.getElementById('ScrollTo').scrollIntoView();
        // }, 100);
      }
    );
  }

  onGetReviewsById() {

    let productType = 'adventure';

    this.data.getReviewsById(productType, this.productId).subscribe(
      data => {
        console.log('getProductById respons data', data)
        this.reviews = data;
      }
    );
  }

  onGetFreeDates() {

    let productType = 'restaurant';

    this.data.getFreeDates(productType, this.productId).subscribe(
      data => {

        this.freeDates = data;
        let freeDates = new Date(this.freeDates);

        // Check for date accuracy
        if (freeDates < this.minDate) {
          this.minDate = new Date();
        } else {
          this.minDate = freeDates;
        }

      }
    );
  }

  openViewImages(imagePosition: number) {

    console.log('dawdawdadw', imagePosition)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;


    dialogConfig.data = {
      imagePosition: imagePosition,
      title: this.restaurant.name,
      images: this.restaurant.images
    };

    this.dialog.open(DialogViewImagesComponent, dialogConfig);

  }

  openViewAmenities() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;


    dialogConfig.data = {
      amenities: this.restaurant,
    };

    this.dialog.open(DialogAmenitiesComponent, dialogConfig);

  }

  bookingNextStep() {

    console.log('YEs, we go to next step', this.existDate)
    if (this.existDate == undefined || this.existDate == false) {
      this.snackBar.openSnackWrongBar(this.translateSnackBar.incorectlyFieldFill, this.translateSnackBar.close)
    } else {
      const checkin = this.bookingFormGroup.controls.checkin.value;
      this.router.navigate(['reservation-restaurant-details/' + this.productId + '/' + checkin]);
    }
  }

  handleMinusRoom() {
    if (this.valueRoom <= 0) {
      this.enableRoom = false;
    } else {
      this.valueRoom--;
    }
  }

  handlePlusRoom() {
    this.enableRoom = true;
    this.valueRoom++;
  }

  handleMinusAdult() {
    if (this.valueAdults <= 0) {
      this.enableAdult = false;
    } else {
      this.valueAdults--;
    }
  }
  handlePlusAdults() {
    this.enableAdult = true;
    this.valueAdults++;
  }

  handleMinusChildren() {
    if (this.valueChildren <= 0) {
      this.enableChildren = false;
    } else {
      this.valueChildren--;
    }
  }

  handlePlusChildren() {
    this.enableChildren = true;
    this.valueChildren++;
  }

  OnSaveChoice() {
    console.log("save");
  }

  OnCancelChoice() {
    this.valueRoom = 0;
    this.valueAdults = 0;
    this.valueChildren = 0;
    console.log("CANCEL", this.valueRoom, this.valueAdults, this.valueChildren)
  }

  goToHome(searchKey: string) {
    this.router.navigate(['home/', searchKey]);
    return false;
  }

  onAddFavorite() {
    console.log("UGA", this.productId,);
    this.productType = 2;

    let favoriteObj = {
      userId: this.clientId,
      productId: this.restorantId,
      productType: this.productType
    }

    this.data.saveFavorite(favoriteObj).subscribe(
      data => {
        console.log("tour 1")
        this.isFavorite = true;
        console.log('getFavorite data', data)
      }
    );
  }

  onDeleteFavorite() {
    this.productType = 2;

    this.data.deleteFavorite(parseInt(this.clientId), this.productType, this.restorantId).subscribe(
      data => {
        console.log('respons data', data)
        this.isFavorite = false;
      }
    );
  }

  onCopyLink() {
    this.copied = true;
    let copyLink = document.createElement('textarea');
    copyLink.value = window.location.href;
    document.body.appendChild(copyLink);
    // copyLink.focus();
    copyLink.select();
    document.execCommand('copy');
    document.body.removeChild(copyLink);
  }

  // checkOnScroll() {
  //   this.hideTextInNavigation
  //   this.prevScrollpos = window.pageYOffset;
  //   window.onscroll = () => {
  //     this.currentScrollPos = window.pageYOffset;

  //     if (this.currentScrollPos > 210) {
  //       this.hideTextInNavigation = true;
  //       this.navigationHeight = 50;
  //     } else {
  //       this.hideTextInNavigation = false;
  //       this.navigationHeight = 80;
  //     }
  //     this.prevScrollpos = this.currentScrollPos;
  //   }
  // }

}
