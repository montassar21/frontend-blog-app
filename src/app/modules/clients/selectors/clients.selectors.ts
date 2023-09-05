import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientState } from '../state/client.state';

export const selectClientState = createFeatureSelector<ClientState>('appClients');

export const selectClients = createSelector(
  selectClientState,
  state => state.clients
);
export const selectClient = createSelector(
  selectClientState,
  state => state.client
);

export const selectLoading = createSelector(
  selectClientState,
  state => state.loading
);

export const selectError = createSelector(
  selectClientState,
  state => state.error
);
