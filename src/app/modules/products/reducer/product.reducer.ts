import { ProductState, initialState } from "../state/product.state";
import { ProductActionTypes } from '../enums/product.enum';
import { ProductTypes } from '../actions/product.action';


export const productReducer = (state: ProductState = initialState, action: ProductTypes): ProductState => {

  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCT:
      return { ...state, loading: true, error: null };

    case ProductActionTypes.FETCH_PRODUCT_SUCCESS:{
      const products = action.payload;
      return { ...state, products, loading: false };}

    case ProductActionTypes.FETCH_PRODUCT_FAILURE:{
      const error = action.error;
      return { ...state, error, loading: false };}

    case ProductActionTypes.CREATE_PRODUCT:
      return { ...state, loading: true, error: null };

    case ProductActionTypes.CREATE_PRODUCT_SUCCESS: {
      const product = action.payload;
      return { ...state, product, loading: false };
    }

    case ProductActionTypes.CREATE_PRODUCT_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    case ProductActionTypes.UPDATE_PRODUCT: {
      return { ...state, loading: true, error: null };
    }

    case ProductActionTypes.UPDATE_PRODUCT_SUCCESS: {
      const product = action.payload;
      return { ...state, product, loading: false };
    }

    case ProductActionTypes.UPDATE_PRODUCT_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    case ProductActionTypes.DELETE_PRODUCT: {
      return { ...state, loading: true, error: null };
    }

    case ProductActionTypes.DELETE_PRODUCT_SUCCESS: {
      const product = action.payload;
      return { ...state, product, loading: false };
    }

    case ProductActionTypes.DELETE_PRODUCT_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    default:
      return state;
  }
}
