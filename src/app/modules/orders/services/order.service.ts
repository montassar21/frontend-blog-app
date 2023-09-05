import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdersModel } from '../models/orders.model';

const BASE_URL = 'http://localhost:3000/v1/api/';

@Injectable({
  providedIn: 'root'
})


export class OrderService {

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrdersModel[]> {
    // change to base url
    return this.http.get<OrdersModel[]>(`${BASE_URL}orders/`);
  }

  createOrder(order:OrdersModel): Observable<OrdersModel> {
    // change to base url
    return this.http.post<OrdersModel>(`${BASE_URL}orders`,order);
  }

  updateOrder(id:string,order:OrdersModel): Observable<OrdersModel> {
    // change to base url
    return this.http.put<OrdersModel>(`${BASE_URL}orders/${id}`,order);
  }

  deleteOrder(id:string){
    // change to base url
    return this.http.delete<OrdersModel>(`${BASE_URL}orders/${id}`);
  }
}
