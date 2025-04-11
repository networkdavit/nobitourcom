import { Component, OnInit, Inject , Input} from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hotel-image-dialog',
  templateUrl: './hotel-image-dialog.component.html',
  styleUrls: ['./hotel-image-dialog.component.css']
})
export class HotelImageDialogComponent implements OnInit {
  @Input() images: any[];
  @Input() currentImageIndex: number;
  currentImage: any;
  full_url_for_filtering: any;
  partnerId: string;

  constructor(private location: Location, public dialogRef: MatDialogRef<HotelImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.full_url_for_filtering = this.location.path();
      let splitUrl = this.full_url_for_filtering.split('/');
      const urlSlug = splitUrl[4];
      this.partnerId = urlSlug.split('-')[0];
      this.images = data.images;
      if(this.partnerId === "s"){
        this.currentImage = data.currentImage.medium;
      }else{
        this.currentImage = data.currentImage;
      }
      console.log(data)
      this.currentImageIndex = data.currentImageIndex;

  }

  ngOnInit() {
    console.log(123)

  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      if(this.partnerId === "s"){
        this.currentImage = this.images[this.currentImageIndex].medium;
      }else{
        this.currentImage = this.images[this.currentImageIndex];
      }
    }
  }

  nextImage() {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
      if(this.partnerId === "s"){
        this.currentImage = this.images[this.currentImageIndex].medium;
      }else{
        this.currentImage = this.images[this.currentImageIndex];
      }
    }
  }

  // isFirstImage(): boolean {
  //   return this.imageURLs.indexOf(this.selectedImage) === 0;
  // }

  // isLastImage(): boolean {
  //   return this.imageURLs.indexOf(this.selectedImage) === this.imageURLs.length - 1;
  // }


}
