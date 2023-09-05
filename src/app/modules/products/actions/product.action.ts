import { ProductActionTypes } from "../enums/product.enum";
import { Action } from '@ngrx/store'
import { ProductsModel } from "../models/products.model";


export class FetchProducts implements Action {
  readonly type = ProductActionTypes.FETCH_PRODUCT;
  constructor(public payload?: any) {}
}

export class FetchProductsSuccess implements Action {
  readonly type = ProductActionTypes.FETCH_PRODUCT_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchProductsFailure implements Action {
  readonly type = ProductActionTypes.FETCH_PRODUCT_FAILURE;
  constructor(public error: any) {}
}

export class CreateProduct implements Action {
  readonly type = ProductActionTypes.CREATE_PRODUCT;
  constructor(public payload?: any) {}
}

export class CreateProductsSuccess implements Action {
  readonly type = ProductActionTypes.CREATE_PRODUCT_SUCCESS;
  constructor(public payload: ProductsModel) {}
}

export class CreateProductsFailure implements Action {
  readonly type = ProductActionTypes.CREATE_PRODUCT_FAILURE;
  constructor(public error: any) {}
}

export class UpdateProduct implements Action {
  readonly type = ProductActionTypes.UPDATE_PRODUCT;
  constructor(public id:string,public payload?: any) {}
}

export class UpdateProductsSuccess implements Action {
  readonly type = ProductActionTypes.UPDATE_PRODUCT_SUCCESS;
  constructor(public payload: ProductsModel) {}
}

export class UpdateProductsFailure implements Action {
  readonly type = ProductActionTypes.UPDATE_PRODUCT_FAILURE;
  constructor(public error: any) {}
}

export class DeleteProduct implements Action {
  readonly type = ProductActionTypes.DELETE_PRODUCT;
  constructor(public id:string) {}
}

export class DeleteProductsSuccess implements Action {
  readonly type = ProductActionTypes.DELETE_PRODUCT_SUCCESS;
  constructor(public payload: ProductsModel) {}
}

export class DeleteProductsFailure implements Action {
  readonly type = ProductActionTypes.DELETE_PRODUCT_FAILURE;
  constructor(public error: any) {}
}

export type ProductTypes = FetchProducts | FetchProductsSuccess | FetchProductsFailure |
  CreateProduct | CreateProductsSuccess | CreateProductsFailure |
  UpdateProduct | UpdateProductsSuccess | UpdateProductsFailure |
  DeleteProduct | DeleteProductsSuccess | DeleteProductsFailure
