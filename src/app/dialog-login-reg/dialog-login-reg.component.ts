import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig, ThemePalette } from "@angular/material";
import { NgForm, FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { SnackBarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-login-reg',
  templateUrl: './dialog-login-reg.component.html',
  styleUrls: ['./dialog-login-reg.component.css']
})
export class DialogLoginRegComponent implements OnInit {

  @ViewChild('resetLoginForm', {
    static: true
  }) resetLoginForm: NgForm;

  @ViewChild('resetRegisterForm', {
    static: true
  }) resetRegisterForm: NgForm;

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 30;
  loader: boolean = false;

  id: number;
  description: string;
  message: string;

  loginForm: FormGroup;
  registerForm: FormGroup;
  login: string;

  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientLogoName: string;

  showLoader: boolean = false;

  isLogin: boolean = true;
  isRegistration: boolean = false;
  translateSnackBar: any;
  clientFirstName: string;
  clientLastName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  loginReg: boolean =  false;
  website_language: string = '';

  constructor(private http: HttpClient, private dialogRef: MatDialogRef<DialogLoginRegComponent>, @Inject(MAT_DIALOG_DATA) dataa: any, private formBuilder: FormBuilder, private data: LoginService, private router: Router, private snackBar: SnackBarService, private translate: TranslateService, private cookieService: CookieService) { }

  ngOnInit() {
    this.website_language = localStorage.getItem('lang');
    this.dialogRef.updateSize('400px', '90%');
    this.createForms();

    this.translate.get('ClientDialogLoginSnackBar').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });
  }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('first_name', this.firstName);
  //   formData.append('last_name', this.lastName);
  //   formData.append('phone', this.phone);
  //   formData.append('email', this.email);
  //   formData.append('password', this.password);
  
  //   this.http.post('https://admin.nobitour.com/register', formData)
  //     .subscribe(response => {
  //       // handle the server response here
  //     }, error => {
  //       // handle the error here
  //     });
  // }


  close() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  createForms() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: [, [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }
  get fR() { return this.registerForm.controls; }
  onLogin() {

    this.showLoader = true;

    if (this.loginForm.valid) {

      let client = {
        login: this.loginForm.controls.login.value,
        password: this.loginForm.controls.password.value,
      }

      this.data.loginClient(client).subscribe(
        data => {
          console.log('respons data', data)
          this.clientId = data['clientId'];
          this.clientName = data['name'];
          this.clientEmail = data['userEmail'];
          this.clientPhone = data['phone'];
          this.clientLogoName = data['profilePic'];
          console.log('login response stringifyed', this.clientId, this.clientName, this.clientEmail)
          this.cookieService.set('clientFirstName', this.clientFirstName);
          this.cookieService.set('clientLastName', this.clientLastName);
          this.cookieService.set('clientPhone', data.phone);
          this.cookieService.set('clientEmail', data.email);
          if (data.profilePic) {
            this.cookieService.set('clientLogoName', data.profilePic);
            this.clientLogoName = data.profilePic;
          }
          console.log('login response stringifyed', this.clientId, this.clientName, this.clientEmail)
          this.showLoader = false;
          this.snackBar.openSnackBar(this.translateSnackBar.successfullyLogged, this.translateSnackBar.close);
          this.resetValidation();
          this.router.navigate(['client-profile/' + this.clientId]);
          this.close();
        },
        error => {
          if (error.status == 401) {
            this.snackBar.openSnackWrongBar(this.translateSnackBar.incorrectAccount, this.translateSnackBar.close);
            this.showLoader = false;
          }
        }
      );

    } else {
      this.snackBar.openSnackWrongBar(this.translateSnackBar.incorrerectFill, this.translateSnackBar.close);
      this.showLoader = false;
    }

  }

  onRegister() {

    this.showLoader = true;

    let client = {
      name: this.registerForm.controls.name.value,
      phone: this.registerForm.controls.phone.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value
    }
    console.log('slient', client)

    if (this.registerForm.valid) {
      this.data.registerClient(client).subscribe(
        data => {
          console.log('vytre', data)
          this.showLoader = false;
          this.snackBar.openSnackBar(this.translateSnackBar.successfullyRegistered, this.translateSnackBar.close);

          this.close();
          this.resetValidation();
        },
        error => {
          if (error.status == 409) {
            this.showLoader = false;
            this.snackBar.openSnackWrongBar(this.translateSnackBar.alreadyCustomer, this.translateSnackBar.close);
          }
        }
      );
    } else {
      this.showLoader = false;
    }

  }

  resetValidation() {
    this.resetLoginForm.resetForm();
    this.resetRegisterForm.resetForm();
  }

}
