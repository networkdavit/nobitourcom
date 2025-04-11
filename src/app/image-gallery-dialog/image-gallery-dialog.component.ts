import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-gallery-dialog',
  templateUrl: './image-gallery-dialog.component.html',
  styleUrls: ['./image-gallery-dialog.component.css']
})
export class ImageGalleryDialogComponent implements OnInit {
  currentIndex: number = 0;
  amenities: any[] = [];
  gallery: { large: string; thumb: string }[] | null = null;

  constructor(
    public dialogRef: MatDialogRef<ImageGalleryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.gallery = this.data.room.gallery || null;
    this.showAmenities();
  }

  get currentImage(): SafeResourceUrl | null {
    if (this.gallery && this.gallery.length > 0) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.gallery[this.currentIndex].large);
    } else if (this.data.room.image) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.data.room.image);
    } else {
      return null;
    }
  }

  previousImage() {
    if (this.gallery && this.gallery.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.gallery.length) % this.gallery.length;
    }
  }

  nextImage() {
    if (this.gallery && this.gallery.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.gallery.length;
    }
  }

  getCurrentImage(): string | null {
    if (this.gallery && this.gallery.length > 0) {
      return this.gallery[this.currentIndex].large;
    } else if (this.data.room.image) {
      return this.data.room.image;
    } else {
      return null;
    }
  }

  showAmenities() {
    this.amenities = this.data.room.term_features || [];
    console.log("Amenities", this.amenities);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onPrev(): void {
    if (this.gallery && this.gallery.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.gallery.length) % this.gallery.length;
    }
  }

  onNext(): void {
    if (this.gallery && this.gallery.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.gallery.length;
    }
  }
}
