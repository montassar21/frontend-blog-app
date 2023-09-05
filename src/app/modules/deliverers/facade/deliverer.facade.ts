import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateDeliverer, DeleteDeliverer, FetchDeliverers, UpdateDeliverer } from '../actions/deliverer.action';
import * as DelivererSelectors from '../selectors/deliverers.selectors';
import { DeliverersModel } from '../models/deliverers.model';

@Injectable({
  providedIn: 'root'
})
export class DelivererFacade {
  deliverers$: Observable<DeliverersModel[]>;
  deliverer$: Observable<DeliverersModel>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.deliverers$ = this.store.select(DelivererSelectors.selectDeliverers);
    this.deliverer$ = this.store.select(DelivererSelectors.selectDeliverer);
    this.loading$ = this.store.select(DelivererSelectors.selectLoading);
    this.error$ = this.store.select(DelivererSelectors.selectError);
  }

  fetchDeliverers() {
    this.store.dispatch(new FetchDeliverers());
  }
  createDeliverer(deliverer:DeliverersModel) {
    this.store.dispatch(new CreateDeliverer(deliverer));
  }
  updateDeliverer(id:string,deliverer:Partial<DeliverersModel>) {
    this.store.dispatch(new UpdateDeliverer(id,deliverer));
  }

  deleteDeliverer(id:string) {
    this.store.dispatch(new DeleteDeliverer(id));
  }
}
