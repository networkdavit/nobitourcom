import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReviewRatingService } from '../services/review-rating.service';
import { SnackBarService } from '../services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-review-rating',
  templateUrl: './review-rating.component.html',
  styleUrls: ['./review-rating.component.css']
})
export class ReviewRatingComponent implements OnInit {

  private routeSub: Subscription;

  productId: any;
  token: any;

  showReview = false;
  clientReview: any;
  enableSubmit = false;
  rating: number;

  showLoader: boolean = false;

  translateSnackBar: any;

  constructor(private route: ActivatedRoute, private data: ReviewRatingService, private snackBar: SnackBarService, private translate: TranslateService) { }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      this.productId = params['productId'];
      this.token = params['tkn'];
      // console.log(this.productId, this.token);
    });

    this.translate.get('reviewRatingSnackBar').subscribe((snackBar: string) => {
      this.translateSnackBar = snackBar;
    });

  }

  onReviewRating(){

    this.showLoader = true;
    
    let reviewRatingObj = {
      rating: this.rating,
      comment: this.clientReview
    }
    
    this.data.reviewRating(reviewRatingObj, this.token).subscribe(
      data => {
        console.log('bookingDetails respons data', data)
        this.snackBar.openSnackBar(this.translateSnackBar.successfullySaved, this.translateSnackBar.close);
        this.showLoader = false;
      },
      error => {
        if (error.status == 403) {
          this.showLoader = false;
          this.snackBar.openSnackWrongBar(this.translateSnackBar.alreadyRecorded, this.translateSnackBar.close);
        }
      }
    );
  }

  chooseEmoji(rating: number) {
    this.rating = rating;
    this.showReview = true;
  }

  onKeyUp(event: any) {
    this.enableSubmit = /^\S.*$/.test(this.clientReview);
  }

}
