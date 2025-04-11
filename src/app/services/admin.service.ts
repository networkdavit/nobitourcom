import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  loginAdmin(admin: any) {
    const data = admin;

    return this.http.post<any>(environment.login_admin, data);
  }

  getAdminInformation(adminId: any) {
    return this.http.get<any>(environment.get_admin_info + adminId);
  }

  getEstatePaginatedProducts(offset: number, limit: number) {
    return this.http.get<any>(environment.get_estate_products + '?offset=' + offset + '&limit=' + limit);
  }

  getRestaurantPaginatedProducts(offset: number, limit: number) {
    return this.http.get<any>(environment.get_restaurant_products + '?offset=' + offset + '&limit=' + limit);
  }

  getAdventurePaginatedProducts(offset: number, limit: number) {
    return this.http.get<any>(environment.get_adventure_products + '?offset=' + offset + '&limit=' + limit);
  }

  getPartnersPaginated(offset: number, limit: number) {
    return this.http.get<any>(environment.get_partners + '?offset=' + offset + '&limit=' + limit);
  }

  getClientsPaginated(offset: number, limit: number) {
    return this.http.get<any>(environment.get_clients + '?offset=' + offset + '&limit=' + limit);
  }

  approveRejectProduct(approveObj: any) {
    const data = approveObj;

    return this.http.put<any>(environment.approve_reject_products, data);
  }

  approveRejectPartner(rowId: any, status: number) {
    const data = null;

    return this.http.put<any>(environment.approve_reject_partner + rowId + '/' + status, data);
  }

  deleteProduct(productType: string, productId: number) {
    return this.http.delete<any>(environment.delete_estate_products + productType + '/' + productId);
  }

  deletePartner(rowId: any) {
    return this.http.delete<any>(environment.delete_estate_partner + rowId);
  }

  getNotifications() {
    return this.http.get<any>(environment.get_notifications);
  }

  approveRejectUser(user: any) {
    const data = user;

    return this.http.put<any>(environment.approve_reject_user, data);
  }

  deleteUser(rowId: any) {
    return this.http.delete<any>(environment.delete_admin_user + rowId);
  }

  whatIsNew() {
    return this.http.get<any>(environment.new_products);
  }

}
