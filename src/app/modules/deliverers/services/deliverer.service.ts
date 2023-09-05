import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeliverersModel } from '../models/deliverers.model';

const BASE_URL = 'http://localhost:3000/v1/api/';

@Injectable({
  providedIn: 'root'
})


export class DelivererService {

  constructor(private http: HttpClient) {}

  getDeliverers(): Observable<DeliverersModel[]> {
    // change to base url
    return this.http.get<DeliverersModel[]>(`${BASE_URL}deliverers/`);
  }

  createDeliverer(deliverer:DeliverersModel): Observable<DeliverersModel> {
    // change to base url
    return this.http.post<DeliverersModel>(`${BASE_URL}deliverers`,deliverer);
  }

  updateDeliverer(id:string,deliverer:DeliverersModel): Observable<DeliverersModel> {
    // change to base url
    return this.http.put<DeliverersModel>(`${BASE_URL}deliverers/${id}`,deliverer);
  }

  deleteDeliverer(id:string){
    // change to base url
    return this.http.delete<DeliverersModel>(`${BASE_URL}deliverers/${id}`);
  }
}
