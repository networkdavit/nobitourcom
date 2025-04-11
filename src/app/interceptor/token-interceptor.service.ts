// import { Injectable, Injector } from '@angular/core';
// import { HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// import { LoginService } from '../services/login.service';
// import { HeaderComponent } from '../header/header.component';
// import { CookieService } from 'ngx-cookie-service';
// import { Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })

// export class TokenInterceptorService implements HttpInterceptor {

//   constructor(private injector: Injector, private header: HeaderComponent, private cookieService: CookieService) { }

//   intercept(req, next) {

//     if (!req.url.includes('login')) {

//       if (this.cookieService.get('clientEmail')) {

//         if (!this.cookieService.get('clientEmail') || !this.cookieService.get('token')) {
//           this.header.logout();
//         }

//       } else if (this.cookieService.get('partnerEmail')) {

//         if (!this.cookieService.get('partnerEmail') || !this.cookieService.get('token')) {
//           this.header.logout();
//         }

//       }

//     }

//     let headers = {};
//     let nonce = Buffer.from(this.randomString()).toString('base64')
//     // let nonce = btoa(this.randomString());
//     let date = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
//     let token = this.cookieService.get('token');
//     let passwordDigest = this.b64_sha1(nonce + date + token) + '=';

//     if (req.url.includes('login')) {

//       let tokenizedReq = req.clone({
//         setHeaders: {
//           'Content-Type': 'application/json',
//           'X-WSSE': '',
//         }
//       });

//       return next.handle(tokenizedReq);

//     } else {

//       let userService = this.injector.get(LoginService);

//       let date = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

//       headers = {
//         // 'Cache-Control': 'no-cache',
//         // 'Pragma': 'no-cache',
//         // 'Expires': new Date(),
//         'X-WSSE': 'UsernameToken Username="' + this.cookieService.get('clientEmail') + this.cookieService.get('partnerEmail') + '", PasswordDigest="' + passwordDigest + '", Nonce="' + nonce + '", Created="' + date + '"'
//       };

//       let tokenizedReq = req.clone({
//         setHeaders: headers
//       });

//       return next.handle(tokenizedReq).pipe(
//         catchError(
//           err =>
//             new Observable<HttpEvent<any>>(observer => {
//               if (err instanceof HttpErrorResponse) {

//                 const errResp = <HttpErrorResponse>err;
//                 if (errResp.status === 401) {
//                   this.header.logout();
//                 }
//               }
//               observer.error(err);
//               observer.complete();
//             })
//         )
//       )
//     }
//   }

//   randomString() {
//     var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
//     var string_length = 20;
//     var randomstring = '';
//     for (var i = 0; i < string_length; i++) {
//       var rnum = Math.floor(Math.random() * chars.length);
//       randomstring += chars.substring(rnum, rnum + 1);
//     }
//     return randomstring;
//   }

//   b64_sha1(s) {
//     return this.binb2b64(this.core_sha1(this.str2binb(s), s.length * 8));
//   }

//   binb2b64(binarray) {
//     var b64pad = "";
//     var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
//     var str = "";
//     for (var i = 0; i < binarray.length * 4; i += 3) {
//       var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16)
//         | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8)
//         | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
//       for (var j = 0; j < 4; j++) {
//         if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
//         else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
//       }
//     }
//     return str;
//   }

//   core_sha1(x, len) {
//     /* append padding */
//     x[len >> 5] |= 0x80 << (24 - len % 32);
//     x[((len + 64 >> 9) << 4) + 15] = len;

//     var w = Array(80);
//     var a = 1732584193;
//     var b = -271733879;
//     var c = -1732584194;
//     var d = 271733878;
//     var e = -1009589776;

//     for (var i = 0; i < x.length; i += 16) {
//       var olda = a;
//       var oldb = b;
//       var oldc = c;
//       var oldd = d;
//       var olde = e;

//       for (var j = 0; j < 80; j++) {
//         if (j < 16) w[j] = x[i + j];
//         else w[j] = this.rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
//         var t = this.safe_add(this.safe_add(this.rol(a, 5), this.sha1_ft(j, b, c, d)),
//           this.safe_add(this.safe_add(e, w[j]), this.sha1_kt(j)));
//         e = d;
//         d = c;
//         c = this.rol(b, 30);
//         b = a;
//         a = t;
//       }

//       a = this.safe_add(a, olda);
//       b = this.safe_add(b, oldb);
//       c = this.safe_add(c, oldc);
//       d = this.safe_add(d, oldd);
//       e = this.safe_add(e, olde);
//     }
//     return Array(a, b, c, d, e);

//   }

//   rol(num, cnt) {
//     return (num << cnt) | (num >>> (32 - cnt));
//   }

//   safe_add(x, y) {
//     var lsw = (x & 0xFFFF) + (y & 0xFFFF);
//     var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
//     return (msw << 16) | (lsw & 0xFFFF);
//   }

//   sha1_ft(t, b, c, d) {
//     if (t < 20) return (b & c) | ((~b) & d);
//     if (t < 40) return b ^ c ^ d;
//     if (t < 60) return (b & c) | (b & d) | (c & d);
//     return b ^ c ^ d;
//   }

//   sha1_kt(t) {
//     return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
//       (t < 60) ? -1894007588 : -899497514;
//   }

//   str2binb(str) {
//     var bin = Array();
//     var mask = (1 << 8) - 1;
//     for (var i = 0; i < str.length * 8; i += 8)
//       bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (32 - 8 - i % 32);
//     return bin;
//   }
// }