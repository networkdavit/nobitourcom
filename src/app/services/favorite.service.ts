import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient) { }

  getAllFavorite(clientId: number) {
    return this.http.get<any>(environment.get_all_favorite + clientId);
  }

  deleteFavorite(userId: number, type: number, id: number) {
    return this.http.delete<any>(environment.delete_favorite + userId + '/'  + type + '/' + id);
  }
}

