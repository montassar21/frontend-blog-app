import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateClient, DeleteClient, FetchClients, UpdateClient } from '../actions/client.action';
import * as ClientSelectors from '../selectors/clients.selectors';
import { ClientsModel } from '../models/clients.model';

@Injectable({
  providedIn: 'root'
})
export class ClientFacade {
  clients$: Observable<ClientsModel[]>;
  client$: Observable<ClientsModel>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.clients$ = this.store.select(ClientSelectors.selectClients);
    this.client$ = this.store.select(ClientSelectors.selectClient);
    this.loading$ = this.store.select(ClientSelectors.selectLoading);
    this.error$ = this.store.select(ClientSelectors.selectError);
  }

  fetchClients() {
    this.store.dispatch(new FetchClients());
  }
  createClient(client:ClientsModel) {
    this.store.dispatch(new CreateClient(client));
  }
  updateClient(id:string,client:Partial<ClientsModel>) {
    this.store.dispatch(new UpdateClient(id,client));
  }

  deleteClient(id:string) {
    this.store.dispatch(new DeleteClient(id));
  }
}
