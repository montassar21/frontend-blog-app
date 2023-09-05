import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateSupplier, DeleteSupplier, FetchSuppliers, UpdateSupplier } from '../actions/suppliers.action';
import * as SupplierSelectors from '../selectors/suppliers.selector';
import { SuppliersModel } from '../models/suppliers.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierFacade {
  suppliers$: Observable<SuppliersModel[]>;
  supplier$: Observable<SuppliersModel>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.suppliers$ = this.store.select(SupplierSelectors.selectSuppliers);
    this.supplier$ = this.store.select(SupplierSelectors.selectSupplier);
    this.loading$ = this.store.select(SupplierSelectors.selectLoading);
    this.error$ = this.store.select(SupplierSelectors.selectError);
  }

  fetchSuppliers() {
    this.store.dispatch(new FetchSuppliers());
  }
  createSupplier(supplier:SuppliersModel) {
    this.store.dispatch(new CreateSupplier(supplier));
  }
  updateSupplier(id:string,supplier:Partial<SuppliersModel>) {
    this.store.dispatch(new UpdateSupplier(id,supplier));
  }

  deleteSupplier(id:string) {
    this.store.dispatch(new DeleteSupplier(id));
  }
}
