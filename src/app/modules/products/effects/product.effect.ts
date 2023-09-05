import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductActionTypes } from '../enums/product.enum';
import * as productActions from '../actions/product.action'
import { ProductService } from '../services/product.service';
import { ProductFacade } from '../facade/product.facade';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
   @Inject(ProductService) private productService: ProductService) {}

  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionTypes.FETCH_PRODUCT),
      mergeMap(() => {
        return this.productService.getProducts().pipe(
          map(payload => new productActions.FetchProductsSuccess(payload)),
          catchError(error => of(new productActions.FetchProductsFailure(error)))
        )
      }
      )
    )
  );
createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionTypes.CREATE_PRODUCT),
      mergeMap((action:any) => {
        return this.productService.createProduct(action.payload).pipe(
          map(payload => new productActions.CreateProductsSuccess(payload)),
          catchError(error => of(new productActions.CreateProductsFailure(error)))
        )
      }
      )
    )
  );

updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionTypes.UPDATE_PRODUCT),
      mergeMap((action:any) => {
        return this.productService.updateProduct(action.id,action.payload).pipe(
          map(updatedProduct => new productActions.UpdateProductsSuccess(updatedProduct)),
          catchError(error => of(new productActions.UpdateProductsFailure(error)))
        )
      }
      )
    )
  );

deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionTypes.DELETE_PRODUCT),
      mergeMap((action:any) => {
        return this.productService.deleteProduct(action.id).pipe(
          map((payload:any) => new productActions.DeleteProductsSuccess(payload)),
          catchError(error => of(new productActions.DeleteProductsFailure(error)))
        )
      }
      )
    )
  );
}
