import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrderActionTypes } from '../enums/order.enum';
import * as orderActions from '../actions/order.action'
import { OrderService } from '../../orders/services/order.service';
import { OrderFacade } from '../facade/order.facade';

@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private orderService: OrderService
   ) {}
  fetchOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActionTypes.FETCH_ORDER),
      mergeMap(() => {
        return this.orderService.getOrders().pipe(
          map((payload:any) => new orderActions.FetchOrdersSuccess(payload)),
          catchError(error => of(new orderActions.FetchOrdersFailure(error)))
        )
      }
      )
    )
  );
createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActionTypes.CREATE_ORDER),
      mergeMap((action:any) => {
        return this.orderService.createOrder(action.payload).pipe(
          map(payload => new orderActions.CreateOrdersSuccess(payload)),
          catchError(error => of(new orderActions.CreateOrdersFailure(error)))
        )
      }
      )
    )
  );

updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActionTypes.UPDATE_ORDER),
      mergeMap((action:any) => {
        return this.orderService.updateOrder(action.id,action.payload).pipe(
          map(updatedOrder => new orderActions.UpdateOrdersSuccess(updatedOrder)),
          catchError(error => of(new orderActions.UpdateOrdersFailure(error)))
        )
      }
      )
    )
  );

deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActionTypes.DELETE_ORDER),
      mergeMap((action:any) => {
        return this.orderService.deleteOrder(action.id).pipe(
          map((payload:any) => new orderActions.DeleteOrdersSuccess(payload)),
          catchError(error => of(new orderActions.DeleteOrdersFailure(error)))
        )
      }
      )
    )
  );
}
