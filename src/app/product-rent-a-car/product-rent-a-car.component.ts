import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-rent-a-car',
  templateUrl: './product-rent-a-car.component.html',
  styleUrls: ['./product-rent-a-car.component.css']
})
export class ProductRentACarComponent implements OnInit {
  pickupCity: string;
  dropoffCity: string;
  startDate: Date;
  endDate: Date;
  filter: String;
  cars: any[] = [
    { name: 'Car 1', type: 'Manual', price: 50, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 2', type: 'Auto', price: 60, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 3', type: 'Manual', price: 55, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 4', type: 'Auto', price: 65, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 5', type: 'Manual', price: 70, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 6', type: 'Auto', price: 75, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 7', type: 'Manual', price: 80, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 8', type: 'Auto', price: 85, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 9', type: 'Manual', price: 80, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 10', type: 'Auto', price: 85, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 11', type: 'Manual', price: 50, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 12', type: 'Auto', price: 60, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 13', type: 'Manual', price: 55, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 14', type: 'Auto', price: 65, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 15', type: 'Manual', price: 70, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 16', type: 'Auto', price: 75, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 17', type: 'Manual', price: 80, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 18', type: 'Auto', price: 85, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 19', type: 'Manual', price: 80, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    { name: 'Car 20', type: 'Auto', price: 85, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*' },
    // Add more cars as needed
    // Add more cars as needed
    // Add more cars as needed
  ];
  carImageUrl: string = 'https://hips.hearstapps.com/hmg-prod/images/honda-prelude-concept-front-three-quarters-653927960f1f4.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=980:*';

  constructor() { }

  ngOnInit() {
    // Initialize any data or perform initialization logic
  }

  onSubmit() {
    // Handle form submission, e.g., filter cars based on input values
  }
}
