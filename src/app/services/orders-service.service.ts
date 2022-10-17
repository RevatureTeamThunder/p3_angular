import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {

  constructor(private http: HttpClient) { }

  private ordersUrl: string = `${environment.baseUrl}/api/order/`;
  

  getAllOrders(customerId: number) {
    return this.http.get<any>(this.ordersUrl + "?customer_id=" + customerId, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

}
