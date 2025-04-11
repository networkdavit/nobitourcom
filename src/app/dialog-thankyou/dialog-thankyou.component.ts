import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dialog-thankyou',
  templateUrl: './dialog-thankyou.component.html',
  styleUrls: ['./dialog-thankyou.component.css']
})
export class DialogThankyouComponent implements OnInit {
  orderDetails: any;
  from: string;
  to: string;
  date: string;
  time: string;
  childrenCount: number;
  adultCount: number;
  countryCode: string;
  phoneNumber: string;
  carType: string;
  showFrom: string;
  showTo: string;
  carTypeRu: string;

  locations = [
    { label: 'Аэропорт Сочи (Адлер)', value: 'airport_sochi' },
    { label: 'ЖД Адлер', value: 'adler_railway' },
    { label: 'ЖД Сочи', value: 'sochi_railway' },
    { label: 'Цандрипш', value: 'tsandripsh' },
    { label: 'Гагра', value: 'gagra' },
    { label: 'Пицунда', value: 'pitsunda' },
    { label: 'п. Лдзаа', value: 'ldzaa' },
    { label: 'Золотая бухта', value: 'zolotaya_bukhta' },
    { label: 'Гудаута', value: 'gudauta' },
    { label: 'Новый Афон', value: 'novy_afon' },
    { label: 'Гуандра, Эшера', value: 'guandra_eshera' },
    { label: 'Сухум', value: 'sukhumi' },
    { label: 'Агудзера, Гулрыпш', value: 'agudzera_gulrypsh' },
    { label: 'Кындыг', value: 'kyndyg' },
    { label: 'Очамчира', value: 'ochamchira' },
    { label: 'Красная поляна (поселок)', value: 'krasnaya_polyana_settlement' },
    { label: 'Красная поляна 540м', value: 'krasnaya_polyana_540m' },
    { label: 'Красная поляна 960м', value: 'krasnaya_polyana_960m' },
    { label: 'Газпром-Лаура', value: 'gazprom_laure' },
    { label: 'Газпром 1389м', value: 'gazprom_1389m' },
    { label: 'Г.Сочи', value: 'g_sochi' },
    { label: 'Роза Хутор', value: 'rosa_khutor' },
    { label: 'Эсто-Садок', value: 'esto_sadok' },
    { label: 'Роза Плато 1170м', value: 'rosa_plato_1170m' },
    { label: 'Дагомыс', value: 'dagomys' },
    { label: 'Лоо', value: 'loo' },
    { label: 'Вардане', value: 'vardane' },
    { label: 'Лазаревское', value: 'lazarevskoye' },
    { label: 'Другой адрес (когда другой адрес они могут вписать свой вариант)', value: 'custom_address_from' }

  ];

  carTypes = [
    {label: "Эконом", value: 'Econom'},
    { label: "Комфорт" ,value: 'Comfort'},
    { label: "Минивэн" ,value: 'Minivan'},

    { label: "Бизнес" ,value: 'Business'},
    { label: "Микроавтобус" ,value: 'Minibus'},
    { label: "Автобус" ,value: 'Bus'}
  ];

  constructor(
    private dialogRef: MatDialogRef<DialogThankyouComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    public translate: TranslateService,
    private cookieService: CookieService,
    private router: Router,
    private location: Location
  ) {
    this.orderDetails = data.orderDetails;
  }

  ngOnInit() {
    console.log(this.orderDetails, 'order details')
    this.from = this.orderDetails.from;
    this.to = this.orderDetails.to;

    this.countryCode = this.orderDetails.countryCode;
    this.childrenCount = this.orderDetails.childrenCount;
    this.adultCount = this.orderDetails.adultCount;
    this.phoneNumber = this.orderDetails.phoneNumber;
    this.time = this.orderDetails.time;
    this.date = this.orderDetails.date;
    this.carType = this.orderDetails.carType;

    const car = this.carTypes.find(carType => carType.value === this.carType);
    this.carTypeRu = car ? car.label : '';

    const fromLocation = this.locations.find(location => location.value === this.from);
    this.showFrom = fromLocation ? fromLocation.label : '';
    const toLocation = this.locations.find(location => location.value === this.to);
    this.showTo = toLocation ? toLocation.label : '';
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }

  showMessage() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
