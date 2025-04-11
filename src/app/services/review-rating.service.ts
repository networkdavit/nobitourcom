import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewRatingService {

  constructor(private http: HttpClient) { }

  reviewRating(reviewRatingObj: any, token: any){
    const data = reviewRatingObj;
    return this.http.put<any>(environment.review_rating + token, data);
  }
}
