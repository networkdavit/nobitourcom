import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../services/constants.service';
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private introAdventuresDataUrl = 'assets/introadventures.json';
  private introEstatesDataUrl = 'assets/introestates.json';

  // private introAdventuresDataUrl = 'https://nobitour.ru/assets/introadventures.json';
  // private introEstatesDataUrl = 'https://nobitour.ru/assets/introestates.json';

  constructor(private http: HttpClient) { }


  getAdventuresIntroData(): Observable<any> {
    return this.http.get<any>(this.introAdventuresDataUrl);
  }

  getEstatesIntroData(): Observable<any> {
    return this.http.get<any>(this.introEstatesDataUrl);
  }


  get_rate(curr){
    return this.http.get<any>(environment.getCurrencyRate + curr);
  }

  get_bot_options(lang){
    return this.http.get<any>(environment.getChatBotOptions + lang)
  }

  getAgodaRecommendedOwnApi(){
    return this.http.get<any>(environment.getSavedAgodaHotels)
  }

  getAdventuresRecommendedOwnApi(){
    return this.http.get<any>(environment.getSavedAdventures)
  }


  get_bot_responses(option_id:number){
    return this.http.get<any>(environment.getBotResponses + option_id);

  }

  getAllPaginatedProducts(clientId: number, offset: number, limit: number, search: string, fromPrice: number, toPrice: number, fromDate: any, toDate: any, productType: string, language: string, city: string, countryISO: any, cityId: any, numberOfAdult: number, numberOfChildren: number) {
    return this.http.get<any>(environment.get_all_products + clientId + '?offset=' + offset + '&limit=' + limit + '&search=' + search + '&fromPrice=' + fromPrice + '&toPrice=' + toPrice + '&fromDate=' + fromDate + '&toDate=' + toDate + '&productType=' + productType + '&language=' + language + '&city=' + city + '&countryISO=' + countryISO + '&cityId=' + cityId + '&numberOfAdult=' + numberOfAdult + '&numberOfChildren=' + numberOfChildren);
  }

  saveFavorite(favoriteObj: any) {
    const data = favoriteObj;

    return this.http.post<any>(environment.get_favorite, data);
  }

  deleteFavorite(userId: number, type: number, id: number) {
    return this.http.delete<any>(environment.delete_favorite + userId + '/' + type + '/' + id);
  }


  requestOnServer(keyword: any) {
    return this.http.get<any>(environment.mt_estate_dropdown_search + keyword)
  }

  requestOnServerAdv(keyword: any) {

    return this.http.get<any>(environment.mt_adventures_dropdown_search + keyword)
  }

  getRecommendedForIntro(isoList){
    return this.http.get<any>(environment.recommended + isoList)
  }

  getRecommendedForIntroRateHawk(){
    return this.http.get<any>('https://admin.nobitour.ru/api/ostrovok/intro')
  }

  getRecommededHome(lang, city, iso){
    return this.http.get<any>(`https://beta.nobitour.com/api/public/adventure/recommended-for-city?language=${lang}&city=${city}&countryISO=${iso}`)
  }

  getRecommendedByIp(language:string){
    return this.http.get<any>(environment.recommendedByIp + language)
  }

  getRecommendedAdventureByCountry(lang, country){
    return this.http.get<any>(`${environment.getRecommendedAdventureByCountry}/${lang}/${country}`)
  }

  getRecommendedHotelsFromAgoda(lang){
    return this.http.get<any>(`${environment.getRecommendedHotelsFromAgoda}/${lang}`)
  }

  getAllEstates(fromDate, toDate,lang, city, iso, numOfAdult, numOfChildren){
    // return this.http.get<any>(`${environment.mt_estate}?fromDate=${fromDate}&toDate=${toDate}&language=${lang}&city=${city}&countryISO=${iso}&numberOfAdult=${numOfAdult}&numberOfChildren=${numOfChildren}&currency=EUR`) //for com
    return this.http.get<any>(`${environment.mt_estate}?fromDate=${fromDate}&toDate=${toDate}&language=${lang}&city=${city}&countryISO=${iso}&numberOfAdult=${numOfAdult}&numberOfChildren=${numOfChildren}&currency=USD`) //for ru


  }

  getAllRateHawkEstates(fromDate, toDate,lang, city, iso, numOfAdult, numOfChildren){
    // return this.http.get<any>(`https://admin.nobitour.ru/api/ostrovok/hotels_from_db?checkin=${fromDate}&checkout=${toDate}&guests=4&country_code=${iso}&name=${city}&currency=EUR&language=en`)
    // return this.http.get<any>(`https://admin.nobitour.ru/api/ostrovok/search_hotels_by_region_id?checkin=${fromDate}&checkout=${toDate}&guests=${numOfAdult + numOfChildren}&country_code=${iso}&name=${city}&currency=EUR#context`)
    // return this.http.get<any>(`https://admin.nobitour.ru/api/ostrovok/search_hotels_by_region_id?checkin=${fromDate}&checkout=${toDate}&guests=${numOfAdult + numOfChildren}&country_code=${iso}&name=${city}&currency=USD#context`) //FOR RU
    return this.http.get<any>(
      `https://admin.nobitour.ru/api/ostrovok/search_hotels_by_region_id?checkin=${fromDate}&checkout=${toDate}&guests=${parseInt(numOfAdult) + parseInt(numOfChildren)}&country_code=${iso}&name=${city}&currency=USD#context`
    );
    
  }


  getRateHawkHotelPrices(fromDate: string, toDate: string, city: string, iso: string) {
    // return this.http.get<any>(`https://admin.nobitour.ru/api/ostrovok/api_hotels?checkin=${fromDate}&checkout=${toDate}&guests=4&country_code=${iso}&name=${city}&currency=EUR`); //for com
    return this.http.get<any>(`https://admin.nobitour.ru/api/ostrovok/api_hotels?checkin=${fromDate}&checkout=${toDate}&guests=4&country_code=${iso}&name=${city}&currency=USD`); //for ru

  }

  getAllEstatesSeo(lang, city, iso){
    // return this.http.get<any>(`${environment.mt_estate}/seo?language=${lang}&city=${city}&countryISO=${iso}&currency=EUR`) //for com
    return this.http.get<any>(`${environment.mt_estate}/seo?language=${lang}&city=${city}&countryISO=${iso}&currency=USD`) //for ru

  }

  getAllAdventuresSeo(lang, city, iso){
    return this.http.get<any>(`${environment.mt_adventure}/seo?language=${lang}&city=${city}&countryISO=${iso}`)
  }

  getAgodaHotels(fromDate, toDate,lang, city, iso, numOfAdult, numOfChildren){
    // return this.http.get<any>(`${environment.hl_estate}?fromDate=${fromDate}&toDate=${toDate}&language=${lang}&city=${city}&countryISO=${iso}&numberOfAdult=${numOfAdult}&numberOfChildren=${numOfChildren}&currency=EUR`) //for com
    return this.http.get<any>(`${environment.hl_estate}?fromDate=${fromDate}&toDate=${toDate}&language=${lang}&city=${city}&countryISO=${iso}&numberOfAdult=${numOfAdult}&numberOfChildren=${numOfChildren}&currency=USD`) //for ru

  }

  getAllAdventures(lang, city, iso){
    // return this.http.get<any>(`${environment.mt_adventure}?fromDate=&toDate=&language=${lang}&city=${city}&countryISO=${iso}&currency=EUR`) //for com
    return this.http.get<any>(`${environment.mt_adventure}?fromDate=&toDate=&language=${lang}&city=${city}&countryISO=${iso}&currency=USD`) //for ru

  }

  getTiqetsAdventures(lang, city, iso,numOfAdult, numOfChildren){
    // return this.http.get<any>(`${environment.tq_adventure}?language=${lang}&city=${city}&countryISO=${iso}&numberOfAdult=${numOfAdult}&numberOfChildren=${numOfChildren}&currency=EUR`) //for com
    return this.http.get<any>(`${environment.tq_adventure}?language=${lang}&city=${city}&countryISO=${iso}&numberOfAdult=${numOfAdult}&numberOfChildren=${numOfChildren}&currency=USD`) //for ru

  }

  getTripsterAdventures(city, startDate ,endDate, persons_count){
    return this.http.get<any>(`${environment.tripster_adventure}?city=${city}&detailed=true&start_date=${startDate}&end_date=${endDate}&persons_count=${persons_count}#top`)
  }


  getWeather(city, key, lang){
    return this.http.get<any>(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric&lang=${lang}`)
  }

  getSlideshowData(){
    return this.http.get<any>(environment.getSlideshowResponses)
  }

  getTripsterCityId(city_name){
    return this.http.get<any>(`${environment.tripsterCityId}?name_en=${city_name}`)
  }

  getCountryHotelsandAdventures(country){
    return this.http.get<any>(`https://beta.nobitour.com/api/public/tours_and_hotels?search=${country}`)
  }

  getCountryExcursions(country){
    return this.http.get<any>(` https://beta.nobitour.com/api/public/tours?country=${country}`)
  }

  getCountryEstates(country){
    return this.http.get<any>(`https://beta.nobitour.com/api/public/hotels?search=${country}`)
  }

  getCityEstates(city, iso){
    return this.http.get<any>(`https://admin.nobitour.ru/api/public/hotels_by_hotellook?city=${city}&countryISO=${iso}`)
  }

  getCityRateHawkEstates(fromDate, toDate,lang, city, iso, numOfAdult, numOfChildren){
    // return this.http.get<any>(`https://admin.nobitour.ru/api/public/hotels_by_hotellook?city=${city}&countryISO=${iso}`)
    // return this.http.get<any>(`https://admin.nobitour.ru/api/ostrovok/search_hotels_by_region_id?checkin=${fromDate}&checkout=${toDate}&guests=${numOfAdult + numOfChildren}&country_code=${iso}&name=${city}&currency=EUR#context`) FOR COM
    return this.http.get<any>(`https://admin.nobitour.ru/api/ostrovok/search_hotels_by_region_id?checkin=${fromDate}&checkout=${toDate}&guests=${numOfAdult + numOfChildren}&country_code=${iso}&name=${city}&currency=USD`) //FOR RU

  }

  getCityAdventures(city, iso){
    return this.http.get<any>(`https://admin.nobitour.ru/api/public/t-adventure?language=en&city=${city}&countryISO=${iso}`)
  }

  getHotelLookHotels(city, iso, fromDate, toDate, adultCount, childrenCount){
    return this.http.get<any>(`${environment.hotellook_hotels}city=${city}&countryISO=${iso}&fromDate=${fromDate}&toDate=${toDate}&numberOfAdult=${adultCount}&numberOfChildren=${childrenCount}`)
  }
}
