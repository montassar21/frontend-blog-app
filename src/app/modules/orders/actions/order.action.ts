import { OrderActionTypes } from "../enums/order.enum";
import { Action } from '@ngrx/store'
import { OrdersModel } from "../models/orders.model";


export class FetchOrders implements Action {
  readonly type = OrderActionTypes.FETCH_ORDER;
  constructor(public payload?: any) {}
}

export class FetchOrdersSuccess implements Action {
  readonly type = OrderActionTypes.FETCH_ORDER_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchOrdersFailure implements Action {
  readonly type = OrderActionTypes.FETCH_ORDER_FAILURE;
  constructor(public error: any) {}
}

export class CreateOrder implements Action {
  readonly type = OrderActionTypes.CREATE_ORDER;
  constructor(public payload?: any) {}
}

export class CreateOrdersSuccess implements Action {
  readonly type = OrderActionTypes.CREATE_ORDER_SUCCESS;
  constructor(public payload: OrdersModel) {}
}

export class CreateOrdersFailure implements Action {
  readonly type = OrderActionTypes.CREATE_ORDER_FAILURE;
  constructor(public error: any) {}
}

export class UpdateOrder implements Action {
  readonly type = OrderActionTypes.UPDATE_ORDER;
  constructor(public id:string,public payload?: any) {}
}

export class UpdateOrdersSuccess implements Action {
  readonly type = OrderActionTypes.UPDATE_ORDER_SUCCESS;
  constructor(public payload: OrdersModel) {}
}

export class UpdateOrdersFailure implements Action {
  readonly type = OrderActionTypes.UPDATE_ORDER_FAILURE;
  constructor(public error: any) {}
}

export class DeleteOrder implements Action {
  readonly type = OrderActionTypes.DELETE_ORDER;
  constructor(public id:string) {}
}

export class DeleteOrdersSuccess implements Action {
  readonly type = OrderActionTypes.DELETE_ORDER_SUCCESS;
  constructor(public payload: OrdersModel) {}
}

export class DeleteOrdersFailure implements Action {
  readonly type = OrderActionTypes.DELETE_ORDER_FAILURE;
  constructor(public error: any) {}
}

export type OrderTypes = FetchOrders | FetchOrdersSuccess | FetchOrdersFailure |
  CreateOrder | CreateOrdersSuccess | CreateOrdersFailure |
  UpdateOrder | UpdateOrdersSuccess | UpdateOrdersFailure |
  DeleteOrder | DeleteOrdersSuccess | DeleteOrdersFailure
