import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getEstateById(productId: number, currentLang: string, fromDate: any, toDate: any, numberOfAdult: any, numberOfChildren: any) {
    return this.http.get<any>(environment.get_estate_by_id + productId + '?language=' + currentLang + '&fromDate=' + fromDate + '&toDate=' + toDate + '&numberOfAdult=' + numberOfAdult + '&numberOfChildren=' + numberOfChildren);
  }

  getEstateImages(productType: string, productId: number) {
    return this.http.get<any>(environment.get_estate_images + productType + '/' + productId);
  }

  getReviewsById(productType: string, productId: number) {
    return this.http.get<any>(environment.get_estate_reviews + productType + '/' + productId);
  }

  getRestaurantById(productId: number, currentLang: string) {
    return this.http.get<any>(environment.get_restaurant_by_id + productId + '?language=' + currentLang);
  }

  getRestaurantImages(productType: string, productId: number) {

    return this.http.get<any>(environment.get_estate_images + productType + '/' + productId);
  }

  getAdventureById(productId: number, currentLang: string, fromDate: any, toDate: any, numberOfAdult: any, numberOfChildren: any) {

    return this.http.get<any>(environment.get_adventure_by_id + productId + '?language=' + currentLang + '&fromDate=' + fromDate + '&toDate=' + toDate + '&numberOfAdult=' + numberOfAdult + '&numberOfChildren=' + numberOfChildren);
  }

  getAdventureImages(productType: string, productId: number) {

    return this.http.get<any>(environment.get_estate_images + productType + '/' + productId);
  }

  getFreeDates(productType: string, productId: number) {

    return this.http.get<any>(environment.get_estate_free_dates + productType + '/' + productId);
  }

  saveFavorite(favoriteObj: any) {
    const data = favoriteObj;

    return this.http.post<any>(environment.get_favorite, data);
  }

  deleteFavorite(userId: number, type: number, id: number) {
    return this.http.delete<any>(environment.delete_favorite + userId + '/' + type + '/' + id);
  }

  getAllPaginatedProducts(clientId: number, offset: number, limit: number, search: string, fromPrice: number, toPrice: number, fromDate: any, toDate: any, productType: string) {
    return this.http.get<any>(environment.get_all_products + clientId + '?offset=' + offset + '&limit=' + limit + '&search=' + search + '&fromPrice=' + fromPrice + '&toPrice=' + toPrice + '&fromDate=' + fromDate + '&toDate=' + toDate + '&productType=' + productType);
  }

  getEstateData(partnerId,id, lang){
    return this.http.get<any>(`${environment.mt_estate}/details/${partnerId}${id}?language=${lang}&currency=EUR`)
  }

  getEstateDatav2(partnerId,id, lang, fromDate, toDate, adults, children){
    return this.http.get<any>(`${environment.mt_estate}/details/${partnerId}${id}?language=${lang}&fromDate=${fromDate}&toDate=${toDate}&numberOfAdult=${adults}&numberOfChildren=${children}&currency=EUR`)
  }

  getTiqetsAdventureById(id,lang){
    return this.http.get<any>(`${environment.get_one_tiqets_adv}/details/${id}?language=${lang}`)
  }

  getTripsterAdventureById(id,lang){
    return this.http.get<any>(`${environment.get_one_tripster_adv}?id=${id}?&detailed=true&language=${lang}`)

  }

  checkAvailability(hotel_id, fromDate, toDate, adults, children, firstLoad){
    return this.http.get<any>(`${environment.checkHotelAvailability}?hotel_id=${hotel_id}&start_date=${fromDate}&end_date=${toDate}&adults=${adults}&children=${children}&firstLoad=${firstLoad}`);
  }

  checkTourAvailability(id, start, end){
    return this.http.get<any>(`${environment.checkTourAvailability}?id=${id}&for_single=1&start=${start}&end=${end}`)
  }
}
