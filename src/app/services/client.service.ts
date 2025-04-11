import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAllFavorite(clientId: number) {
    return this.http.get<any>(environment.get_all_favorite + clientId);
  }

  deleteFavorite(userId: number, type: number, id: number) {
    return this.http.delete<any>(environment.delete_favorite + userId + '/'  + type + '/' + id);
  }

  editProfileInfo(imageEditObj: any) {
    return this.http.put<any>(environment.edit_client_profile_info, imageEditObj);
  }

  resetPassword(changePassObj: any) {
    return this.http.put<any>(environment.reset_client_password, changePassObj);
  }

  getProfileLogo(userType: number, clientId: number) {
    return this.http.get<any>(environment.get_profile_logo + userType + '/' + clientId);
  }
}

