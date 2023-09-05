import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateInvoice, DeleteInvoice, FetchInvoices, UpdateInvoice } from '../actions/invoice.action';
import * as InvoiceSelectors from '../selectors/invoices.selectors';
import { InvoicesModel } from '../models/invoices.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceFacade {
  invoices$: Observable<InvoicesModel[]>;
  invoice$: Observable<InvoicesModel>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.invoices$ = this.store.select(InvoiceSelectors.selectInvoices);
    this.invoice$ = this.store.select(InvoiceSelectors.selectInvoice);
    this.loading$ = this.store.select(InvoiceSelectors.selectLoading);
    this.error$ = this.store.select(InvoiceSelectors.selectError);
  }

  fetchInvoices() {
    this.store.dispatch(new FetchInvoices());
  }
  createInvoice(invoice:InvoicesModel) {
    this.store.dispatch(new CreateInvoice(invoice));
  }
  updateInvoice(id:string,invoice:Partial<InvoicesModel>) {
    this.store.dispatch(new UpdateInvoice(id,invoice));
  }

  deleteInvoice(id:string) {
    this.store.dispatch(new DeleteInvoice(id));
  }
}
