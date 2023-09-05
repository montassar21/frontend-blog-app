import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsModel } from '../models/products.model';

const BASE_URL = 'http://localhost:3000/v1/api/';

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductsModel[]> {
    return this.http.get<ProductsModel[]>(`${BASE_URL}products`);
  }

  createProduct(product:ProductsModel): Observable<ProductsModel> {
    return this.http.post<ProductsModel>(`${BASE_URL}products`,product);
  }

  updateProduct(id:string,product:ProductsModel): Observable<ProductsModel> {
    return this.http.put<ProductsModel>(`${BASE_URL}products/${id}`,product);
  }

  deleteProduct(id:string){
    return this.http.delete<ProductsModel>(`${BASE_URL}products/${id}`);
  }
}
