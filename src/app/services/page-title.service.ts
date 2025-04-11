import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  constructor() {}
  changeTitleName(titleName, pageTitle){
    titleName.setTitle("Nobi Tour - " + pageTitle)
  }
}
