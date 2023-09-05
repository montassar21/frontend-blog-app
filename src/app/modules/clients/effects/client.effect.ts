import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ClientActionTypes } from '../enums/client.enum';
import * as clientActions from '../actions/client.action'
import { ClientService } from '../../clients/services/client.service';
import { ClientFacade } from '../facade/client.facade';

@Injectable()
export class ClientEffects {
  constructor(
    private actions$: Actions,
    private clientService: ClientService
   ) {}
  fetchClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActionTypes.FETCH_CLIENT),
      mergeMap(() => {
        return this.clientService.getClients().pipe(
          map((payload:any) => new clientActions.FetchClientsSuccess(payload)),
          catchError(error => of(new clientActions.FetchClientsFailure(error)))
        )
      }
      )
    )
  );
createClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActionTypes.CREATE_CLIENT),
      mergeMap((action:any) => {
        return this.clientService.createClient(action.payload).pipe(
          map(payload => new clientActions.CreateClientsSuccess(payload)),
          catchError(error => of(new clientActions.CreateClientsFailure(error)))
        )
      }
      )
    )
  );

updateClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActionTypes.UPDATE_CLIENT),
      mergeMap((action:any) => {
        return this.clientService.updateClient(action.id,action.payload).pipe(
          map(updatedClient => new clientActions.UpdateClientsSuccess(updatedClient)),
          catchError(error => of(new clientActions.UpdateClientsFailure(error)))
        )
      }
      )
    )
  );

deleteClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActionTypes.DELETE_CLIENT),
      mergeMap((action:any) => {
        return this.clientService.deleteClient(action.id).pipe(
          map((payload:any) => new clientActions.DeleteClientsSuccess(payload)),
          catchError(error => of(new clientActions.DeleteClientsFailure(error)))
        )
      }
      )
    )
  );
}
