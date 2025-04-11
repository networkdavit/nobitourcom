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

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild('resetBookingForm', {
    static: true
  }) resetBookingForm: NgForm;

  bookingFormGroup: FormGroup;

  private routeSub: Subscription;
  productId: any;
  product: Product;
  freeDates: string[] = [];

  showLoader: boolean = true;

  valueRoom = 0;
  valueAdults = 0;
  valueChildren = 0;

  enableRoom = true;
  enableAdult = true;
  enableChildren = true;

  translateSnackBar: any;
  existDate: boolean;
  existDates: boolean;

  constructor(private data: ProductService, private snackBar: SnackBarService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private formBuilder: FormBuilder, private translate: TranslateService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      //console.log(params) //log the entire params object
      //console.log(params['id']) //log the value of id
      this.productId = params['id']
    });

    // setTimeout(() => {
      // this.onGetProductById();
    // }, 3000);
    this.createForms();

    this.translate.get('partnerAddRestaurantSnackBar').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  createForms() {

    this.bookingFormGroup = this.formBuilder.group({
      checkin: [''],
      checkout: ['']
    });

  }

  // onGetProductById() {
  //   this.data.getProductById(this.productId).subscribe(
  //     data => {
  //       console.log('getProductById respons data', data)
  //       this.product = data;
  //       this.freeDates = data.dates
  //       this.showLoader = false;
  //     }
  //   );
  // }

  openViewImages(imagePosition: number) {

    console.log('dawdawdadw', imagePosition)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;


    dialogConfig.data = {
      imagePosition: imagePosition,
      title: this.product.name,
      images: this.product.images
    };

    this.dialog.open(DialogViewImagesComponent, dialogConfig);

  }

  openViewAmenities() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;


    dialogConfig.data = {
      amenities: this.product,
    };

    this.dialog.open(DialogAmenitiesComponent, dialogConfig);

  }

  myFilter = (d: Date | null): boolean => {
    
    // let freeDates = [
    //   "Mon Nov 02 2020 00:00:00 GMT+0200 (Eastern European Standard Time)",
    // ]
    // console.log('\n', this.freeDates[0], '\n', d.toString())
    if(d.toString().slice(0, 33) == this.freeDates[0] || d.toString().slice(0, 33) == this.freeDates[1] || d.toString().slice(0, 33) == this.freeDates[2] || d.toString().slice(0, 33) == this.freeDates[3] || d.toString().slice(0, 33) == this.freeDates[4] || d.toString().slice(0, 33) == this.freeDates[5] || d.toString().slice(0, 33) == this.freeDates[6] || d.toString().slice(0, 33) == this.freeDates[7] || d.toString().slice(0, 33) == this.freeDates[8] || d.toString().slice(0, 33) == this.freeDates[9] || d.toString().slice(0, 33) == this.freeDates[10] || d.toString().slice(0, 33) == this.freeDates[11] || d.toString().slice(0, 33) == this.freeDates[12] || d.toString().slice(0, 33) == this.freeDates[13] || d.toString().slice(0, 33) == this.freeDates[14] || d.toString().slice(0, 33) == this.freeDates[15] || d.toString().slice(0, 33) == this.freeDates[16] || d.toString().slice(0, 33) == this.freeDates[17] || d.toString().slice(0, 33) == this.freeDates[18] || d.toString().slice(0, 33) == this.freeDates[19] || d.toString().slice(0, 33) == this.freeDates[20] || d.toString().slice(0, 33) == this.freeDates[21] || d.toString().slice(0, 33) == this.freeDates[22] || d.toString().slice(0, 33) == this.freeDates[23] || d.toString().slice(0, 33) == this.freeDates[24] || d.toString().slice(0, 33) == this.freeDates[25] || d.toString().slice(0, 33) == this.freeDates[26] || d.toString().slice(0, 33) == this.freeDates[27] || d.toString().slice(0, 33) == this.freeDates[28] || d.toString().slice(0, 33) == this.freeDates[29] || d.toString().slice(0, 33) == this.freeDates[30] || d.toString().slice(0, 33) == this.freeDates[31]){
      this.existDate = true;
    }else{
      this.existDate = false
    }
    return d.toString() == this.freeDates[0] || d.toString() == this.freeDates[1] || d.toString() == this.freeDates[2] || d.toString() == this.freeDates[3] || d.toString() == this.freeDates[4] || d.toString() == this.freeDates[5] || d.toString() == this.freeDates[6] || d.toString() == this.freeDates[7] || d.toString() == this.freeDates[8] || d.toString() == this.freeDates[9] || d.toString() == this.freeDates[10] || d.toString() == this.freeDates[11] || d.toString() == this.freeDates[12] || d.toString() == this.freeDates[13] || d.toString() == this.freeDates[14] || d.toString() == this.freeDates[15] || d.toString() == this.freeDates[16] || d.toString() == this.freeDates[17] || d.toString() == this.freeDates[18] || d.toString() == this.freeDates[19] || d.toString() == this.freeDates[20] || d.toString() == this.freeDates[21] || d.toString() == this.freeDates[22] || d.toString() == this.freeDates[23] || d.toString() == this.freeDates[24] || d.toString() == this.freeDates[25] || d.toString() == this.freeDates[26] || d.toString() == this.freeDates[27] || d.toString() == this.freeDates[28] || d.toString() == this.freeDates[29] || d.toString() == this.freeDates[30] || d.toString() == this.freeDates[31];
  }

  myFilterDate = (d: Date | null): boolean => {
    
    // let freeDates = [
    //   "Mon Nov 02 2020 00:00:00 GMT+0200 (Eastern European Standard Time)",
    // ]
    // console.log('\n', this.freeDates[0], '\n', d.toString())
    if(d.toString().slice(0, 33) == this.freeDates[0] || d.toString().slice(0, 33) == this.freeDates[1] || d.toString().slice(0, 33) == this.freeDates[2] || d.toString().slice(0, 33) == this.freeDates[3] || d.toString().slice(0, 33) == this.freeDates[4] || d.toString().slice(0, 33) == this.freeDates[5] || d.toString().slice(0, 33) == this.freeDates[6] || d.toString().slice(0, 33) == this.freeDates[7] || d.toString().slice(0, 33) == this.freeDates[8] || d.toString().slice(0, 33) == this.freeDates[9] || d.toString().slice(0, 33) == this.freeDates[10] || d.toString().slice(0, 33) == this.freeDates[11] || d.toString().slice(0, 33) == this.freeDates[12] || d.toString().slice(0, 33) == this.freeDates[13] || d.toString().slice(0, 33) == this.freeDates[14] || d.toString().slice(0, 33) == this.freeDates[15] || d.toString().slice(0, 33) == this.freeDates[16] || d.toString().slice(0, 33) == this.freeDates[17] || d.toString().slice(0, 33) == this.freeDates[18] || d.toString().slice(0, 33) == this.freeDates[19] || d.toString().slice(0, 33) == this.freeDates[20] || d.toString().slice(0, 33) == this.freeDates[21] || d.toString().slice(0, 33) == this.freeDates[22] || d.toString().slice(0, 33) == this.freeDates[23] || d.toString().slice(0, 33) == this.freeDates[24] || d.toString().slice(0, 33) == this.freeDates[25] || d.toString().slice(0, 33) == this.freeDates[26] || d.toString().slice(0, 33) == this.freeDates[27] || d.toString().slice(0, 33) == this.freeDates[28] || d.toString().slice(0, 33) == this.freeDates[29] || d.toString().slice(0, 33) == this.freeDates[30] || d.toString().slice(0, 33) == this.freeDates[31]){
      this.existDates = true;
    }else{
      this.existDates = false
    }
    return d.toString() == this.freeDates[0] || d.toString() == this.freeDates[1] || d.toString() == this.freeDates[2] || d.toString() == this.freeDates[3] || d.toString() == this.freeDates[4] || d.toString() == this.freeDates[5] || d.toString() == this.freeDates[6] || d.toString() == this.freeDates[7] || d.toString() == this.freeDates[8] || d.toString() == this.freeDates[9] || d.toString() == this.freeDates[10] || d.toString() == this.freeDates[11] || d.toString() == this.freeDates[12] || d.toString() == this.freeDates[13] || d.toString() == this.freeDates[14] || d.toString() == this.freeDates[15] || d.toString() == this.freeDates[16] || d.toString() == this.freeDates[17] || d.toString() == this.freeDates[18] || d.toString() == this.freeDates[19] || d.toString() == this.freeDates[20] || d.toString() == this.freeDates[21] || d.toString() == this.freeDates[22] || d.toString() == this.freeDates[23] || d.toString() == this.freeDates[24] || d.toString() == this.freeDates[25] || d.toString() == this.freeDates[26] || d.toString() == this.freeDates[27] || d.toString() == this.freeDates[28] || d.toString() == this.freeDates[29] || d.toString() == this.freeDates[30] || d.toString() == this.freeDates[31];
  }

  bookingNextStep(){
    console.log('YEs, we go to next step')
    if (this.existDates && this.existDate) {
      const checkin = this.bookingFormGroup.controls.checkin.value;
      const checkout = this.bookingFormGroup.controls.checkout.value;
      this.router.navigate(['reservation-details/' + this.productId + '/' + checkin + '/' + checkout]);
    }else{
      this.snackBar.openSnackWrongBar(this.translateSnackBar.incorectlyFieldFill, this.translateSnackBar.close)
    }
  }

  handleMinusRoom() {
    if(this.valueRoom <= 0){
      this.enableRoom = false;
    }else{
      this.valueRoom--;
    }
  }

  handlePlusRoom() {
    this.enableRoom = true;
    this.valueRoom++;   
  }

  handleMinusAdult() {
    if(this.valueAdults <= 0){
      this.enableAdult = false;
    }else{
      this.valueAdults--;
    } 
  }
  handlePlusAdults() {
    this.enableAdult = true;
    this.valueAdults++;   
  }

  handleMinusChildren() {
    if(this.valueChildren <= 0){
      this.enableChildren = false;
    }else{
      this.valueChildren--;
    } 
  }

  handlePlusChildren() {
    this.enableChildren = true;
    this.valueChildren++;      
  }

  OnSaveChoice(){
    console.log("save");
  }

  OnCancelChoice(){
    this.valueRoom = 0;
    this.valueAdults = 0;
    this.valueChildren = 0;
    console.log("CANCEL", this.valueRoom, this.valueAdults, this.valueChildren )
  }

}
