import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SupplierState } from '../state/supplier.state';

export const selectSupplierState = createFeatureSelector<SupplierState>('appSuppliers');

export const selectSuppliers = createSelector(
  selectSupplierState,
  state => state.suppliers
);
export const selectSupplier = createSelector(
  selectSupplierState,
  state => state.supplier
);

export const selectLoading = createSelector(
  selectSupplierState,
  state => state.loading
);

export const selectError = createSelector(
  selectSupplierState,
  state => state.error
);
