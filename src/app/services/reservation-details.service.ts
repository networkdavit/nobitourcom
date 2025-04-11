import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationDetailsService {

  constructor(private http: HttpClient) { }

  getEstateById(productId: number) {
    return this.http.get<any>(environment.get_estate_by_id + productId);
  }

  getEstateImages(productType: string, productId: number) {
    return this.http.get<any>(environment.get_estate_images + productType + '/' + productId);
  }

  getAdventureById(productId: number) {
    return this.http.get<any>(environment.get_adventure_by_id + productId);
  }

  getAdventureImages(productType: string, productId: number) {

    return this.http.get<any>(environment.get_estate_images + productType + '/' + productId);
  }

  getRestaurantById(productId: number) {
    return this.http.get<any>(environment.get_restaurant_by_id + productId);
  }

  getRestaurantImages(productType: string, productId: number) {

    return this.http.get<any>(environment.get_estate_images + productType + '/' + productId);
  }

  bookingDetails(productType: string, detailsObj: any) {
    const data = detailsObj;
    return this.http.post<any>(environment.booking_details_reservation + productType, data);
  }

}
