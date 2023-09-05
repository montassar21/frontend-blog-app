import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateProduct, DeleteProduct, FetchProducts, UpdateProduct } from '../actions/product.action';
import * as ProductSelectors from '../selectors/products.selector';
import { ProductsModel } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductFacade {
  products$: Observable<ProductsModel[]>;
  product$: Observable<ProductsModel>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.products$ = this.store.select(ProductSelectors.selectProducts);
    this.product$ = this.store.select(ProductSelectors.selectProduct);
    this.loading$ = this.store.select(ProductSelectors.selectLoading);
    this.error$ = this.store.select(ProductSelectors.selectError);
  }

  fetchProducts() {
    this.store.dispatch(new FetchProducts());
  }
  createProduct(product:ProductsModel) {
    this.store.dispatch(new CreateProduct(product));
  }
  updateProduct(id:string,product:Partial<ProductsModel>) {
    this.store.dispatch(new UpdateProduct(id,product));
  }

  deleteProduct(id:string) {
    this.store.dispatch(new DeleteProduct(id));
  }
}
