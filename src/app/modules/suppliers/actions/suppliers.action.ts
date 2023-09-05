import { SupplierActionTypes } from "../enums/supplier.enum";
import { Action } from '@ngrx/store'
import { SuppliersModel } from "../models/suppliers.model";


export class FetchSuppliers implements Action {
  readonly type = SupplierActionTypes.FETCH_SUPPLIER;
  constructor(public payload?: any) {}
}

export class FetchSuppliersSuccess implements Action {
  readonly type = SupplierActionTypes.FETCH_SUPPLIER_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchSuppliersFailure implements Action {
  readonly type = SupplierActionTypes.FETCH_SUPPLIER_FAILURE;
  constructor(public error: any) {}
}

export class CreateSupplier implements Action {
  readonly type = SupplierActionTypes.CREATE_SUPPLIER;
  constructor(public payload?: any) {}
}

export class CreateSuppliersSuccess implements Action {
  readonly type = SupplierActionTypes.CREATE_SUPPLIER_SUCCESS;
  constructor(public payload: SuppliersModel) {}
}

export class CreateSuppliersFailure implements Action {
  readonly type = SupplierActionTypes.CREATE_SUPPLIER_FAILURE;
  constructor(public error: any) {}
}

export class UpdateSupplier implements Action {
  readonly type = SupplierActionTypes.UPDATE_SUPPLIER;
  constructor(public id:string,public payload?: any) {}
}

export class UpdateSuppliersSuccess implements Action {
  readonly type = SupplierActionTypes.UPDATE_SUPPLIER_SUCCESS;
  constructor(public payload: SuppliersModel) {}
}

export class UpdateSuppliersFailure implements Action {
  readonly type = SupplierActionTypes.UPDATE_SUPPLIER_FAILURE;
  constructor(public error: any) {}
}

export class DeleteSupplier implements Action {
  readonly type = SupplierActionTypes.DELETE_SUPPLIER;
  constructor(public id:string) {}
}

export class DeleteSuppliersSuccess implements Action {
  readonly type = SupplierActionTypes.DELETE_SUPPLIER_SUCCESS;
  constructor(public payload: SuppliersModel) {}
}

export class DeleteSuppliersFailure implements Action {
  readonly type = SupplierActionTypes.DELETE_SUPPLIER_FAILURE;
  constructor(public error: any) {}
}

export type SupplierTypes = FetchSuppliers | FetchSuppliersSuccess | FetchSuppliersFailure |
  CreateSupplier | CreateSuppliersSuccess | CreateSuppliersFailure |
  UpdateSupplier | UpdateSuppliersSuccess | UpdateSuppliersFailure |
  DeleteSupplier | DeleteSuppliersSuccess | DeleteSuppliersFailure
