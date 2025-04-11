import { BrowserModule, Title } from '@angular/platform-browser';
import { enableProdMode, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LazyImgDirective } from './lazyimg.directive';
import { ProductCityComponent } from './product-city/product-city.component';
// import { AgmCoreModule } from '@agm/core';
import { ProductShopComponent } from './product-shop/product-shop.component';
import { ProductShopItemComponent } from './product-shop-item/product-shop-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFaqModule } from '@angular-material-extensions/faq';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { DialogSavesComponent } from './dialog-saves/dialog-saves.component';
import { MatDialogModule } from "@angular/material";
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BottomComponent } from './bottom/bottom.component';
import { HeaderComponent } from './header/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AboutUsComponent } from './about-us/about-us.component';
import { ImagesHotelComponent } from './images-hotel/images-hotel.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMenuModule } from '@angular/material/menu';
import { DpDatePickerModule } from 'ng2-date-picker';
import { DialogAmenitiesComponent } from './dialog-amenities/dialog-amenities.component';
import { DialogViewImagesComponent } from './dialog-view-images/dialog-view-images.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSortableModule } from 'ngx-sortable';
import { ReviewRatingComponent } from './review-rating/review-rating.component'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DatePipe } from '@angular/common';
import { ParseJsonPipe } from './parse-json.pipe';
import { ProductEstateComponent } from './product-estate/product-estate.component';
import { ProductTransferComponent } from './product-transfer/product-transfer.component';
import { ProductCountriesComponent } from './product-countries/product-countries.component';
import { ProductRentACarComponent } from './product-rent-a-car/product-rent-a-car.component';
import { ProductRestaurantComponent } from './product-restaurant/product-restaurant.component';
import { ProductAdventureComponent } from './product-adventure/product-adventure.component';
import { DialogLanguagesComponent } from './dialog-languages/dialog-languages.component';
import { WrongDateComponent } from './wrong-date/wrong-date.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DialogCitynotfoundComponent } from './dialog-citynotfound/dialog-citynotfound.component';
import { DialogThankyouComponent } from './dialog-thankyou/dialog-thankyou.component';
import { DialogAdPopupComponent } from './dialog-ad-popup/dialog-ad-popup.component';
import { DialogError500popupComponent } from './dialog-error500popup/dialog-error500popup.component';
import { environment } from './services/constants.service';
import { CookieService } from 'ngx-cookie-service';
import { IntroComponent } from './intro/intro.component';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DATE_LOCALE } from '@angular/material';
import { PaymentReturnPolicyComponent } from './payment-return-policy/payment-return-policy.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipFormatPipe } from './pipes/tooltip-format.pipe';
import { NgxStripeModule } from 'ngx-stripe';
import { DialogPaymentComponent } from './dialog-payment/dialog-payment.component';
import { LoginService } from './services/login.service';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SafePipe } from './pipes/safe.pipe';
import { RoundUpPipe } from './pipes/roundUp.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RedirectToComponent } from './redirect-to/redirect-to.component';
import { EstateFilteredComponent } from './estate-filtered/estate-filtered.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FaqComponent } from './faq/faq.component';
import { UserTermsComponent } from './user-terms/user-terms.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LegalComponent } from './legal/legal.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import {ProgressBarModule} from "angular-progress-bar"
import { DialogLoginRegComponent } from './dialog-login-reg/dialog-login-reg.component';
import { PopupComponent } from './popup/popup.component';
import { ImageGalleryDialogComponent } from './image-gallery-dialog/image-gallery-dialog.component';
import { HotelImageDialogComponent } from './hotel-image-dialog/hotel-image-dialog.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { SumPricesPipe } from './sum-prices.pipe';
import { LandingPageComponent } from './landing-page/landing-page.component';

// Hidding console.log's
if (environment.base_url == 'http://beta.nobitour.com/api/' || environment.base_url == 'https://nobitour.com/api/' || environment.base_url == 'https://admin.nobitour.com/api/') {
  enableProdMode();
  if (window) {
    window.console.log = function () { };
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ParseJsonPipe,
    SumPricesPipe,
    DialogSavesComponent,
    LazyImgDirective,
    ChatbotComponent,
    LandingPageComponent,
    ProductComponent,
    HomeComponent,
    BottomComponent,
    TranslatePipe,
    HeaderComponent,
    ImageGalleryDialogComponent,
    HotelImageDialogComponent,
    AboutUsComponent,
    ImagesHotelComponent,
    DialogAmenitiesComponent,
    DialogViewImagesComponent,
    ReviewRatingComponent,
    ProductEstateComponent,
    ProductTransferComponent,
    ProductCityComponent,
    ProductRentACarComponent,
    ProductShopComponent,
    ProductShopItemComponent,
    ProductCountriesComponent,
    ProductRestaurantComponent,
    ProductAdventureComponent,
    DialogLanguagesComponent,
    DeleteDialogComponent,
    WrongDateComponent,
    DialogCitynotfoundComponent,
    DialogThankyouComponent,
    DialogAdPopupComponent,
    DialogError500popupComponent,
    PopupComponent,
    IntroComponent,
    TooltipFormatPipe,
    DialogPaymentComponent,
    SafePipe,
    RoundUpPipe,
    RedirectToComponent,
    EstateFilteredComponent,
    PagenotfoundComponent,
    FaqComponent,
    UserTermsComponent,
    PaymentReturnPolicyComponent,
    ContactUsComponent,
    LegalComponent,
    CarouselComponent,
    SafePipe,
    DialogLoginRegComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFaqModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatListModule,
    MatDialogModule,
    MatToolbarModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatStepperModule,
    MatSnackBarModule,
    MatCheckboxModule,
    NgxDatatableModule,
    MatMenuModule,
    DpDatePickerModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    // AgmCoreModule.forRoot(),
    NgxSortableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatChipsModule,
    NgxMaskModule.forRoot(),
    MatTooltipModule,
    // NgxStripeModule.forRoot('pk_live_51Iw8cyE1jd5KqGCq24M3DWDDO0c9XPgmMd3dPeKK3lHkqL8tih677g6ZmE5vcb1Uv558Oi5yF2AbT0Nk7cXof1b700ndEPpyfe'),//NobiTour tkn live
    NgxStripeModule.forRoot('pk_test_51Iw8cyE1jd5KqGCqVY8ENQp5f9ScBG1Cw3jM43JL5DVj7t8EsKGodyqnb6VPyyMpaxtuvLTMT4zJdxyQP5z12Lds00i8xyJylM'),//NobiTour tkn test
    GooglePlaceModule,
    MatAutocompleteModule,
    NgxUsefulSwiperModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe,
    SafePipe,
    RoundUpPipe,
    CookieService,
    HeaderComponent,
    LoginService,
    Title,
    //Adding this here to inherit city name variable from home into estate filtered
    HomeComponent,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogSavesComponent,
    ImageGalleryDialogComponent,
    DialogViewImagesComponent,
    DialogAmenitiesComponent,
    HotelImageDialogComponent,
    DialogLanguagesComponent,
    DialogCitynotfoundComponent,
    DialogThankyouComponent,
    DialogAdPopupComponent,
    DialogError500popupComponent,
    DialogPaymentComponent,
    DeleteDialogComponent,
    WrongDateComponent,
    DialogLoginRegComponent
  ]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
