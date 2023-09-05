import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientsModel } from '../models/clients.model';

const BASE_URL = 'http://localhost:3000/v1/api/';

@Injectable({
  providedIn: 'root'
})


export class ClientService {

  constructor(private http: HttpClient) {}

  getClients(): Observable<ClientsModel[]> {
    // change to base url
    return this.http.get<ClientsModel[]>(`${BASE_URL}clients/`);
  }

  createClient(client:ClientsModel): Observable<ClientsModel> {
    // change to base url
    return this.http.post<ClientsModel>(`${BASE_URL}clients`,client);
  }

  updateClient(id:string,client:ClientsModel): Observable<ClientsModel> {
    // change to base url
    return this.http.put<ClientsModel>(`${BASE_URL}clients/${id}`,client);
  }

  deleteClient(id:string){
    // change to base url
    return this.http.delete<ClientsModel>(`${BASE_URL}clients/${id}`);
  }
}
