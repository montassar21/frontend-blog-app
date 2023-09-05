import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DelivererActionTypes } from '../enums/deliverer.enum';
import * as delivererActions from '../actions/deliverer.action'
import { DelivererService } from '../../deliverers/services/deliverer.service';
import { DelivererFacade } from '../facade/deliverer.facade';

@Injectable()
export class DelivererEffects {
  constructor(
    private actions$: Actions,
    private delivererService: DelivererService
   ) {}
  fetchDeliverers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DelivererActionTypes.FETCH_DELIVERER),
      mergeMap(() => {
        return this.delivererService.getDeliverers().pipe(
          map((payload:any) => new delivererActions.FetchDeliverersSuccess(payload)),
          catchError(error => of(new delivererActions.FetchDeliverersFailure(error)))
        )
      }
      )
    )
  );
createDeliverer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DelivererActionTypes.CREATE_DELIVERER),
      mergeMap((action:any) => {
        return this.delivererService.createDeliverer(action.payload).pipe(
          map(payload => new delivererActions.CreateDeliverersSuccess(payload)),
          catchError(error => of(new delivererActions.CreateDeliverersFailure(error)))
        )
      }
      )
    )
  );

updateDeliverer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DelivererActionTypes.UPDATE_DELIVERER),
      mergeMap((action:any) => {
        return this.delivererService.updateDeliverer(action.id,action.payload).pipe(
          map(updatedDeliverer => new delivererActions.UpdateDeliverersSuccess(updatedDeliverer)),
          catchError(error => of(new delivererActions.UpdateDeliverersFailure(error)))
        )
      }
      )
    )
  );

deleteDeliverer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DelivererActionTypes.DELETE_DELIVERER),
      mergeMap((action:any) => {
        return this.delivererService.deleteDeliverer(action.id).pipe(
          map((payload:any) => new delivererActions.DeleteDeliverersSuccess(payload)),
          catchError(error => of(new delivererActions.DeleteDeliverersFailure(error)))
        )
      }
      )
    )
  );
}
