import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SupplierActionTypes } from '../enums/supplier.enum';
import * as supplierActions from '../actions/suppliers.action'
import { SupplierService } from '../services/supplier.service';
import { SupplierFacade } from '../facade/supplier.facade';

@Injectable()
export class SupplierEffects {

  constructor(
    private actions$: Actions,
    @Inject(SupplierService)
  private supplierService: SupplierService
  ) {}

  fetchSuppliers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupplierActionTypes.FETCH_SUPPLIER),
      mergeMap(() => {
        return this.supplierService.getSuppliers().pipe(
          map(payload => new supplierActions.FetchSuppliersSuccess(payload)),
          catchError(error => of(new supplierActions.FetchSuppliersFailure(error)))
        )
      }
      )
    )
  );
createSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupplierActionTypes.CREATE_SUPPLIER),
      mergeMap((action:any) => {
        return this.supplierService.createSupplier(action.payload).pipe(
          map(payload => new supplierActions.CreateSuppliersSuccess(payload)),
          catchError(error => of(new supplierActions.CreateSuppliersFailure(error)))
        )
      }
      )
    )
  );

updateSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupplierActionTypes.UPDATE_SUPPLIER),
      mergeMap((action:any) => {
        return this.supplierService.updateSupplier(action.id,action.payload).pipe(
          map(updatedSupplier => new supplierActions.UpdateSuppliersSuccess(updatedSupplier)),
          catchError(error => of(new supplierActions.UpdateSuppliersFailure(error)))
        )
      }
      )
    )
  );

deleteSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupplierActionTypes.DELETE_SUPPLIER),
      mergeMap((action:any) => {
        return this.supplierService.deleteSupplier(action.id).pipe(
          map((payload:any) => new supplierActions.DeleteSuppliersSuccess(payload)),
          catchError(error => of(new supplierActions.DeleteSuppliersFailure(error)))
        )
      }
      )
    )
  );
}
