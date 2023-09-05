import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../state/order.state';

export const selectOrderState = createFeatureSelector<OrderState>('appOrders');

export const selectOrders = createSelector(
  selectOrderState,
  state => state.orders
);
export const selectOrder = createSelector(
  selectOrderState,
  state => state.order
);

export const selectLoading = createSelector(
  selectOrderState,
  state => state.loading
);

export const selectError = createSelector(
  selectOrderState,
  state => state.error
);
