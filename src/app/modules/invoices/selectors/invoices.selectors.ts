import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from '../state/invoice.state';

export const selectInvoiceState = createFeatureSelector<InvoiceState>('appInvoices');

export const selectInvoices = createSelector(
  selectInvoiceState,
  state => state.invoices
);
export const selectInvoice = createSelector(
  selectInvoiceState,
  state => state.invoice
);

export const selectLoading = createSelector(
  selectInvoiceState,
  state => state.loading
);

export const selectError = createSelector(
  selectInvoiceState,
  state => state.error
);
