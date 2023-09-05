import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InvoiceActionTypes } from '../enums/invoice.enum';
import * as invoiceActions from '../actions/invoice.action'
import { InvoiceService } from '../../invoices/services/invoice.service';
import { InvoiceFacade } from '../facade/invoice.facade';

@Injectable()
export class InvoiceEffects {
  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService
   ) {}
  fetchInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActionTypes.FETCH_INVOICE),
      mergeMap(() => {
        return this.invoiceService.getInvoices().pipe(
          map((payload:any) => new invoiceActions.FetchInvoicesSuccess(payload)),
          catchError(error => of(new invoiceActions.FetchInvoicesFailure(error)))
        )
      }
      )
    )
  );
createInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActionTypes.CREATE_INVOICE),
      mergeMap((action:any) => {
        return this.invoiceService.createInvoice(action.payload).pipe(
          map(payload => new invoiceActions.CreateInvoicesSuccess(payload)),
          catchError(error => of(new invoiceActions.CreateInvoicesFailure(error)))
        )
      }
      )
    )
  );

updateInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActionTypes.UPDATE_INVOICE),
      mergeMap((action:any) => {
        return this.invoiceService.updateInvoice(action.id,action.payload).pipe(
          map(updatedInvoice => new invoiceActions.UpdateInvoicesSuccess(updatedInvoice)),
          catchError(error => of(new invoiceActions.UpdateInvoicesFailure(error)))
        )
      }
      )
    )
  );

deleteInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActionTypes.DELETE_INVOICE),
      mergeMap((action:any) => {
        return this.invoiceService.deleteInvoice(action.id).pipe(
          map((payload:any) => new invoiceActions.DeleteInvoicesSuccess(payload)),
          catchError(error => of(new invoiceActions.DeleteInvoicesFailure(error)))
        )
      }
      )
    )
  );
}
