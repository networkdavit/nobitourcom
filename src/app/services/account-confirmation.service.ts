import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class AccountConfirmationService {

  constructor(private http: HttpClient) { }

  confirmRegistration(user: string, token:string) {
    const data = null;

    return this.http.put<any>(environment.base_url + user + '/account/confirmation/' + token, data);
  }
}
