import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DelivererState } from '../state/deliverer.state';

export const selectDelivererState = createFeatureSelector<DelivererState>('appDeliverers');

export const selectDeliverers = createSelector(
  selectDelivererState,
  state => state.deliverers
);
export const selectDeliverer = createSelector(
  selectDelivererState,
  state => state.deliverer
);

export const selectLoading = createSelector(
  selectDelivererState,
  state => state.loading
);

export const selectError = createSelector(
  selectDelivererState,
  state => state.error
);
