import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoicesModel } from '../models/invoices.model';

const BASE_URL = 'http://localhost:3000/v1/api/';

@Injectable({
  providedIn: 'root'
})


export class InvoiceService {

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<InvoicesModel[]> {
    // change to base url
    return this.http.get<InvoicesModel[]>(`${BASE_URL}invoices/`);
  }

  createInvoice(invoice:InvoicesModel): Observable<InvoicesModel> {
    // change to base url
    return this.http.post<InvoicesModel>(`${BASE_URL}invoices`,invoice);
  }

  updateInvoice(id:string,invoice:InvoicesModel): Observable<InvoicesModel> {
    // change to base url
    return this.http.put<InvoicesModel>(`${BASE_URL}invoices/${id}`,invoice);
  }

  deleteInvoice(id:string){
    // change to base url
    return this.http.delete<InvoicesModel>(`${BASE_URL}invoices/${id}`);
  }
}
