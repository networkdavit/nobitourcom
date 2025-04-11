import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ReservationDetailsService } from '../services/reservation-details.service';
import { SnackBarService } from '../services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-payment',
  templateUrl: './dialog-payment.component.html',
  styleUrls: ['./dialog-payment.component.css']
})
export class DialogPaymentComponent implements OnInit {

  productId: any;
  fromDate: any;
  toDate: any;
  paymentType: any;
  productType: any;
  currency: any;
  amount: any;
  description: any;
  phone: any;
  userEmail: any;
  userName: any;

  // STRIPE
  @ViewChild(StripeCardComponent, {
    static: false
  }) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup;

  translateSnackBar: any;
  showLoader: boolean = false;

  constructor(private dialogRef: MatDialogRef<DialogPaymentComponent>, @Inject(MAT_DIALOG_DATA) data, private formBuilder: FormBuilder, private dataService: ReservationDetailsService, private stripeService: StripeService, private snackBar: SnackBarService, private translate: TranslateService) {

    this.productId = data.productId,
      this.fromDate = data.fromDate,
      this.toDate = data.toDate,
      this.userName = data.userName,
      this.userEmail = data.userEmail,
      this.phone = data.phone,
      this.description = data.description,
      this.amount = data.amount,
      this.currency = data.currency,
      this.productType = data.productType,
      this.paymentType = data.paymentType

  }

  ngOnInit() {
    this.dialogRef.updateSize('50%', '50%');
    this.createForms()

    this.translate.get('ReservationDetails').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  createForms() {

    // this.bookingDetailsFormGroup = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   surname: ['', Validators.required],
    //   phone: ['', Validators.required],
    //   email: ['', Validators.required]
    // });


    this.stripeTest = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  // STRIPE
  createToken(): void {

    this.showLoader = true;

    // this.paymentMethod()
    console.log('this.card', this.card, this.card.element)
    const name = this.stripeTest.get('name').value;
    console.log('this.card', name)
    this.stripeService.createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log('result.token.id', result.token.id);
          console.log('result', result)

          let detailsObj = {
            productId: this.productId,
            fromDate: this.fromDate,
            toDate: this.toDate,
            userName: name,
            userEmail: this.userEmail,
            phone: this.phone,
            description: this.description,
            amount: this.amount,
            currency: this.currency,
            productType: this.productType,
            paymentType: this.paymentType,
            token: result.token.id
          }


          this.dataService.bookingDetails(detailsObj.productType, detailsObj).subscribe(
            data => {
              console.log('data', data, data.url);
              if (data.status == 'requires_action') {
                window.open(data.url, "_blank");
                this.showLoader = false;
                this.close();
                this.snackBar.openSnackBar('Oчаквайте съобщение в електронната поща!', this.translateSnackBar.close);
              } else {
                this.showLoader = false;
                this.close();
                this.snackBar.openSnackBar('Успешно резервирахте, очаквайте съобщение в електронната поща!', this.translateSnackBar.close);
              }
              // this.snackBar.openSnackBar(this.translateSnackBar.bookedEstate, this.translateSnackBar.close);
              // this.resetValidation ();
            },
            error => {
              console.log('data', error);
              if (error.status == 200) {
                this.showLoader = false;
                this.close();
                this.snackBar.openSnackBar('Успешно резервирахте, очаквайте съобщение в електронната поща!', this.translateSnackBar.close);
              } else if (error.status == 500) {
                this.showLoader = false;
                this.close();
                this.snackBar.openSnackWrongBar(this.translateSnackBar.wentWrong, this.translateSnackBar.close);
              }
            }
          );


        } else if (result.error) {
          // Error creating the token
          this.close();
          console.log('result.error.message', result.error.message);
        }
      });
  }

  close() {
    this.dialogRef.close();
  }
}
