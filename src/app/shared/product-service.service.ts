import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  baseUrl: string ="http://localhost:3000/v1/api/";


  constructor(private httpClient: HttpClient,private route:Router,
 ) { }

  public getProductCost(id: any) {
    return this.httpClient.get<any>(`${this.baseUrl}products/${id}`,id);
  }
}
