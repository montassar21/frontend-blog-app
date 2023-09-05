import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuppliersModel } from '../models/suppliers.model';

const BASE_URL = 'http://localhost:3000/v1/api/';

@Injectable({
  providedIn: 'root'
})


export class SupplierService {

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<SuppliersModel[]> {
    return this.http.get<SuppliersModel[]>(`${BASE_URL}suppliers`);
  }

  createSupplier(supplier:SuppliersModel): Observable<SuppliersModel> {
    return this.http.post<SuppliersModel>(`${BASE_URL}suppliers`,supplier);
  }

  updateSupplier(id:string,supplier:SuppliersModel): Observable<SuppliersModel> {
    return this.http.put<SuppliersModel>(`${BASE_URL}suppliers/${id}`,supplier);
  }

  deleteSupplier(id:string){
    return this.http.delete<SuppliersModel>(`${BASE_URL}suppliers/${id}`);
  }
}
