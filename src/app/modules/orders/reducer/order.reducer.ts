import { OrderState, initialState } from "../state/order.state";
import { OrderActionTypes } from '../enums/order.enum';
import { OrderTypes } from '../actions/order.action';


export const orderReducer = (state: OrderState = initialState, action: OrderTypes): OrderState => {

  switch (action.type) {
    case OrderActionTypes.FETCH_ORDER:
      return { ...state, loading: true, error: null };

    case OrderActionTypes.FETCH_ORDER_SUCCESS:{
      const orders = action.payload;
      return { ...state, orders, loading: false };}

    case OrderActionTypes.FETCH_ORDER_FAILURE:{
      const error = action.error;
      return { ...state, error, loading: false };}

    case OrderActionTypes.CREATE_ORDER:
      return { ...state, loading: true, error: null };

    case OrderActionTypes.CREATE_ORDER_SUCCESS: {
      const order = action.payload;
      return { ...state, order, loading: false };
    }

    case OrderActionTypes.CREATE_ORDER_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    case OrderActionTypes.UPDATE_ORDER: {
      return { ...state, loading: true, error: null };
    }

    case OrderActionTypes.UPDATE_ORDER_SUCCESS: {
      const order = action.payload;
      return { ...state, order, loading: false };
    }

    case OrderActionTypes.UPDATE_ORDER_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    case OrderActionTypes.DELETE_ORDER: {
      return { ...state, loading: true, error: null };
    }

    case OrderActionTypes.DELETE_ORDER_SUCCESS: {
      const order = action.payload;
      return { ...state, order, loading: false };
    }

    case OrderActionTypes.DELETE_ORDER_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    default:
      return state;
  }
}
