import { ActionReducerMap } from '@ngrx/store';
import { productReducer } from '../../modules/products/reducer/product.reducer'; // Import your product reducer
import { orderReducer } from '../../modules/orders/reducer/order.reducer';
import { clientReducer } from '../../modules/clients/reducer/client.reducer';
import { invoiceReducer } from '../../modules/invoices/reducer/invoice.reducer';
import { supplierReducer } from '../../modules/suppliers/reducer/supplier.reducer';
import { delivererReducer } from '../../modules/deliverers/reducer/deliverer.reducer'
export interface CentralState {
  // Define your state properties here if needed
}

export const centralReducer: ActionReducerMap<CentralState,any> = {
  appProducts: productReducer,
  appOrders: orderReducer,
  appClients: clientReducer,
  appInvoices: invoiceReducer,
  appSuppliers:supplierReducer,
  appDeliverers:delivererReducer,

  // Add more reducers as needed
};
