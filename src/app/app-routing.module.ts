import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductEstateComponent } from './product-estate/product-estate.component';
import { ProductTransferComponent } from './product-transfer/product-transfer.component';
import { ProductRestaurantComponent } from './product-restaurant/product-restaurant.component';
import { ProductAdventureComponent } from './product-adventure/product-adventure.component';
import { IntroComponent } from './intro/intro.component';
import { RedirectToComponent } from './redirect-to/redirect-to.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FaqComponent } from './faq/faq.component';
import { PaymentReturnPolicyComponent } from './payment-return-policy/payment-return-policy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LegalComponent } from './legal/legal.component';
import { ImagesHotelComponent } from './images-hotel/images-hotel.component';
import { ProductCountriesComponent } from './product-countries/product-countries.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserTermsComponent } from './user-terms/user-terms.component';
import { ProductShopComponent } from './product-shop/product-shop.component';
import { ProductShopItemComponent } from './product-shop-item/product-shop-item.component';
import { ProductCityComponent } from './product-city/product-city.component';
import { ProductRentACarComponent } from './product-rent-a-car/product-rent-a-car.component';

const routes: Routes = [
  {
    path: ':website_language/home/:searchKey',
    component: HomeComponent
  },
  {
   path: ':website_language/home/:searchKey/london/gb/:page',
   component: HomeComponent
  },
  {
    path: ':website_language/home/:searchKey/:search_value_for_url/:countryISO/:page',
    component: HomeComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent,
  },
  {
    path: ':website_language/about-us',
    component: AboutUsComponent,
  },
  {
    path: ':website_language/partner/:partnerId/partner-add-place/images-hotel',
    component: ImagesHotelComponent,
  },
  {
    path: ':website_language/partner/:partnerId/images-hotel',
    component: ImagesHotelComponent,
  },
  {
    path: ':website_language/home/adventure/:idSlug',
    component: ProductAdventureComponent,
  },
  {
    path: ':website_language/shop',
    component: ProductShopComponent,
  },
  {
    path: ':website_language/shop/item/:id',
    component: ProductShopItemComponent,
  },
  {
    path: ':website_language/home/estate/:idSlug',
    component: ProductEstateComponent,
  },
  {
    path: ':website_language/transfer',
    component: ProductTransferComponent,
  },
  {
    path: ':website_language/carrental',
    component: ProductRentACarComponent,
  },
  {
    path: ':website_language/destination/:city/:iso',
    component: ProductCityComponent,
  },
  {
    path: ':website_language/home/country/:country',
    component: ProductCountriesComponent,
  },
  {
    path: ':website_language/home/restaurant/:idSlug',
    component: ProductRestaurantComponent,
  },
  
  {
    path: ':website_language/faq',
    component: FaqComponent
  },
  {
    path: ':website_language/user_terms_and_conditions',
    component: UserTermsComponent
  },
  {
    path: ':website_language/payment_return_policy',
    component: PaymentReturnPolicyComponent
  },
  {
    path: ':website_language/contact-us',
    component: ContactUsComponent
  },
  {
    path: ':website_language/policy',
    component: LegalComponent
  },
  {
    path: ':website_language/welcome',
    component: LandingPageComponent
  },
  {
    path: 'redirect-to/:currentLang/:productId',
    component: RedirectToComponent,
  },
  {
    path: '',
    component: IntroComponent
  },
  {
    path: ':website_language',
    component: IntroComponent
  },
  {
    path: '**', pathMatch: 'full',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
