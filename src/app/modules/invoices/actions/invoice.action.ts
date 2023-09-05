import { InvoiceActionTypes } from "../enums/invoice.enum";
import { Action, ActionCreator } from '@ngrx/store'
import { InvoicesModel } from "../models/invoices.model";


export class FetchInvoices implements Action {
  readonly type = InvoiceActionTypes.FETCH_INVOICE;
  constructor(public payload?: any) {}
}

export class FetchInvoicesSuccess implements Action {
  readonly type = InvoiceActionTypes.FETCH_INVOICE_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchInvoicesFailure implements Action {
  readonly type = InvoiceActionTypes.FETCH_INVOICE_FAILURE;
  constructor(public error: any) {}
}

export class CreateInvoice implements Action {
  readonly type = InvoiceActionTypes.CREATE_INVOICE;
  constructor(public payload?: any) {}
}

export class CreateInvoicesSuccess implements Action {
  readonly type = InvoiceActionTypes.CREATE_INVOICE_SUCCESS;
  constructor(public payload: InvoicesModel) {}
}

export class CreateInvoicesFailure implements Action {
  readonly type = InvoiceActionTypes.CREATE_INVOICE_FAILURE;
  constructor(public error: any) {}
}

export class UpdateInvoice implements Action {
  readonly type = InvoiceActionTypes.UPDATE_INVOICE;
  constructor(public id:string,public payload?: any) {}
}

export class UpdateInvoicesSuccess implements Action {
  readonly type = InvoiceActionTypes.UPDATE_INVOICE_SUCCESS;
  constructor(public payload: InvoicesModel) {}
}

export class UpdateInvoicesFailure implements Action {
  readonly type = InvoiceActionTypes.UPDATE_INVOICE_FAILURE;
  constructor(public error: any) {}
}

export class DeleteInvoice implements Action {
  readonly type = InvoiceActionTypes.DELETE_INVOICE;
  constructor(public id:string) {}
}

export class DeleteInvoicesSuccess implements Action {
  readonly type = InvoiceActionTypes.DELETE_INVOICE_SUCCESS;
  constructor(public payload: InvoicesModel) {}
}

export class DeleteInvoicesFailure implements Action {
  readonly type = InvoiceActionTypes.DELETE_INVOICE_FAILURE;
  constructor(public error: any) {}
}

export type InvoiceTypes = FetchInvoices | FetchInvoicesSuccess | FetchInvoicesFailure |
  CreateInvoice | CreateInvoicesSuccess | CreateInvoicesFailure |
  UpdateInvoice | UpdateInvoicesSuccess | UpdateInvoicesFailure |
  DeleteInvoice | DeleteInvoicesSuccess | DeleteInvoicesFailure
