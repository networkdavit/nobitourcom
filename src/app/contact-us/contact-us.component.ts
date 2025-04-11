import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { ConnectionService } from '../services/connection.service';
import { SnackBarService } from '../services/snackbar.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  @ViewChild('resetAdminLoginForm', {
    static: true
  }) resetAdminLoginForm: NgForm;

  feedbackForm: FormGroup;
  partnerLoginForm: FormGroup;
  visibility: string = 'visibility_off';
  inputType: string = 'password';

  translateSnackBar: any;

  token: any;
  name: any;
  email: any;
  phone: any;
  text: any;

  showLoader: boolean = false;
  reveal: boolean = false;

  full_url_for_filtering: string;
  filtered_website_language: string;
  productType: string;
  

  constructor(private formBuilder: FormBuilder,private location: Location, private data: ConnectionService, private snackBar: SnackBarService, private router: Router, private translate: TranslateService, private cookieService: CookieService) { }

  async ngOnInit() {
    this.createForms();
    this.full_url_for_filtering = this.location.path();
    let splitUrl = this.full_url_for_filtering.split('/');
    this.filtered_website_language = splitUrl[1];
    this.showLoader = true;
    await new Promise(r => setTimeout(r, 1000));
    this.showLoader = false;
    this.reveal = true;

    this.translate.get('ContactUsForm').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
    this.data.getToken().subscribe(response => {
      this.token = response;
    })
    setTimeout(() => {
      window.scrollTo({ top:500, behavior: 'smooth' });
    }, 500);

  }

  createForms() {
    this.feedbackForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', [Validators.minLength(10), Validators.maxLength(50)]],
      text: ['', Validators.required]
    });
  }

  onSubmitMessage() {


    if (this.feedbackForm.valid) {

      let fullMessage = {
        name: this.feedbackForm.controls.name.value,
        email: this.feedbackForm.controls.email.value,
        phone: this.feedbackForm.controls.phone.value,
        text: this.feedbackForm.controls.text.value,
      }
      
      this.data.sendMessage(fullMessage).subscribe(
        data => {
          alert("Thank you for sending a message")
        },
        error => {
          if (error.status === 429) {
            alert("Too many requests. Please try again later.");
          } else {
            console.log(error);
            alert("Something went wrong. Please try again later.");
          }
        }
      );
      this.showLoader = true;
      setTimeout(() => {
        this.showLoader = false;
      }, 1000);


    } else {
      this.snackBar.openSnackWrongBar(this.translateSnackBar.incorrerectFill, this.translateSnackBar.close);
      this.showLoader = false;
    }
    this.feedbackForm.reset();

  }

}
