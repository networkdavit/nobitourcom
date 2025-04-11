import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class AccountForgottenPasswordService {

  constructor(private http: HttpClient) { }

  confirmResetPassword(user: string, token:string) {
    const data = null;

    return this.http.put<any>(environment.base_url + user + '/password/reset/' + token, data);
  }
}
