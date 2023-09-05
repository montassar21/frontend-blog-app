import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateOrder, DeleteOrder, FetchOrders, UpdateOrder } from '../actions/order.action';
import * as OrderSelectors from '../selectors/orders.selectors';
import { OrdersModel } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrderFacade {
  orders$: Observable<OrdersModel[]>;
  order$: Observable<OrdersModel>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.orders$ = this.store.select(OrderSelectors.selectOrders);
    this.order$ = this.store.select(OrderSelectors.selectOrder);
    this.loading$ = this.store.select(OrderSelectors.selectLoading);
    this.error$ = this.store.select(OrderSelectors.selectError);
  }

  fetchOrders() {
    this.store.dispatch(new FetchOrders());
  }
  createOrder(order:OrdersModel) {
    this.store.dispatch(new CreateOrder(order));
  }
  updateOrder(id:string,order:Partial<OrdersModel>) {
    this.store.dispatch(new UpdateOrder(id,order));
  }

  deleteOrder(id:string) {
    this.store.dispatch(new DeleteOrder(id));
  }
}
