import { Component, OnInit , HostListener, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from '../services/connection.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DialogThankyouComponent } from '../dialog-thankyou/dialog-thankyou.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-transfer',
  templateUrl: './product-transfer.component.html',
  styleUrls: ['./product-transfer.component.css'],
  animations: [
    trigger('slideAnimation', [
      state('visible', style({ transform: 'translateX(0%)' })),
      transition('void => visible', [
        style({ transform: 'translateX(100%)' }),
        animate('0.3s ease-out')
      ]),
      transition('visible => void', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
  
})

export class ProductTransferComponent implements OnInit {
  minDate(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate());
    return yesterday.toISOString().split('T')[0];
}
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    const clickedElement = event.target as HTMLElement;

    const isOutsideCarType = !this.isDescendant(clickedElement, document.querySelector('.car-type'));

    if (isOutsideCarType) {
      this.hideInfoBox();
    }
  }

  private touchStartX: number;
  isReturnTransferFrom: boolean = true;
  isMenuVisible = false;
  showWarning: boolean = false;
  transferPrices: any;


  private isDescendant(child: HTMLElement, parent: HTMLElement): boolean {
    let node = child.parentNode;

    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }

    return false;
  }

  recommendedAdventures: any[] = [
    {
      "cityName": "Sochi",
      "countryName": "Russia",
      "iso": "ru",
      "imageUrl": "https://cdn.tripster.ru/thumbs2/9b46e4e8-bfcb-11eb-848c-d658628277d6.384x289.jpg",

    },
    {

      "cityName": "Gagra",
      "countryName": "Abkhazia",
      "iso": "ab",
      "imageUrl": "https://cdn.tripster.ru/thumbs2/f3bafdc6-5904-11ec-8ac5-ee0ff7dbaea7.384x289.jpeg",

    },
    {
      "cityName": "Yerevan",
      "countryName": "Armenia",
      "iso": "am",
      "imageUrl": "https://cdn.tripster.ru/thumbs2/d36b9de2-ac73-11ec-952c-cedb25a2bae8.384x289.jpeg",

    },
    {
      "cityName": "Kaliningrad",
      "countryName": "Russia",
      "iso": "ru",
      "imageUrl": "https://cdn.tripster.ru/thumbs2/b33389a0-b468-11ee-8e6d-c279d60d79ae.800x600.jpeg",

    }
  ];

  countryCodes = [
    { code: '+7', flag: 'ru.png' },
    { code: '+374', flag: 'hy.png' },
    { code: '+359', flag: 'bg.png' },
    { code: '+380', flag: 'uk.png' },
    { code: '+375', flag: 'by.png' }
  ];


  countryCodesReturn = [
    { code: '+7', flag: 'ru.png' },
    { code: '+374', flag: 'hy.png' },
    { code: '+359', flag: 'bg.png' },
    { code: '+380', flag: 'uk.png' },
    { code: '+375', flag: 'by.png' }
  ];
  
  selectedCountryCode: string = this.countryCodes[0].code;
  selectedCountryCodeReturn: string = this.countryCodesReturn[0].code;

  
  phoneNumber: string = '';
  infoBoxTop: number = 0;
  infoBoxLeft: number = 0;
  reviews = [
    {
      name: 'Андрей',
      timestamp: '2 месяца назад',
      text:
        'Большое спасибо за организацию трансфера аэропорт Сочи - Гагра 17.09. 2023. Огромное спасибо Ашоту. Классный водитель и отличный собеседник. На обратном пути Гагра - Сочи 25.09.2023 нас доставила до места красавица и умница Аделина. Дорога до Аэропорта прошла просто великолепно. Спасибо Вам ребята за профессиональный подход. Теперь буду обращаться только вам! Удачи и процветания Вам!!! ﻿﻿ А остальным рекомендую.',
    },
    {
      name: 'Мария',
      timestamp: '3 месяца назад',
      text:
        'Спасибо за организацию трансфера Адлер-Цандрипш. Поездка прошла хорошо. Водитель вежливый и аккуратно водит авто! И цены ниже, чем нам предлагали трансфер от гостевого дома, где мы остановились. В дальнейшем, при посещении Абхазии, будем обращаться сразу к вам!',
    },
    {
      name: 'Ирина',
      timestamp: '3 месяца назад',
      text:
        'Спасибо за транспортный трансфер Сочи - Гагра - Сочи! Оформили заказ онлайн, за сутки получили информацию для контакта с водителем, данные машины. Были приятно удивлены уровнем организации трансфера - комфорт, пунктуальность, профессионализм и просто приятное общение. Рекомендую)) ﻿﻿',
    },
    {
      name: 'Юлия',
      timestamp: 'около 1 года назад',
      text:
        'Спасибо за организацию трансфера Аэропорт-Гагра-Адлер. Обе поездки прошли отлично! Водители культурны и вежливы, пунктуальны, с профессиональным уровнем вождения. Особое спасибо водителю Максиму на белой киа рио :) !',
    },
    {
      name: 'Юлия',
      timestamp: 'около 1 года назад',
      text:
        'Спасибо за организацию трансфера Аэропорт-Гагра-Адлер. Обе поездки прошли отлично! Водители культурны и вежливы, пунктуальны, с профессиональным уровнем вождения. Особое спасибо водителю Максиму на белой киа рио :) !',
    },
    {
      name: 'Наталья',
      timestamp: 'около 1 года назад',
      text:
        'Выражаем большую благодарность водителю Дмитрию !!! Очень аккуратно ехал , езда спокойная уверенная !!! Спасибо большое!!! Аделине спасибо за организацию трансфера!',
    },
    {
      name: 'Игорь',
      timestamp: 'около 1 года назад',
      text:
        'Здравствуйте, выражаю большую благодарность Алексею за высокий уровень работы. Автомобиль, его техническое состояние. Чёткая доставка, услуги по предоставлению клиентам воды питьевой каждому пассажиру 0,3л. Это просто супер и важно при такой жаре. 5+ без вопросов.',
    },
    {
      name: 'Игорь',
      timestamp: 'около 1 года назад',
      text:
        'Добрый день. От всей нашей компании выражаем огромную благодарность Аделине за вашу работу. Услуги трансфера у вас на высшем уровне. Всё четко, вовремя, чисто и комфортно. Идёте на встречу, если случился форс-мажор, как у нас. Каждый водитель который нас вез, всегда помогал с багажом, погрузить и выгрузить, это очень приятно. Водитель Тимур покорил детские сердца, спасибо ему, несколько часов на границе с детьми- это не просто. Водители Ашот и Александр-просто профессионалы, время с ними в пути просто пролетало. Ребята ещё и рассказывали по дороге истории про Абхазию. Спасибо Вам, в следующую поездку только с Вами.',
    },
    {
      name: 'Татьяна',
      timestamp: 'около 1 года назад',
      text:
        'Ещё раз благодарю Аделину за организацию нашего трансфера. Большое спасибо Станиславу, благодаря ему наш малыш легко перенёс дорогу. Процветания Вам)🤩',
    },
    {
      name: 'Джалиль',
      timestamp: 'около 1 года назад',
      text:
        'Хотел поблагодарить за предоставленные услуги по трансферу с айропорта в Абхазию (Пицунда ) и также в обратном направлении. Все было замечательно, вовремя и комфортно👍🏻. Также за отличных водителей, в особенности Максима, за безопасную аккуратную поездку. Большое спасибо',
    },
  ];

  
  faqlist = [
    {
      question: 'Как понять, что мой заказ подтвержден?',
      isOpen: false,
      answer: 'После отправления формы заявки, в течении 5-10 мин с Вами свяжется менеджер, для подтверждения заявки и уточнении деталей поездки.'
    },
    {
      question: 'Нужно ли пересаживаться в другое авто после прохождения границы?',
      isOpen: false,
      answer: 'Мы ценим время и комфорт каждого пассажира, поэтому от начала и до конца поездки - один водитель, пересадок в другое авто нет!'
    },
    {
      question: 'С нами дети, интересует наличие ДУУ?',
      isOpen: false,
      answer: 'Мы за безопасность, по желанию предоставляем для детей бустеры, кресла, автолюльки (включены в стоимость поездки). По правилам ПДД детей в возрасте с 7 до 11 лет при поездке сзади разрешено пристегивать штатными ремнями безопасности. Уважаемые родители, учитывайте рост, вес и телосложение ваших детей, не всегда поездка с ДУУ может быть безопасна для ребенка! В любом случае, Вас всегда может проконсультировать менеджер по этим вопросам.'
    },
    {
      question: 'Если я не могу найти свой маршрут?',
      isOpen: false,
      answer: 'Если Вы не нашли нужный маршрут в поисковике, следует обратиться за помощью к менеджеру. Вы можете отправить электронное письмо на наш e-mail, а также позвонить/написать на WhatsApp по номеру +7 (940) 910-30-10. Укажите все детали и требования для маршрута, чтобы сотрудник мог предложить вам наиболее подходящие альтернативы и помочь с составлением заявки. Ответ менеджера поступит в течении 5-10 мин.'
    },
    {
      question: 'Могу ли я оплатить заказ от юр.лица?',
      isOpen: false,
      answer: 'Да, мы составляем договор, высылаем реквизиты на оплату, либо выставляем счет на организацию/компанию.'
    },
    {
      question: 'Цена указана за машину или за человека?',
      isOpen: false,
      answer: 'Стоимость индивидуального трансфера приведена за всю машину, а не с каждого пассажира.'
    },
    {
      question: 'Я еду с животными, какие правила?',
      isOpen: false,
      answer: 'Мы «ЗА» путешествие с Вашими любимцами, но необходимо соблюдать определенные правила, чтобы обеспечить безопасность питомца, водителя, пассажиров. Используйте специальные переноски (при их отсутствии, гарантируйте, что животное надежно пристегнуто ошейником/поводком). При пересечении границы у Вас на руках должны быть все необходимые для этого документы. Доплата за перевозку конкретного животного определяется индивидуально.'
    },
    {
      question: 'Как изменить заказ?',
      isOpen: false,
      answer: 'Если при оформлении заявки Вы нашли ошибку или поменялся адрес приезда/выезда, напишите менеджеру на WhatsApp/e-mail и сообщите об этом. Поможем исправить заявку и сориентируем по стоимости поездки.'
    },
    {
      question: 'Какие гарантии, что Вы меня встретите?',
      isOpen: false,
      answer: 'Мы работаем - официально. Наша репутация нам дороже всего. Мы заинтересованны в качестве предоставляемых услуг, в вашем настроении к началу или концу отдыха, обрабатываем каждое предложение со стороны клиента и с каждым годом становимся лучше! Вы всегда можете позвонить, написать нам в WhatsApp/e-mail. Также активно ведем страницы в ВК, Instagram. Все отзывы только от настоящих клиентов.'
    },
    {
      question: 'Может ли измениться цена после бронирования?',
      isOpen: false,
      answer: 'Цена фиксируется в момент бронирования поездки и может измениться только в случае дополнительных заездов по пути в пункт назначения (магазины/аптеки и тд).'
    },
    {
      question: 'За какое времени нужно оформлять заявку на трансфер?',
      isOpen: false,
      answer: 'Мы рекомендуем оформлять заявку не позднее, чем за 3 дня до приезда/отъезда (можно и за месяц). Но! Если до поездки осталось менее 24ч или Вы уже на месте, Вы всегда можете написать/позвонить нам в WhatsApp по указанному номеру телефона +7 (940) 910-30-10, мы постараемся найти водителя и сообщим, сможем ли предоставить трансфер.'
    },
  ];
  orderForm: FormGroup;
  website_language: string = "";
  carTypes = [];
  showMobileContactFields = false;

  
  selectedCarType: any;
  carSelectionDisabled: boolean = true;
  economPrice: any;
  comfortPrice: any;
  minivanPrice: any;
  minibusPrice: any;
  newBusiness_Price: any;
  busPrice: any;

  showCustomAddressInput: boolean = false;
  showCustomAddressInputToReturn: boolean = false;
  showCustomAddressInputFrom: boolean = false;
  showCustomAddressInputTo: boolean = false;
  showCustomAddressInputFromReturn: boolean = false;
  is_device_mobile: boolean = false;
  // fromLocations = [
  //   { label: 'Аэропорт Сочи (Адлер)/ Жд Адлер в Абхазию', value: 'airport_sochi' },
  //   { label: 'С Адлера (аэро/жд) в РФ', value: 'adler_to_rf' },
  //   // Add more predefined locations as needed
  // ];
  filteredFromLocations: any[] = [];
  filteredToLocations: any[] = [];
  
   fromLocations = [
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
    { label: 'Другой адрес ', value: 'custom_address_from' }

  ];

    toLocations = [
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
    { label: 'Другой адрес ', value: 'custom_address_to' }

  ];
  
  

  priceIncreases = {
    'Econom': {
      'Цандрипш': 0,
      'Гагра': 0,
      'Пицунда': 0,
      'п. Лдзаа':0 ,
      'Золотая бухта':0 ,
      'Гудаута':0, 
      'Новый Афон':0,
      'Гуандра,Эшера':0, 
      'Сухум' :0,
      'Агудзера,Гулрыпш' :0,
      'Кындыг' :0,
      'Очамчира' :0,
      'Красная поляна (поселок)':0,
      'Красная поляна 540м':0,
      'Красная поляна 960м':0,
      'Газпром-Лаура':0,
      'Газпром 1389м':0,
      'Г.Сочи':0,
      'Роза Хутор':0, 
      'Эсто-Садок':0,
      'Роза Плато':0,
      'Дагомыс':0,
      'Лоо':0,
      'Вардане':0, 
      'Лазаревское':0,
    },
    'Comfort': {
      'Цандрипш': 300,
      'Гагра': 500,
      'Пицунда': 4000,
      'п. Лдзаа':700 ,
      'Золотая бухта':5500 ,
      'Гудаута':700, 
      'Новый Афон':800,
      'Гуандра,Эшера':800, 
      'Сухум' :600,
      'Агудзера,Гулрыпш' :500,
      'Кындыг' :800,
      'Очамчира' :600,
      'Красная поляна (поселок)':600,
      'Красная поляна 540м':600,
      'Красная поляна 960м':600,
      'Газпром-Лаура':600,
      'Газпром 1389м':600,
      'Г.Сочи':600,
      'Роза Хутор':600, 
      'Эсто-Садок':600,
      'Роза Плато':600,
      'Дагомыс':600,
      'Лоо':400,
      'Вардане':400, 
      'Лазаревское':400,
    },
    // ... add other car types as needed
  };
  
  direction: 'left' | 'right' = 'right';

  isSliding: boolean = false;
  firstVisibleIndex = 0;
  selectedPrice: number;
  showInfo: boolean = false;
  allCombinations = [];
  constructor(private router: Router, private el: ElementRef, private dialog: MatDialog,private formBuilder: FormBuilder, private data: ConnectionService) { }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('car-type-image')) {
      this.touchStartX = event.touches[0].clientX;
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('car-type-image')) {
      const touchEndX = event.changedTouches[0].clientX;
      const deltaX = touchEndX - this.touchStartX;
      const swipeThreshold = 50;

      if (deltaX > swipeThreshold) {
        this.scrollCarousel('left');
      } else if (deltaX < -swipeThreshold) {
        this.scrollCarousel('right');
      }
    }
  }

  get lastVisibleIndex(): number {
    let visible = 2
    this.is_device_mobile = this.detectMob()
    if(this.is_device_mobile){
      visible = 1
    }
    return this.firstVisibleIndex + visible; // Assuming 3 visible items
  }

  // Create an array of currently visible car types
  get visibleCarTypes(): any[] {
    return this.carTypes.slice(this.firstVisibleIndex, this.lastVisibleIndex + 1);
  }

  scrollCarousel(direction: 'left' | 'right'): void {
    if (!this.isSliding) {
      this.isSliding = true;
      this.direction = direction;
  
      if (this.is_device_mobile) {
        // For mobile devices, scroll 2 at a time
        if (direction === 'left') {
          if (this.firstVisibleIndex > 1) {
            this.firstVisibleIndex -= 2;
          } else {
            this.firstVisibleIndex = this.carTypes.length - 2;
          }
        } else if (direction === 'right') {
          if (this.lastVisibleIndex < this.carTypes.length - 2) {
            this.firstVisibleIndex += 2;
          } else {
            this.firstVisibleIndex = 0;
          }
        }
      } else {
        // For other devices, scroll 3 at a time
        if (direction === 'left') {
          if (this.firstVisibleIndex > 2) {
            this.firstVisibleIndex -= 3;
          } else {
            this.firstVisibleIndex = this.carTypes.length - 3;
          }
        } else if (direction === 'right') {
          if (this.lastVisibleIndex < this.carTypes.length - 3) {
            this.firstVisibleIndex += 3;
          } else {
            this.firstVisibleIndex = 0;
          }
        }
      }
  
      if(!this.is_device_mobile){
        setTimeout(() => {
          this.isSliding = false;
        }, 300); 
      }
      else{
        setTimeout(() => {
          this.isSliding = false;
        }, 200); 
      }
     
    }
  }
  
  
  openYandexReviews() {
    window.open('https://yandex.ru/maps/org/transfer_nobi/241403523161/?ll=39.738581%2C43.285359&z=9', '_blank');
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
  
    if (scrollY > 500 || scrollX > 500) {
      // Delay for 300 milliseconds before hiding the menu
      setTimeout(() => {
        this.isMenuVisible = false;
      }, 300);
    }
  }

  ngOnInit(): void {
    this.getTransferPrices()
    // window.scrollTo({ top:550, behavior: 'smooth' });

    this.carTypes = [
      { name: 'Econom', image: '../../assets/img/new_cars/economcar.PNG',brands: 'Renault Laguna, Hyundai Solaris,Kia Rio и др. ', russianName: "Эконом", description: "Удобный и доступный способ перемещения для маленькой компании от 3х до 4х человек.  Мы предлагаем широкий выбор автомобилей,позволяя каждому найти оптимальное решение для своих потребностей."},
      { name: 'Comfort', image: '../../assets/img/new_cars/comfortcar.PNG',brands:'Ford Fusion (2020г Американский), Hyundai Sonata, Skoda Octavia и др.' ,russianName: "Комфорт+ ", description: "Автомобили с просторным салоном и вместительным багажником. Такой вариант отлично подойдет для 4х пассажиров." },
      { name: 'Minivan', image: '../../assets/img/new_cars/minivancar.PNG',brands:'Toyota Alphard, Volkswagen Caravelle, Toyota Voxy и др.', russianName: "Минивен ",description: "Вместительный багажник,комфортные сидения,высокая посадка авто - минивен идеально подходит для семейных поездок, поездок с друзьями до 7-8 человек,а также для всех,кто любит просторный салон." },

      { name: 'Business', image: '../../assets/img/new_cars/businesscar.PNG',brands: 'Mercedes Benz E/S/V класса', russianName: "Бизнес ",description: "Бизнес-такси- это услуга,которая предоставляется в статусных автомобилях и обладает высоким уровнем сервиса и комфорта." },
      { name: 'Minibus', image: '../../assets/img/new_cars/microbus_new.png', description: "Some temporary description" },
      { name: 'Bus', image: '../../assets/img/new_cars/new_bus.png', description: "Some temporary description" }
    ];

    this.website_language = localStorage.getItem('lang');
    this.createOrderForm();
    this.updateToOptions();

  }
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  updatePhoneNumber() {
    const countryCode = (document.querySelector('.country-code') as HTMLSelectElement).value;
    this.phoneNumber = countryCode;
  }

  
  detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  scrollTo(location) {
    const windowHeight = window.innerHeight;
    const totalHeight = document.body.clientHeight;
  
    let scrollPosition;
  
    if (location === 'order') {
      scrollPosition = 0.15 * totalHeight; 
    } else if(location === 'faq'){
      scrollPosition = 0.34 * totalHeight;
    }
    else if (location === 'reviews') {
      scrollPosition = 0.45 * totalHeight; 
    } else if (location === 'cooperation') {
      scrollPosition = 0.77 * totalHeight; 
    }
  
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  }

  scrollToMobile(location) {
    const windowHeight = window.innerHeight;
    const totalHeight = document.body.clientHeight;
  
    let scrollPosition;
  
    if (location === 'order') {
      scrollPosition = 0.06 * totalHeight; 
    } else if(location === 'faq'){
      scrollPosition = 0.4 * totalHeight;
    }
    else if (location === 'reviews') {
      scrollPosition = 0.46 * totalHeight; 
    } else if (location === 'cooperation') {
      scrollPosition = 0.83 * totalHeight; 
    }
  
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  }

  
  toggleAnswer(index: number): void {
    this.faqlist.forEach((item, i) => {
      item.isOpen = i === index ? !item.isOpen : false;
    });
  }

  getFlagImage(): string {
    const selectedCountry = this.countryCodes.find(country => country.code === this.selectedCountryCode);
    return selectedCountry ? selectedCountry.flag : '';
  }
  getFlagImageReturn(): string {
    const selectedCountryReturn = this.countryCodesReturn.find(country => country.code === this.selectedCountryCodeReturn);
    return selectedCountryReturn ? selectedCountryReturn.flag : '';
  }
  
  onCountryCodeChange(event: any): void {
    this.selectedCountryCode = event.target.value;
  }

  onCountryCodeChangeReturn(event: any): void {
    this.selectedCountryCodeReturn = event.target.value;
  }
checkReturnPrice(){
  const fromReturn = this.orderForm.get('returnTransferDetails.fromReturn').value;
  const toReturn = this.orderForm.get('returnTransferDetails.toReturn').value;
  console.log(fromReturn, toReturn)

  if( toReturn == "custom_address_to"){
    this.showCustomAddressInputToReturn = true;
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
    this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else{
    this.showCustomAddressInputToReturn = false;
  }
  if( fromReturn == "custom_address_from"){
    this.showCustomAddressInputFromReturn = true;
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
    this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else{
    this.showCustomAddressInputFromReturn = false
  }

}

toggleMobileContactFields(): void {
  this.showMobileContactFields = !this.showMobileContactFields;
}

checkPrice() {
  console.log(123123123)
  const selectedFrom = this.orderForm.get('from').value;
  const selectedTo = this.orderForm.get('to').value;
 
  
  if( selectedTo == "custom_address_to"){
    this.showCustomAddressInputTo = true;
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
    this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else{
    this.showCustomAddressInputTo = false;
  }
  if( selectedFrom == "custom_address_from"){
    this.showCustomAddressInputFrom = true;
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
    this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else{
    this.showCustomAddressInputFrom = false
  }
  console.log(this.transferPrices, 'transfer prices in check price')
  console.log(this.getValueByTag('airport_sochi_adler_railway'), 'value by tag')
  // console.log("checked", selectedFrom, selectedTo);
  if((selectedFrom == 'airport_sochi' && selectedTo == 'adler_railway') ||(selectedTo == 'airport_sochi' && selectedFrom == 'adler_railway') ){
    this.economPrice = this.getValueByTag('airport_sochi_adler_railway_econom');
    this.comfortPrice = "Уточнить";
    this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'sochi_railway') ||(selectedTo == 'airport_sochi' && selectedFrom == 'sochi_railway') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'tsandripsh') ||(selectedTo == 'airport_sochi' && selectedFrom == 'tsandripsh') ){
    this.economPrice =  this.getValueByTag('airport_sochi_adler_tsandripsh_econom');
    this.comfortPrice =  this.getValueByTag('airport_sochi_adler_tsandripsh_comfort');
    this.minivanPrice =  this.getValueByTag('airport_sochi_adler_tsandripsh_minivan');
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'gagra') ||(selectedTo == 'airport_sochi' && selectedFrom == 'gagra') ){
    this.economPrice = "3000";
    this.comfortPrice = "3500";
    this.minivanPrice = "4000";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'pitsunda') ||(selectedTo == 'airport_sochi' && selectedFrom == 'pitsunda') ){
    this.economPrice = this.getValueByTag('airport_sochi_pitsunda_econom');
    this.comfortPrice = this.getValueByTag('airport_sochi_pitsunda_comfort');
        this.minivanPrice = this.getValueByTag('airport_sochi_pitsunda_minivan');
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'ldzaa') ||(selectedTo == 'airport_sochi' && selectedFrom == 'ldzaa') ){
    this.economPrice =  this.getValueByTag('airport_sochi_ldzaa_econom');
    this.comfortPrice =  this.getValueByTag('airport_sochi_ldzaa_comfort');
        this.minivanPrice =  this.getValueByTag('airport_sochi_ldzaa_minivan');
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'zolotaya_bukhta') ||(selectedTo == 'airport_sochi' && selectedFrom == 'zolotaya_bukhta') ){
    this.economPrice = this.getValueByTag('airport_sochi_zolotaya_bukhta_econom');
    this.comfortPrice = this.getValueByTag('airport_sochi_zolotaya_bukhta_comfort');
        this.minivanPrice = this.getValueByTag('airport_sochi_zolotaya_bukhta_minivan');
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'gudauta') ||(selectedTo == 'airport_sochi' && selectedFrom == 'gudauta') ){
    this.economPrice = this.getValueByTag('airport_sochi_gudauta_econom');
    this.comfortPrice = this.getValueByTag('airport_sochi_gudauta_comfort');
        this.minivanPrice = this.getValueByTag('airport_sochi_gudauta_minivan');
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'novy_afon') ||(selectedTo == 'airport_sochi' && selectedFrom == 'novy_afon') ){
    this.economPrice = this.getValueByTag('airport_sochi_novy_afon_econom');
    this.comfortPrice = this.getValueByTag('airport_sochi_novy_afon_comfort');
        this.minivanPrice = this.getValueByTag('airport_sochi_novy_afon_minivan');
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'guandra_eshera') ||(selectedTo == 'airport_sochi' && selectedFrom == 'guandra_eshera') ){
    this.economPrice = this.getValueByTag('airport_sochi_guandra_eshera_econom');
    this.comfortPrice = this.getValueByTag('airport_sochi_guandra_eshera_econom');
        this.minivanPrice = this.getValueByTag('airport_sochi_guandra_eshera_minivan');
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'sukhumi') ||(selectedTo == 'airport_sochi' && selectedFrom == 'sukhumi') ){
    this.economPrice = this.getValueByTag('airport_sochi_sukhumi_econom');
    this.comfortPrice = this.getValueByTag('airport_sochi_sukhumi_comfort');
        this.minivanPrice = this.getValueByTag('airport_sochi_sukhumi_minivan');
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'agudzera_gulrypsh') ||(selectedTo == 'airport_sochi' && selectedFrom == 'agudzera_gulrypsh') ){
    this.economPrice = this.getValueByTag('airport_sochi_agudzera_gulrypsh_econom');
    this.comfortPrice = this.getValueByTag('airport_sochi_agudzera_gulrypsh_comfort');
        this.minivanPrice = this.getValueByTag('airport_sochi_agudzera_gulrypsh_minivan');
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'kyndyg') ||(selectedTo == 'airport_sochi' && selectedFrom == 'kyndyg') ){
    this.economPrice = this.getValueByTag('airport_sochi_kyndyg_econom');
    this.comfortPrice = this.getValueByTag('airport_sochi_kyndyg_comfort');
        this.minivanPrice = this.getValueByTag('airport_sochi_kyndyg_minivan');
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'ochamchira') ||(selectedTo == 'airport_sochi' && selectedFrom == 'ochamchira') ){
    this.economPrice = this.getValueByTag('airport_sochi_ochamchira_econom');
    this.comfortPrice = this.getValueByTag('airport_sochi_ochamchira_comfort');
        this.minivanPrice = this.getValueByTag('airport_sochi_ochamchira_minivan');
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'airport_sochi' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'airport_sochi' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'airport_sochi' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'gazprom_laure') ||(selectedTo == 'airport_sochi' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'airport_sochi' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'g_sochi') ||(selectedTo == 'airport_sochi' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'rosa_khutor') ||(selectedTo == 'airport_sochi' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'esto_sadok') ||(selectedTo == 'airport_sochi' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'airport_sochi' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'dagomys') ||(selectedTo == 'airport_sochi' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";;
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'loo') ||(selectedTo == 'airport_sochi' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";;
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'vardane') ||(selectedTo == 'airport_sochi' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";;
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'airport_sochi' && selectedTo == 'lazarevskoye') ||(selectedTo == 'airport_sochi' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";;
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //----

  else if((selectedFrom == 'adler_railway' && selectedTo == 'sochi_railway') ||(selectedTo == 'adler_railway' && selectedFrom == 'sochi_railway') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'tsandripsh') ||(selectedTo == 'adler_railway' && selectedFrom == 'tsandripsh') ){
    this.economPrice = "2600";
    this.comfortPrice = "2900";
        this.minivanPrice = "3500";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'gagra') ||(selectedTo == 'adler_railway' && selectedFrom == 'gagra') ){
    this.economPrice = "3000";
    this.comfortPrice = "3500";
        this.minivanPrice = "4000";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'pitsunda') ||(selectedTo == 'adler_railway' && selectedFrom == 'pitsunda') ){
    this.economPrice = "3500";
    this.comfortPrice = "4000";
        this.minivanPrice = "4500";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'ldzaa') ||(selectedTo == 'adler_railway' && selectedFrom == 'ldzaa') ){
    this.economPrice = "4000";
    this.comfortPrice = "4700";
        this.minivanPrice = "5300";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'zolotaya_bukhta') ||(selectedTo == 'adler_railway' && selectedFrom == 'zolotaya_bukhta') ){
    this.economPrice = "4700";
    this.comfortPrice = "5500";
        this.minivanPrice = "6000";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'gudauta') ||(selectedTo == 'adler_railway' && selectedFrom == 'gudauta') ){
    this.economPrice = "4300";
    this.comfortPrice = "5000";
        this.minivanPrice = "5500";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'novy_afon') ||(selectedTo == 'adler_railway' && selectedFrom == 'novy_afon') ){
    this.economPrice = "4700";
    this.comfortPrice = "5500";
        this.minivanPrice = "6000";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'guandra_eshera') ||(selectedTo == 'adler_railway' && selectedFrom == 'guandra_eshera') ){
    this.economPrice = "5000";
    this.comfortPrice = "5800";
        this.minivanPrice = "6500";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'sukhumi') ||(selectedTo == 'adler_railway' && selectedFrom == 'sukhumi') ){
    this.economPrice = "5500";
    this.comfortPrice = "6100";
        this.minivanPrice = "6500";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'agudzera_gulrypsh') ||(selectedTo == 'adler_railway' && selectedFrom == 'agudzera_gulrypsh') ){
    this.economPrice = "6500";
    this.comfortPrice = "7000";
        this.minivanPrice = "7300";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'kyndyg') ||(selectedTo == 'adler_railway' && selectedFrom == 'kyndyg') ){
    this.economPrice = "7000";
    this.comfortPrice = "7800";
        this.minivanPrice = "7800";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'ochamchira') ||(selectedTo == 'adler_railway' && selectedFrom == 'ochamchira') ){
    this.economPrice = "8000";
    this.comfortPrice = "8600";
        this.minivanPrice = "9000";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'adler_railway' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "1600р";
    this.comfortPrice = "2200";
        this.minivanPrice = "2600";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'adler_railway' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "1700р";
    this.comfortPrice = "2300";
        this.minivanPrice = "2700";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'adler_railway' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "2000";
    this.comfortPrice = "2600";
        this.minivanPrice = "3000";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'gazprom_laure') ||(selectedTo == 'adler_railway' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "1700р";
    this.comfortPrice = "2300";
        this.minivanPrice = "2700";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'adler_railway' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "2400";
    this.comfortPrice = "3000";
        this.minivanPrice = "3400";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'g_sochi') ||(selectedTo == 'adler_railway' && selectedFrom == 'g_sochi') ){
    this.economPrice = "1700р";
    this.comfortPrice = "2300";
        this.minivanPrice = "2700";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'rosa_khutor') ||(selectedTo == 'adler_railway' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "1700р";
    this.comfortPrice = "2300";
        this.minivanPrice = "2700";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'esto_sadok') ||(selectedTo == 'adler_railway' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "1700р";
    this.comfortPrice = "2300";
        this.minivanPrice = "2700";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'adler_railway' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "2000";
    this.comfortPrice = "2600";
        this.minivanPrice = "3100";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'dagomys') ||(selectedTo == 'adler_railway' && selectedFrom == 'dagomys') ){
    this.economPrice = "2000";
    this.comfortPrice = "2600";
        this.minivanPrice = "3000";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'loo') ||(selectedTo == 'adler_railway' && selectedFrom == 'loo') ){
    this.economPrice = "2800";
    this.comfortPrice = "3200";
        this.minivanPrice = "3800";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'vardane') ||(selectedTo == 'adler_railway' && selectedFrom == 'vardane') ){
    this.economPrice = "3000";
    this.comfortPrice = "3600";
        this.minivanPrice = "4000";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'adler_railway' && selectedTo == 'lazarevskoye') ||(selectedTo == 'adler_railway' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "4000";
    this.comfortPrice = "4600";
        this.minivanPrice = "5000";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  // --

  else if((selectedFrom == 'sochi_railway' && selectedTo == 'tsandripsh') ||(selectedTo == 'sochi_railway' && selectedFrom == 'tsandripsh') ){
    this.economPrice = "4100";
    this.comfortPrice = "4400";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "5000";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'gagra') ||(selectedTo == 'sochi_railway' && selectedFrom == 'gagra') ){
    this.economPrice = "4500";
    this.comfortPrice = "5000";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "5500";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'pitsunda') ||(selectedTo == 'sochi_railway' && selectedFrom == 'pitsunda') ){
    this.economPrice = "5000";
    this.comfortPrice = "5500";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Пицунда";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'ldzaa') ||(selectedTo == 'sochi_railway' && selectedFrom == 'ldzaa') ){
    this.economPrice = "5000";
    this.comfortPrice = "6200";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "6800";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'zolotaya_bukhta') ||(selectedTo == 'sochi_railway' && selectedFrom == 'zolotaya_bukhta') ){
    this.economPrice = "6200";
    this.comfortPrice = "7000";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "7500";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'gudauta') ||(selectedTo == 'sochi_railway' && selectedFrom == 'gudauta') ){
    this.economPrice = "5800";
    this.comfortPrice = "6500";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "7000";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'novy_afon') ||(selectedTo == 'sochi_railway' && selectedFrom == 'novy_afon') ){
    this.economPrice = "6200";
    this.comfortPrice = "7000";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "7500";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'guandra_eshera') ||(selectedTo == 'sochi_railway' && selectedFrom == 'guandra_eshera') ){
    this.economPrice = "6500";
    this.comfortPrice = "7300";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "8000";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'sukhumi') ||(selectedTo == 'sochi_railway' && selectedFrom == 'sukhumi') ){
    this.economPrice = "7000";
    this.comfortPrice = "7600";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "8000";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'agudzera_gulrypsh') ||(selectedTo == 'sochi_railway' && selectedFrom == 'agudzera_gulrypsh') ){
    this.economPrice = "8000";
    this.comfortPrice = "8500";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "8800";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'kyndyg') ||(selectedTo == 'sochi_railway' && selectedFrom == 'kyndyg') ){
    this.economPrice = "9500";
    this.comfortPrice = "9300";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "9300";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'ochamchira') ||(selectedTo == 'sochi_railway' && selectedFrom == 'ochamchira') ){
    this.economPrice = "9500";
    this.comfortPrice = "10100"
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "10500";
    this.busPrice = "Уточнить";;
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'sochi_railway' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'sochi_railway' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'sochi_railway' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'gazprom_laure') ||(selectedTo == 'sochi_railway' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'sochi_railway' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'g_sochi') ||(selectedTo == 'sochi_railway' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'rosa_khutor') ||(selectedTo == 'sochi_railway' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'esto_sadok') ||(selectedTo == 'sochi_railway' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'sochi_railway' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'dagomys') ||(selectedTo == 'sochi_railway' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'loo') ||(selectedTo == 'sochi_railway' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'vardane') ||(selectedTo == 'sochi_railway' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sochi_railway' && selectedTo == 'lazarevskoye') ||(selectedTo == 'sochi_railway' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //-----

  else if((selectedFrom == 'tsandripsh' && selectedTo == 'gagra') ||(selectedTo == 'tsandripsh' && selectedFrom == 'gagra') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'pitsunda') ||(selectedTo == 'tsandripsh' && selectedFrom == 'pitsunda') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'ldzaa') ||(selectedTo == 'tsandripsh' && selectedFrom == 'ldzaa') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'zolotaya_bukhta') ||(selectedTo == 'tsandripsh' && selectedFrom == 'zolotaya_bukhta') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'gudauta') ||(selectedTo == 'tsandripsh' && selectedFrom == 'gudauta') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'novy_afon') ||(selectedTo == 'tsandripsh' && selectedFrom == 'novy_afon') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'guandra_eshera') ||(selectedTo == 'tsandripsh' && selectedFrom == 'guandra_eshera') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'sukhumi') ||(selectedTo == 'tsandripsh' && selectedFrom == 'sukhumi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'agudzera_gulrypsh') ||(selectedTo == 'tsandripsh' && selectedFrom == 'agudzera_gulrypsh') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'kyndyg') ||(selectedTo == 'tsandripsh' && selectedFrom == 'kyndyg') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'ochamchira') ||(selectedTo == 'tsandripsh' && selectedFrom == 'ochamchira') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'tsandripsh' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'tsandripsh' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'tsandripsh' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'gazprom_laure') ||(selectedTo == 'tsandripsh' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'tsandripsh' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'g_sochi') ||(selectedTo == 'tsandripsh' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'rosa_khutor') ||(selectedTo == 'tsandripsh' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'esto_sadok') ||(selectedTo == 'tsandripsh' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'tsandripsh' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'dagomys') ||(selectedTo == 'tsandripsh' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'loo') ||(selectedTo == 'tsandripsh' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'vardane') ||(selectedTo == 'tsandripsh' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'tsandripsh' && selectedTo == 'lazarevskoye') ||(selectedTo == 'tsandripsh' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  // --

  else if((selectedFrom == 'gagra' && selectedTo == 'pitsunda') ||(selectedTo == 'gagra' && selectedFrom == 'pitsunda') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'ldzaa') ||(selectedTo == 'gagra' && selectedFrom == 'ldzaa') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'zolotaya_bukhta') ||(selectedTo == 'gagra' && selectedFrom == 'zolotaya_bukhta') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'gudauta') ||(selectedTo == 'gagra' && selectedFrom == 'gudauta') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'novy_afon') ||(selectedTo == 'gagra' && selectedFrom == 'novy_afon') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'guandra_eshera') ||(selectedTo == 'gagra' && selectedFrom == 'guandra_eshera') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'sukhumi') ||(selectedTo == 'gagra' && selectedFrom == 'sukhumi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'agudzera_gulrypsh') ||(selectedTo == 'gagra' && selectedFrom == 'agudzera_gulrypsh') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'kyndyg') ||(selectedTo == 'gagra' && selectedFrom == 'kyndyg') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'ochamchira') ||(selectedTo == 'gagra' && selectedFrom == 'ochamchira') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'gagra' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'gagra' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'gagra' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'gazprom_laure') ||(selectedTo == 'gagra' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'gagra' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'g_sochi') ||(selectedTo == 'gagra' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'rosa_khutor') ||(selectedTo == 'gagra' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'esto_sadok') ||(selectedTo == 'gagra' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'gagra' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'dagomys') ||(selectedTo == 'gagra' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'loo') ||(selectedTo == 'gagra' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'vardane') ||(selectedTo == 'gagra' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gagra' && selectedTo == 'lazarevskoye') ||(selectedTo == 'gagra' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //-----


  else if((selectedFrom == 'pitsunda' && selectedTo == 'ldzaa') ||(selectedTo == 'pitsunda' && selectedFrom == 'ldzaa') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'zolotaya_bukhta') ||(selectedTo == 'pitsunda' && selectedFrom == 'zolotaya_bukhta') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'gudauta') ||(selectedTo == 'pitsunda' && selectedFrom == 'gudauta') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'novy_afon') ||(selectedTo == 'pitsunda' && selectedFrom == 'novy_afon') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'guandra_eshera') ||(selectedTo == 'pitsunda' && selectedFrom == 'guandra_eshera') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'sukhumi') ||(selectedTo == 'pitsunda' && selectedFrom == 'sukhumi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'agudzera_gulrypsh') ||(selectedTo == 'pitsunda' && selectedFrom == 'agudzera_gulrypsh') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'kyndyg') ||(selectedTo == 'pitsunda' && selectedFrom == 'kyndyg') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'ochamchira') ||(selectedTo == 'pitsunda' && selectedFrom == 'ochamchira') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'pitsunda' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'pitsunda' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'pitsunda' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'gazprom_laure') ||(selectedTo == 'pitsunda' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'pitsunda' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'g_sochi') ||(selectedTo == 'pitsunda' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'rosa_khutor') ||(selectedTo == 'pitsunda' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'esto_sadok') ||(selectedTo == 'pitsunda' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'pitsunda' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'dagomys') ||(selectedTo == 'pitsunda' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'loo') ||(selectedTo == 'pitsunda' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'vardane') ||(selectedTo == 'pitsunda' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'lazarevskoye') ||(selectedTo == 'pitsunda' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'pitsunda' && selectedTo == 'ldzaa') ||(selectedTo == 'pitsunda' && selectedFrom == 'ldzaa') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'zolotaya_bukhta') ||(selectedTo == 'pitsunda' && selectedFrom == 'zolotaya_bukhta') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'gudauta') ||(selectedTo == 'pitsunda' && selectedFrom == 'gudauta') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'novy_afon') ||(selectedTo == 'pitsunda' && selectedFrom == 'novy_afon') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'guandra_eshera') ||(selectedTo == 'pitsunda' && selectedFrom == 'guandra_eshera') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'sukhumi') ||(selectedTo == 'pitsunda' && selectedFrom == 'sukhumi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'agudzera_gulrypsh') ||(selectedTo == 'pitsunda' && selectedFrom == 'agudzera_gulrypsh') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'kyndyg') ||(selectedTo == 'pitsunda' && selectedFrom == 'kyndyg') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'ochamchira') ||(selectedTo == 'pitsunda' && selectedFrom == 'ochamchira') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'pitsunda' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'pitsunda' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'pitsunda' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'gazprom_laure') ||(selectedTo == 'pitsunda' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'pitsunda' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'g_sochi') ||(selectedTo == 'pitsunda' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'rosa_khutor') ||(selectedTo == 'pitsunda' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'esto_sadok') ||(selectedTo == 'pitsunda' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'pitsunda' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'dagomys') ||(selectedTo == 'pitsunda' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'loo') ||(selectedTo == 'pitsunda' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'vardane') ||(selectedTo == 'pitsunda' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'pitsunda' && selectedTo == 'lazarevskoye') ||(selectedTo == 'pitsunda' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--
  else if((selectedFrom == 'ldzaa' && selectedTo == 'zolotaya_bukhta') ||(selectedTo == 'ldzaa' && selectedFrom == 'zolotaya_bukhta') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'gudauta') ||(selectedTo == 'ldzaa' && selectedFrom == 'gudauta') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'novy_afon') ||(selectedTo == 'ldzaa' && selectedFrom == 'novy_afon') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'guandra_eshera') ||(selectedTo == 'ldzaa' && selectedFrom == 'guandra_eshera') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'sukhumi') ||(selectedTo == 'ldzaa' && selectedFrom == 'sukhumi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'agudzera_gulrypsh') ||(selectedTo == 'ldzaa' && selectedFrom == 'agudzera_gulrypsh') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'kyndyg') ||(selectedTo == 'ldzaa' && selectedFrom == 'kyndyg') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'ochamchira') ||(selectedTo == 'ldzaa' && selectedFrom == 'ochamchira') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'ldzaa' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'ldzaa' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'ldzaa' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'gazprom_laure') ||(selectedTo == 'ldzaa' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'ldzaa' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'g_sochi') ||(selectedTo == 'ldzaa' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'rosa_khutor') ||(selectedTo == 'ldzaa' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'esto_sadok') ||(selectedTo == 'ldzaa' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'ldzaa' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'dagomys') ||(selectedTo == 'ldzaa' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'loo') ||(selectedTo == 'ldzaa' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'vardane') ||(selectedTo == 'ldzaa' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ldzaa' && selectedTo == 'lazarevskoye') ||(selectedTo == 'ldzaa' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'gudauta') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'gudauta') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'novy_afon') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'novy_afon') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'guandra_eshera') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'guandra_eshera') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'sukhumi') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'sukhumi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'agudzera_gulrypsh') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'agudzera_gulrypsh') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'kyndyg') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'kyndyg') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'ochamchira') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'ochamchira') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'gazprom_laure') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'g_sochi') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'rosa_khutor') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'esto_sadok') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'dagomys') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'loo') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'vardane') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'zolotaya_bukhta' && selectedTo == 'lazarevskoye') ||(selectedTo == 'zolotaya_bukhta' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }


  //--

  else if((selectedFrom == 'gudauta' && selectedTo == 'novy_afon') ||(selectedTo == 'gudauta' && selectedFrom == 'novy_afon') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'guandra_eshera') ||(selectedTo == 'gudauta' && selectedFrom == 'guandra_eshera') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'sukhumi') ||(selectedTo == 'gudauta' && selectedFrom == 'sukhumi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'agudzera_gulrypsh') ||(selectedTo == 'gudauta' && selectedFrom == 'agudzera_gulrypsh') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'kyndyg') ||(selectedTo == 'gudauta' && selectedFrom == 'kyndyg') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'ochamchira') ||(selectedTo == 'gudauta' && selectedFrom == 'ochamchira') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'gudauta' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'gudauta' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'gudauta' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'gazprom_laure') ||(selectedTo == 'gudauta' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'gudauta' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'g_sochi') ||(selectedTo == 'gudauta' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'rosa_khutor') ||(selectedTo == 'gudauta' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'esto_sadok') ||(selectedTo == 'gudauta' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'gudauta' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'dagomys') ||(selectedTo == 'gudauta' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'loo') ||(selectedTo == 'gudauta' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'vardane') ||(selectedTo == 'gudauta' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gudauta' && selectedTo == 'lazarevskoye') ||(selectedTo == 'gudauta' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'novy_afon' && selectedTo == 'guandra_eshera') ||(selectedTo == 'novy_afon' && selectedFrom == 'guandra_eshera') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'sukhumi') ||(selectedTo == 'novy_afon' && selectedFrom == 'sukhumi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'agudzera_gulrypsh') ||(selectedTo == 'novy_afon' && selectedFrom == 'agudzera_gulrypsh') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'kyndyg') ||(selectedTo == 'novy_afon' && selectedFrom == 'kyndyg') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'ochamchira') ||(selectedTo == 'novy_afon' && selectedFrom == 'ochamchira') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'novy_afon' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'novy_afon' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'novy_afon' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'gazprom_laure') ||(selectedTo == 'novy_afon' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'novy_afon' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'g_sochi') ||(selectedTo == 'novy_afon' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'rosa_khutor') ||(selectedTo == 'novy_afon' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'esto_sadok') ||(selectedTo == 'novy_afon' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'novy_afon' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'dagomys') ||(selectedTo == 'novy_afon' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'loo') ||(selectedTo == 'novy_afon' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'vardane') ||(selectedTo == 'novy_afon' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'novy_afon' && selectedTo == 'lazarevskoye') ||(selectedTo == 'novy_afon' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'sukhumi') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'sukhumi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'agudzera_gulrypsh') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'agudzera_gulrypsh') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'kyndyg') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'kyndyg') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'ochamchira') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'ochamchira') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'gazprom_laure') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'g_sochi') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'rosa_khutor') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'esto_sadok') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'dagomys') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'loo') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'vardane') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'guandra_eshera' && selectedTo == 'lazarevskoye') ||(selectedTo == 'guandra_eshera' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }


  //--

  else if((selectedFrom == 'sukhumi' && selectedTo == 'agudzera_gulrypsh') ||(selectedTo == 'sukhumi' && selectedFrom == 'agudzera_gulrypsh') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'kyndyg') ||(selectedTo == 'sukhumi' && selectedFrom == 'kyndyg') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'ochamchira') ||(selectedTo == 'sukhumi' && selectedFrom == 'ochamchira') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'sukhumi' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'sukhumi' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'sukhumi' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'gazprom_laure') ||(selectedTo == 'sukhumi' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'sukhumi' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'g_sochi') ||(selectedTo == 'sukhumi' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'rosa_khutor') ||(selectedTo == 'sukhumi' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'esto_sadok') ||(selectedTo == 'sukhumi' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'sukhumi' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'dagomys') ||(selectedTo == 'sukhumi' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'loo') ||(selectedTo == 'sukhumi' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'vardane') ||(selectedTo == 'sukhumi' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'sukhumi' && selectedTo == 'lazarevskoye') ||(selectedTo == 'sukhumi' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'kyndyg') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'kyndyg') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'ochamchira') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'ochamchira') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'gazprom_laure') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'g_sochi') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'rosa_khutor') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'esto_sadok') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'dagomys') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'loo') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'vardane') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'agudzera_gulrypsh' && selectedTo == 'lazarevskoye') ||(selectedTo == 'agudzera_gulrypsh' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'kyndyg' && selectedTo == 'ochamchira') ||(selectedTo == 'kyndyg' && selectedFrom == 'ochamchira') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'kyndyg' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'kyndyg' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'kyndyg' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'kyndyg' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'kyndyg' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'kyndyg' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'kyndyg' && selectedTo == 'gazprom_laure') ||(selectedTo == 'kyndyg' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'kyndyg' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'kyndyg' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'kyndyg' && selectedTo == 'g_sochi') ||(selectedTo == 'kyndyg' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'kyndyg' && selectedTo == 'rosa_khutor') ||(selectedTo == 'kyndyg' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'kyndyg' && selectedTo == 'esto_sadok') ||(selectedTo == 'kyndyg' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'kyndyg' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'kyndyg' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'kyndyg' && selectedTo == 'dagomys') ||(selectedTo == 'kyndyg' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'kyndyg' && selectedTo == 'loo') ||(selectedTo == 'kyndyg' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'kyndyg' && selectedTo == 'vardane') ||(selectedTo == 'kyndyg' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'kyndyg' && selectedTo == 'lazarevskoye') ||(selectedTo == 'kyndyg' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'ochamchira' && selectedTo == 'krasnaya_polyana_settlement') ||(selectedTo == 'ochamchira' && selectedFrom == 'krasnaya_polyana_settlement') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ochamchira' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'ochamchira' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ochamchira' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'ochamchira' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ochamchira' && selectedTo == 'gazprom_laure') ||(selectedTo == 'ochamchira' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ochamchira' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'ochamchira' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ochamchira' && selectedTo == 'g_sochi') ||(selectedTo == 'ochamchira' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ochamchira' && selectedTo == 'rosa_khutor') ||(selectedTo == 'ochamchira' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ochamchira' && selectedTo == 'esto_sadok') ||(selectedTo == 'ochamchira' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ochamchira' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'ochamchira' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ochamchira' && selectedTo == 'dagomys') ||(selectedTo == 'ochamchira' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ochamchira' && selectedTo == 'loo') ||(selectedTo == 'ochamchira' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ochamchira' && selectedTo == 'vardane') ||(selectedTo == 'ochamchira' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'ochamchira' && selectedTo == 'lazarevskoye') ||(selectedTo == 'ochamchira' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'krasnaya_polyana_settlement' && selectedTo == 'krasnaya_polyana_540m') ||(selectedTo == 'krasnaya_polyana_settlement' && selectedFrom == 'krasnaya_polyana_540m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_settlement' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'krasnaya_polyana_settlement' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_settlement' && selectedTo == 'gazprom_laure') ||(selectedTo == 'krasnaya_polyana_settlement' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_settlement' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'krasnaya_polyana_settlement' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_settlement' && selectedTo == 'g_sochi') ||(selectedTo == 'krasnaya_polyana_settlement' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_settlement' && selectedTo == 'rosa_khutor') ||(selectedTo == 'krasnaya_polyana_settlement' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_settlement' && selectedTo == 'esto_sadok') ||(selectedTo == 'krasnaya_polyana_settlement' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_settlement' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'krasnaya_polyana_settlement' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_settlement' && selectedTo == 'dagomys') ||(selectedTo == 'krasnaya_polyana_settlement' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_settlement' && selectedTo == 'loo') ||(selectedTo == 'krasnaya_polyana_settlement' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_settlement' && selectedTo == 'vardane') ||(selectedTo == 'krasnaya_polyana_settlement' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_settlement' && selectedTo == 'lazarevskoye') ||(selectedTo == 'krasnaya_polyana_settlement' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'krasnaya_polyana_540m' && selectedTo == 'krasnaya_polyana_960m') ||(selectedTo == 'krasnaya_polyana_540m' && selectedFrom == 'krasnaya_polyana_960m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_540m' && selectedTo == 'gazprom_laure') ||(selectedTo == 'krasnaya_polyana_540m' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_540m' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'krasnaya_polyana_540m' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_540m' && selectedTo == 'g_sochi') ||(selectedTo == 'krasnaya_polyana_540m' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_540m' && selectedTo == 'rosa_khutor') ||(selectedTo == 'krasnaya_polyana_540m' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_540m' && selectedTo == 'esto_sadok') ||(selectedTo == 'krasnaya_polyana_540m' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_540m' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'krasnaya_polyana_540m' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_540m' && selectedTo == 'dagomys') ||(selectedTo == 'krasnaya_polyana_540m' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_540m' && selectedTo == 'loo') ||(selectedTo == 'krasnaya_polyana_540m' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_540m' && selectedTo == 'vardane') ||(selectedTo == 'krasnaya_polyana_540m' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_540m' && selectedTo == 'lazarevskoye') ||(selectedTo == 'krasnaya_polyana_540m' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'krasnaya_polyana_960m' && selectedTo == 'gazprom_laure') ||(selectedTo == 'krasnaya_polyana_960m' && selectedFrom == 'gazprom_laure') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_960m' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'krasnaya_polyana_960m' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_960m' && selectedTo == 'g_sochi') ||(selectedTo == 'krasnaya_polyana_960m' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_960m' && selectedTo == 'rosa_khutor') ||(selectedTo == 'krasnaya_polyana_960m' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_960m' && selectedTo == 'esto_sadok') ||(selectedTo == 'krasnaya_polyana_960m' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_960m' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'krasnaya_polyana_960m' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_960m' && selectedTo == 'dagomys') ||(selectedTo == 'krasnaya_polyana_960m' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_960m' && selectedTo == 'loo') ||(selectedTo == 'krasnaya_polyana_960m' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_960m' && selectedTo == 'vardane') ||(selectedTo == 'krasnaya_polyana_960m' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'krasnaya_polyana_960m' && selectedTo == 'lazarevskoye') ||(selectedTo == 'krasnaya_polyana_960m' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'gazprom_laure' && selectedTo == 'gazprom_1389m') ||(selectedTo == 'gazprom_laure' && selectedFrom == 'gazprom_1389m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_laure' && selectedTo == 'g_sochi') ||(selectedTo == 'gazprom_laure' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_laure' && selectedTo == 'rosa_khutor') ||(selectedTo == 'gazprom_laure' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_laure' && selectedTo == 'esto_sadok') ||(selectedTo == 'gazprom_laure' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_laure' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'gazprom_laure' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_laure' && selectedTo == 'dagomys') ||(selectedTo == 'gazprom_laure' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_laure' && selectedTo == 'loo') ||(selectedTo == 'gazprom_laure' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_laure' && selectedTo == 'vardane') ||(selectedTo == 'gazprom_laure' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_laure' && selectedTo == 'lazarevskoye') ||(selectedTo == 'gazprom_laure' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'gazprom_1389m' && selectedTo == 'g_sochi') ||(selectedTo == 'gazprom_1389m' && selectedFrom == 'g_sochi') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_1389m' && selectedTo == 'rosa_khutor') ||(selectedTo == 'gazprom_1389m' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_1389m' && selectedTo == 'esto_sadok') ||(selectedTo == 'gazprom_1389m' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_1389m' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'gazprom_1389m' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_1389m' && selectedTo == 'dagomys') ||(selectedTo == 'gazprom_1389m' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_1389m' && selectedTo == 'loo') ||(selectedTo == 'gazprom_1389m' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_1389m' && selectedTo == 'vardane') ||(selectedTo == 'gazprom_1389m' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'gazprom_1389m' && selectedTo == 'lazarevskoye') ||(selectedTo == 'gazprom_1389m' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'g_sochi' && selectedTo == 'rosa_khutor') ||(selectedTo == 'g_sochi' && selectedFrom == 'rosa_khutor') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'g_sochi' && selectedTo == 'esto_sadok') ||(selectedTo == 'g_sochi' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'g_sochi' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'g_sochi' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'g_sochi' && selectedTo == 'dagomys') ||(selectedTo == 'g_sochi' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'g_sochi' && selectedTo == 'loo') ||(selectedTo == 'g_sochi' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'g_sochi' && selectedTo == 'vardane') ||(selectedTo == 'g_sochi' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'g_sochi' && selectedTo == 'lazarevskoye') ||(selectedTo == 'g_sochi' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'rosa_khutor' && selectedTo == 'esto_sadok') ||(selectedTo == 'rosa_khutor' && selectedFrom == 'esto_sadok') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'rosa_khutor' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'rosa_khutor' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'rosa_khutor' && selectedTo == 'dagomys') ||(selectedTo == 'rosa_khutor' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'rosa_khutor' && selectedTo == 'loo') ||(selectedTo == 'rosa_khutor' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'rosa_khutor' && selectedTo == 'vardane') ||(selectedTo == 'rosa_khutor' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'rosa_khutor' && selectedTo == 'lazarevskoye') ||(selectedTo == 'rosa_khutor' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }


   //--

  else if((selectedFrom == 'esto_sadok' && selectedTo == 'rosa_plato_1170m') ||(selectedTo == 'esto_sadok' && selectedFrom == 'rosa_plato_1170m') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'esto_sadok' && selectedTo == 'dagomys') ||(selectedTo == 'esto_sadok' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'esto_sadok' && selectedTo == 'loo') ||(selectedTo == 'esto_sadok' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'esto_sadok' && selectedTo == 'vardane') ||(selectedTo == 'esto_sadok' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'esto_sadok' && selectedTo == 'lazarevskoye') ||(selectedTo == 'esto_sadok' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

     //--

  else if((selectedFrom == 'rosa_plato_1170m' && selectedTo == 'dagomys') ||(selectedTo == 'rosa_plato_1170m' && selectedFrom == 'dagomys') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'rosa_plato_1170m' && selectedTo == 'loo') ||(selectedTo == 'rosa_plato_1170m' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'rosa_plato_1170m' && selectedTo == 'vardane') ||(selectedTo == 'rosa_plato_1170m' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'rosa_plato_1170m' && selectedTo == 'lazarevskoye') ||(selectedTo == 'rosa_plato_1170m' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'dagomys' && selectedTo == 'loo') ||(selectedTo == 'dagomys' && selectedFrom == 'loo') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'dagomys' && selectedTo == 'vardane') ||(selectedTo == 'dagomys' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'dagomys' && selectedTo == 'lazarevskoye') ||(selectedTo == 'dagomys' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'loo' && selectedTo == 'vardane') ||(selectedTo == 'loo' && selectedFrom == 'vardane') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }
  else if((selectedFrom == 'loo' && selectedTo == 'lazarevskoye') ||(selectedTo == 'loo' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  //--

  else if((selectedFrom == 'vardane' && selectedTo == 'lazarevskoye') ||(selectedTo == 'vardane' && selectedFrom == 'lazarevskoye') ){
    this.economPrice = "Уточнить";
    this.comfortPrice = "Уточнить";
        this.minivanPrice = "Уточнить";
    this.minibusPrice = "Уточнить";
    this.newBusiness_Price = "Уточнить";
    this.busPrice = "Уточнить";
  }

  this.handleCheckIfFieldsEmpty()
  //--
  // switch (selectedFrom) {
  //   case 'airport_sochi':
  //     // Set prices for 'airport_sochi' locations
  //     if (selectedTo === 'Цандрипш') {
  //       this.economPrice = "Уточнить";
  //       this.comfortPrice = "Уточнить";
  //     } else if (selectedTo === 'Гагра') {
  //       // Set prices for 'Гагра'
  //       this.economPrice = "3000";
  //       this.comfortPrice = "3500";
  //     }
  //     else if (selectedTo === 'Пицунда') {
  //       // Set prices for 'Гагра'
  //       this.economPrice = "3500";
  //       this.comfortPrice = "4000";
  //     }
  //     else if (selectedTo === 'п. Лдзаа') {
  //       // Set prices for 'Гагра'
  //       this.economPrice = "4000";
  //       this.comfortPrice = "4700";
  //     }
  //     else if (selectedTo === 'Золотая бухта') {
  //       // Set prices for 'Гагра'
  //       this.economPrice = "4700";
  //       this.comfortPrice = "5500";
  //     }
  //     else if (selectedTo === 'Гудаута') {
  //       // Set prices for 'Гагра'
  //       this.economPrice = "4300";
  //       this.comfortPrice = "5000";
  //     }
  //     else if (selectedTo === 'Новый Афон') {
  //       // Set prices for 'Гагра'
  //       this.economPrice = "4700";
  //       this.comfortPrice = "5500";
  //     }
  //     else if (selectedTo === 'Гуандра,Эшера') {
  //       // Set prices for 'Гагра'
  //       this.economPrice = "5000";
  //       this.comfortPrice = "5800";
  //     }
  //     else if (selectedTo === 'Сухум') {
  //       // Set prices for 'Гагра'
  //       this.economPrice = "5500";
  //       this.comfortPrice = "6100";
  //     }
  //     else if (selectedTo === 'Агудзера,Гулрыпш') {
  //       // Set prices for 'Гагра'
  //       this.economPrice = "6500";
  //       this.comfortPrice = "7000";
  //     }
  //     else if (selectedTo === 'Кындыг') {
  //       // Set prices for 'Гагра'
  //       this.economPrice = "7000";
  //       this.comfortPrice = "7800";
  //     }
  //     else if (selectedTo === 'Очамчира') {
  //       // Set prices for 'Гагра'
  //       this.economPrice = "8000";
  //       this.comfortPrice = "8600";
  //     }
  //     break;

      
  //   case 'adler_to_rf':
  //     if (selectedTo === 'Красная поляна (поселок)') {
  //       this.economPrice = "1600";
  //       this.comfortPrice = "2200";
  //     } else if (selectedTo === 'Красная поляна 540м') {
  //       this.economPrice = "1700";
  //       this.comfortPrice = "2300";
  //     }
  //     else if (selectedTo === 'Красная поляна 960м') {
  //       this.economPrice = "2000";
  //       this.comfortPrice = "Уточнить";
  //     }
  //     else if (selectedTo === 'Газпром-Лаура') {
  //       this.economPrice = "1700";
  //       this.comfortPrice = "3000";
  //     }
  //     else if (selectedTo === 'Газпром 1389м') {
  //       this.economPrice = "2400";
  //       this.comfortPrice = "2300";
  //     }
  //     else if (selectedTo === 'Г.Сочи') {
  //       this.economPrice = "1700";
  //       this.comfortPrice = "2300";
  //     }
  //     else if (selectedTo === 'Роза Хутор') {
  //       this.economPrice = "1700";
  //       this.comfortPrice = "2300";
  //     }
  //     else if (selectedTo === 'Эсто-Садок') {
  //       this.economPrice = "1700";
  //       this.comfortPrice = "2300";
  //     }
  //     else if (selectedTo === 'Роза Плато') {
  //       this.economPrice = "2000";
  //       this.comfortPrice = "Уточнить";
  //     }
  //     else if (selectedTo === 'Дагомыс') {
  //       this.economPrice = "2000р";
  //       this.comfortPrice = "Уточнить";
  //     }
  //     else if (selectedTo === 'Лоо') {
  //       this.economPrice = "2800р";
  //       this.comfortPrice = "3200";
  //     }
  //     else if (selectedTo === 'Вардане') {
  //       this.economPrice = "3000р";
  //       this.comfortPrice = "Уточнить";
  //     }
  //     else if (selectedTo === 'Лазаревское') {
  //       this.economPrice = "4000";
  //       this.comfortPrice = "4600";
  //     }
  //     break;

  //   // Add more cases for other options in 'fromLocations'
  //   // ...

  //   default:
  //     this.economPrice = "500";
  //     this.comfortPrice = "700";
  //     break;
  // }
}

  
  handleCheckIfFieldsEmpty(){
    const selectedFrom = this.orderForm.get('from').value;
    const selectedTo = this.orderForm.get('to').value;
    
    if(selectedFrom != null && selectedTo !=null){
      this.carSelectionDisabled = false;
    }
    console.log(this.carSelectionDisabled, selectedFrom, selectedTo)

  }

  updateToOptions() {
    const selectedFrom = this.orderForm.get('from').value;
    const selectedTo = this.orderForm.get('to').value;
    console.log(selectedFrom, selectedTo)
    // this.toLocations = [];
  
    // switch (selectedFrom) {
    //   case 'airport_sochi':
    //     this.toLocations = [
    //       { label: 'Цандрипш', value: 'Цандрипш', price: 2600 },
    //       { label: 'Гагра', value: 'Гагра', price: 3000 },
    //       { label: 'Пицунда', value: 'Пицунда', price: 3500 },
    //       { label: 'п. Лдзаа', value: 'п. Лдзаа', price: 4000 },
    //       { label: 'Золотая бухта', value: 'Золотая бухта', price: 4700 },
    //       { label: 'Гудаута', value: 'Гудаута', price: 4300 },
    //       { label: 'Новый Афон', value: 'Новый Афон', price: 4700 },
    //       { label: 'Гуандра,Эшера', value: 'Гуандра,Эшера', price: 5000 },
    //       { label: 'Сухум', value: 'Сухум', price: 5500 },
    //       { label: 'Агудзера,Гулрыпш', value: 'Агудзера,Гулрыпш', price: 6500 },
    //       { label: 'Кындыг', value: 'Кындыг', price: 7000 },
    //       { label: 'Очамчира', value: 'Очамчира', price: 8000 },
    //       { label: 'Другой адрес', value: 'custom', price: 0 } // Set a default price for custom address
    //     ];
    //     break;
  
    //   case 'adler_to_rf':
    //     this.toLocations = [
    //       { label: 'Красная поляна (поселок)', value: 'Красная поляна (поселок)', price: 1600 },
    //       { label: 'Красная поляна 540м', value: 'Красная поляна 540м', price: 1700 },
    //       { label: 'Красная поляна 960м', value: 'Красная поляна 960м', price: 2000 },
    //       { label: 'Газпром-Лаура', value: 'Газпром-Лаура', price: 1700 },
    //       { label: 'Газпром 1389м', value: 'Газпром 1389м', price: 2400 },
    //       { label: 'Г.Сочи', value: 'Г.Сочи', price: 1700 },
    //       { label: 'Роза Хутор', value: 'Роза Хутор', price: 1700 },
    //       { label: 'Эсто-Садок', value: 'Эсто-Садок', price: 1700 },
    //       { label: 'Роза Плато', value: 'Роза Плато', price: 2000 },
    //       { label: 'Дагомыс', value: 'Дагомыс', price: 2000 },
    //       { label: 'Лоо', value: 'Лоо', price: 2800 },
    //       { label: 'Вардане', value: 'Вардане', price: 3000 },
    //       { label: 'Лазаревское', value: 'Лазаревское', price: 4000 },
    //       { label: 'Другой адрес', value: 'custom', price: 0 } // Set a default price for custom address
    //     ];
    //     break;
    
    //   default:
    //     break;
    // }

  //   const toValue = this.orderForm.get('to').value;
  //   this.selectedPrice = toValue === 'custom' ? 0 : this.toLocations.find(location => location.value === toValue).price;
  
  //   this.showCustomAddressInput = toValue === 'custom';

    
    
  //   if (this.orderForm.valid) {
  //     console.log('Form is valid.'); 
  //   } else {
  //     console.log('Form is invalid.'); 
  //   }
  //   this.orderForm.get('to').valueChanges.subscribe((toValue) => {
  //     this.selectedPrice = toValue === 'custom' ? 0 : this.toLocations.find(location => location.value === toValue).price;
  
  //     console.log('Selected Price:', this.selectedPrice); 
  //   });
  //   this.handleCheckIfFieldsEmpty()
  // }
  
  // handleCustomAddressChange(customAddress: string) {
  //   console.log('Custom Address:', customAddress);
  }
  

  resetPriceAndCarType() {
    this.selectedPrice = 0;
    this.selectedCarType = null;
    this.orderForm.get('carType').setValue(null);
    this.carSelectionDisabled = true;
  }

  
  createOrderForm() {
    this.orderForm = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      carType: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      customAddressFrom: [''],
      customAddressTo: [''],
      countryCode: ['+7', Validators.required],
      comment: [''],
      adultCount: [0, [Validators.required, Validators.min(0)]],
      childrenCount: [0, [Validators.required, Validators.min(0)]],
      returnTransfer: [false],
      returnTransferDetails: this.formBuilder.group({
        fromReturn: [''],
        toReturn: [''],
        dateReturn: [''],
        timeReturn: [''],
        fullNameReturn: [''],
        phoneNumberReturn: [''],
        customAddressFromReturn: [''],
        customAddressToReturn: [''],
        countryCodeReturn: ['+7'],
        commentReturn: [''],
        adultCountReturn: [0, [Validators.required, Validators.min(0)]],
        childrenCountReturn: [0, [Validators.required, Validators.min(0)]],
      }),
    });

    
  }

  toggleReturnTransfer() {
    const returnTransferControl = this.orderForm.get('returnTransfer');
    const returnTransferDetailsControl = this.orderForm.get('returnTransferDetails');
  
    if (returnTransferControl.value) {
      // If return transfer is checked, enable the details controls
      returnTransferDetailsControl.enable();
    } else {
      // If return transfer is unchecked, reset and disable the details controls
      returnTransferDetailsControl.reset();
      returnTransferDetailsControl.disable();
    }
  }
  

selectCarType(carType: any) {
  this.selectedCarType = carType.name;
  this.orderForm.get('carType').setValue(this.selectedCarType);


  const selectedLocation = this.orderForm.get('to').value;

  // this.selectedPrice = selectedLocation ? this.toLocations.find(location => location.value === selectedLocation).price + this.priceIncreases[carType.name][selectedLocation] : 0;

  // console.log('Selected Car Type:', this.selectedCarType);
  // console.log('Selected Price:', this.selectedPrice);
  // console.log('Selected Car Type:', this.selectedCarType);
  // console.log('Selected Price:', this.selectedPrice);
}


  onSubmitOrder() {
    const formData = this.orderForm.value;
    
    console.log(formData)
    if (this.orderForm.valid) {
      const formData = this.orderForm.value;
      // console.log(1234)
      // console.log(formData)
      this.data.sendTransferMail(formData)
        .subscribe(
          (data) => {
            console.log('API Response:', data);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
        setTimeout(() => {
          this.openThankyouDialog()
          this.resetPriceAndCarType()
          this.resetForm()
     }, 500);
    } else {
      this.showWarning = true;
      console.log('?')
      console.log('Form is invalid. Please fill in all required fields.');
    }

  }

  getTransferPrices(){
    this.data.get_transfer_data()
        .subscribe(
          (data) => {
            console.log('transfer data:', data);
            this.transferPrices = data
            console.log(this.transferPrices, 'transfer prices')
          },
          (error) => {
            console.error('Error:', error);
          }
        );
        
  }

  getValueByTag(tag: string): string | undefined {
    const found = this.transferPrices.find(item => item.tag === tag);
    return found ? found.value : undefined;
  }
  
  resetForm() {
    this.orderForm.reset(); 
    this.selectedCarType = null;
    this.selectedPrice = 0;
    this.carSelectionDisabled = true;

    this.orderForm.get('comment').setValue(''); 
    this.orderForm.get('fullName').setValue(''); 
    this.orderForm.get('phoneNumber').setValue(''); 
    this.orderForm.get('time').setValue(''); 
    this.orderForm.get('date').setValue(null);
  }

  // openThankyouDialog() {

  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = false;

  //   dialogConfig.panelClass = 'city-not-found-dialog';

  //   dialogConfig.data = {
  //   };

  //   const dialogRef = this.dialog.open(DialogThankyouComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe(
  //     data => {
  //       return false;
  //     }
  //   );

  // }

  openThankyouDialog() {
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'thank-you-dialog';
  
    dialogConfig.data = {
      orderDetails: this.orderForm.value, // Pass the order details here
      // Add other data properties as needed
    };
  
    const dialogRef = this.dialog.open(DialogThankyouComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(
      data => {
        return false;
      }
    );
  }

  getTooltipText(carType: any): string {
    return `${carType.description}`;
  }

  getCarType(carType: any): string {
    return `${carType.russianName}`;
  }

  getCarBrands(carType: any): string{
    return `${carType.brands}`;
  }

  showInfoBox(carType: any): void {
    this.selectedCarType = carType.name;
    this.showInfo = true;
    // Center vertically and horizontally for a 400x400 box
    this.infoBoxTop = window.innerHeight / 2 - 250; // Center vertically
    this.infoBoxLeft = window.innerWidth / 2 - 200; // Center horizontally
}

toggleInfoBox(event: Event, carType: any): void {
  event.stopPropagation();
  this.selectedCarType = this.selectedCarType === carType.name ? null : carType.name;
  this.showInfo = !!this.selectedCarType;
  this.showInfoBox(carType);
  if (this.showInfo) {
    // Center vertically and horizontally for a 400x400 box
    this.infoBoxTop = window.innerHeight / 2 - 250; // Center vertically
    this.infoBoxLeft = window.innerWidth / 2 - 200; // Center horizontally
  }
}

closeInfoBox(): void {
  this.selectedCarType = null;
  this.showInfo = false;
}





  hideInfoBox(): void {
      this.showInfo = false;
  }

  increment(controlName: string) {
    const control = this.orderForm.get(controlName);
    if (control.value < 99) {
      control.setValue(control.value + 1);
    }
  }

  decrement(controlName: string) {
    const control = this.orderForm.get(controlName);
    if (control.value > 0) {
      control.setValue(control.value - 1);
    }
  }

  incrementReturn(controlName: string) {
    const control = this.orderForm.get(`returnTransferDetails.${controlName}`);
    if (control.value < 99) {
      control.setValue(control.value + 1);
    }
  }
  
  decrementReturn(controlName: string) {
    const control = this.orderForm.get(`returnTransferDetails.${controlName}`);
    if (control.value > 0) {
      control.setValue(control.value - 1);
    }
  }
  
  onFromInputChange() {
    const fromControl = this.orderForm.get('from');
    if (fromControl) {
      this.filteredFromLocations = this.fromLocations.filter(location =>
        location.label.toLowerCase().includes(fromControl.value.toLowerCase())
      );
    }
  }

  onToInputChange() {
    const toControl = this.orderForm.get('to');
    if (toControl) {
      this.filteredToLocations = this.toLocations.filter(location =>
        location.label.toLowerCase().includes(toControl.value.toLowerCase())
      );
    }
  }


  displayLocationLabel(location: any): string {
    return location ? location.label : '';
  }
  
  getSelectedLocationLabel(): string {
    const selectedLocationValue = this.orderForm.get('from').value;
    const selectedLocation = this.fromLocations.find(location => location.value === selectedLocationValue);
    return selectedLocation ? selectedLocation.label : '';
  }
  getSelectedLocationLabelTo(): string {
    const selectedLocationValue = this.orderForm.get('to').value;
    const selectedLocation = this.fromLocations.find(location => location.value === selectedLocationValue);
    return selectedLocation ? selectedLocation.label : '';
  }

  getSelectedLocationLabelReturn(): string {
    const selectedLocationValue = this.orderForm.get('returnTransferDetails.fromReturn').value;
    const selectedLocation = this.fromLocations.find(location => location.value === selectedLocationValue);
    return selectedLocation ? selectedLocation.label : '';
  }
  getSelectedLocationLabelToReturn(): string {
    const selectedLocationValue = this.orderForm.get('returnTransferDetails.toReturn').value;
    const selectedLocation = this.fromLocations.find(location => location.value === selectedLocationValue);
    return selectedLocation ? selectedLocation.label : '';
  }


  
  
  goBackToIntro() {

    this.router.navigate(['/' + this.website_language])

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  
}
