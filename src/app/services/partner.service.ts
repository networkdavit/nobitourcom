import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private http: HttpClient) { }

  addEstate(estate: any) {
    const data = estate;

    return this.http.post<any>(environment.add_estate, data);
  }

  editEstate(estate: any) {
    const data = estate;

    return this.http.put<any>(environment.edit_estate, data);
  }

  addRestaurant(restaurant: any) {
    const data = restaurant;

    return this.http.post<any>(environment.add_restaurant, data);
  }

  editRestaurant(restaurant: any) {
    const data = restaurant;

    return this.http.put<any>(environment.edit_restaurant, data);
  }


  saveImages(productType: any, productId: any, images: any) {
    const data = images;

    return this.http.post<any>(environment.save_image + productType + '/' + productId, data);
  }

  editImages(productType: any, productId: any, images: any) {
    const data = images;

    return this.http.put<any>(environment.save_image + productType + '/' + productId, data);
  }

  getImages(productType: any, productId: any) {
    return this.http.get<any>(environment.get_image + productType + '/' + productId);
  }

  addAdventure(adventure: any) {
    const data = adventure;

    return this.http.post<any>(environment.add_adventure, data);
  }

  editAdventure(adventure: any) {
    const data = adventure;

    return this.http.put<any>(environment.edit_adventure, data);
  }

  getPartnerProductsByTypeAndId(productType: string, partnerId: number, offset: number, limit: number) {
    return this.http.get<any>(environment.get_partner_products_by_type_and_id + productType + '/' + partnerId + '?offset=' + offset + '&limit=' + limit);
  }

  editProfileInfo(imageEditObj: any) {
    return this.http.put<any>(environment.edit_partner_profile_info, imageEditObj);
  }

  resetPassword(changePassObj: any) {
    return this.http.put<any>(environment.reset_partner_password, changePassObj);
  }


  getProfileLogo(userType: number, clientId: number) {
    return this.http.get<any>(environment.get_profile_logo + userType + '/' + clientId);
  }

  getFreeDatesEstate(productType: string, productId: number) {
    return this.http.get<any>(environment.get_free_dates_estate + productType + '/' + productId);
  }

  getFreeDatesRestaurant(productType: string, productId: number) {
    return this.http.get<any>(environment.get_free_dates_restaurant + productType + '/' + productId);
  }

  getFreeDatesAdventure(productType: string, productId: number) {
    return this.http.get<any>(environment.get_free_dates_adventure + productType + '/' + productId);
  }

  addFreeDatesToEstate(productType: string, productId: number, dates: any) {
    const data = dates;
    return this.http.post<any>(environment.add_dates_for_estate + productType + '/' + productId, data);
  }

  addFreeDatesToRestaurant(productType: string, productId: number, dates: any) {
    const data = dates;
    return this.http.post<any>(environment.add_dates_for_restaurant + productType + '/' + productId, data);
  }

  addFreeDatesToAdventure(productType: string, productId: number, dates: any) {
    const data = dates;
    return this.http.post<any>(environment.add_dates_for_adventure + productType + '/' + productId, data);
  }

  deleteEstate(productType: string, productId: number) {
    return this.http.delete<any>(environment.delete_estate + productType + '/' + productId);
  }

  deleteRestaurant(productType: string, productId: number) {
    return this.http.delete<any>(environment.delete_restaurant + productType + '/' + productId);
  }

  deleteAdventure(productType: string, productId: number) {
    return this.http.delete<any>(environment.delete_adventure + productType + '/' + productId);
  }

  googleInfo() {
    return this.http.get<any>(environment.google_info);
  }
}
