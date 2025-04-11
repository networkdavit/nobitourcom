import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../services/constants.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  // url: string = 'https://dev.nobitour.com/api/public/feedback';
  // data = {name: "", email: "", phone: "", subject: ""}
  constructor(private http: HttpClient) { }

  get_transfer_data(){
    return this.http.get<any>("https://nobitransfer-data.onrender.com/data");
  }

  sendMessage(fullMessage:any){
    return this.http.post<any>(environment.sendContactEmail, fullMessage)
  }

  sendTransferMail(fullMessage:any){
    return this.http.post<any>(environment.sendTransferContactMail, fullMessage)
  }

  getToken(){
    return this.http.get(environment.token);
  }

  getIP(){
    return this.http.get<any>('https://nobitour.onrender.com/ip');
  }

  isIpRussia(ip: any){
    return this.http.get("https://www.travelpayouts.com/whereami?locale=en&ip=" + ip)
  }

  updateAnalyticsCounter(productType){
    return this.http.post(environment.updateAnalyticsCounter + productType, null)
  }

  getIPv4Address() {
    return this.http.get<any>('https://ipapi.co/json/')
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        tap(response => {
          // console.log(response.IPv4);
        })
      );
  }

}

