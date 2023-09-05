import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../state/product.state';

export const selectProductState = createFeatureSelector<ProductState>('appProducts');

export const selectProducts = createSelector(
  selectProductState,
  state => state.products
);
export const selectProduct = createSelector(
  selectProductState,
  state => state.product
);

export const selectLoading = createSelector(
  selectProductState,
  state => state.loading
);

export const selectError = createSelector(
  selectProductState,
  state => state.error
);
