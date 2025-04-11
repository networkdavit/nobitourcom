import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  passwords: any;

  constructor(private http: HttpClient) { }

  // Client

  loginClient(client: any) {
    const data = client;

    return this.http.post<any>(environment.login, data);
  }

  registerClient(client: any) {
    const data = client;

    return this.http.post<any>(environment.registration, data);
  }

  // Partner

  loginPartner(partner: any){
    const data = partner;

    return this.http.post<any>(environment.login_partner, data);
  }

  registerPartner(partner: any){
    const data = partner;
 
    return this.http.post<any>(environment.registration_partner, data);
  }

  passwordClient(email: string) {

    return this.http.get<any>(environment.forgotten_client_password + email);
  }

  passwordPartner(email: string) {

    return this.http.get<any>(environment.forgotten_partner_password + email);
  }

}
