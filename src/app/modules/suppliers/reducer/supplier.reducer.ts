import { SupplierState, initialState } from "../state/supplier.state";
import { SupplierActionTypes } from '../enums/supplier.enum';
import { SupplierTypes } from '../actions/suppliers.action';


export const supplierReducer = (state: SupplierState = initialState, action: SupplierTypes): SupplierState => {

  switch (action.type) {
    case SupplierActionTypes.FETCH_SUPPLIER:
      return { ...state, loading: true, error: null };

    case SupplierActionTypes.FETCH_SUPPLIER_SUCCESS:{
      const suppliers = action.payload;
      return { ...state, suppliers, loading: false };}

    case SupplierActionTypes.FETCH_SUPPLIER_FAILURE:{
      const error = action.error;
      return { ...state, error, loading: false };}

    case SupplierActionTypes.CREATE_SUPPLIER:
      return { ...state, loading: true, error: null };

    case SupplierActionTypes.CREATE_SUPPLIER_SUCCESS: {
      const supplier = action.payload;
      return { ...state, supplier, loading: false };
    }

    case SupplierActionTypes.CREATE_SUPPLIER_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    case SupplierActionTypes.UPDATE_SUPPLIER: {
      return { ...state, loading: true, error: null };
    }

    case SupplierActionTypes.UPDATE_SUPPLIER_SUCCESS: {
      const supplier = action.payload;
      return { ...state, supplier, loading: false };
    }

    case SupplierActionTypes.UPDATE_SUPPLIER_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    case SupplierActionTypes.DELETE_SUPPLIER: {
      return { ...state, loading: true, error: null };
    }

    case SupplierActionTypes.DELETE_SUPPLIER_SUCCESS: {
      const supplier = action.payload;
      return { ...state, supplier, loading: false };
    }

    case SupplierActionTypes.DELETE_SUPPLIER_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    default:
      return state;
  }
}
