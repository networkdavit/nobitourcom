import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-images-hotel',
  templateUrl: './images-hotel.component.html',
  styleUrls: ['./images-hotel.component.css']
})
export class ImagesHotelComponent implements OnInit {

  isNewPlace: boolean = false;
  website_language: string;
  editEstate: boolean;
  partnerId: string;
  hideTextInNavigation: boolean;
  images : string[] = [];
  myForm = new FormGroup({
   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
   file: new FormControl('', [Validators.required]),
   fileSource: new FormControl('', [Validators.required])
 });

  constructor(private router: Router,private location: Location, private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit() {
    this.partnerId = this.cookieService.get('partnerId');
    this.website_language = localStorage.getItem('lang');
    if(this.location.path().includes("partner-add-place")){
      this.isNewPlace = true
    }
  }

  backToMyPlaces(){
    this.router.navigate([ `/${this.website_language}/partner-profile/${this.partnerId}/myPlaces`])
  }

  moveStep(stepName){
    this.router.navigate([ `/${this.website_language}/partner/${this.partnerId}/${stepName}`])
  }

  
  get f(){
    return this.myForm.controls;
  }
    
  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
    
                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.images.push(event.target.result); 
    
                   this.myForm.patchValue({
                      fileSource: this.images
                   });
                }
   
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
     
  submit(){
    console.log(this.myForm.value);
    this.http.post('http://localhost:8001/upload.php', this.myForm.value)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }
}
