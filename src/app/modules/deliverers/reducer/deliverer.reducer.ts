import { DelivererState, initialState } from "../state/deliverer.state";
import { DelivererActionTypes } from '../enums/deliverer.enum';
import { DelivererTypes } from '../actions/deliverer.action';


export const delivererReducer = (state: DelivererState = initialState, action: DelivererTypes): DelivererState => {

  switch (action.type) {
    case DelivererActionTypes.FETCH_DELIVERER:
      return { ...state, loading: true, error: null };

    case DelivererActionTypes.FETCH_DELIVERER_SUCCESS:{
      const deliverers = action.payload;
      return { ...state, deliverers, loading: false };}

    case DelivererActionTypes.FETCH_DELIVERER_FAILURE:{
      const error = action.error;
      return { ...state, error, loading: false };}

    case DelivererActionTypes.CREATE_DELIVERER:
      return { ...state, loading: true, error: null };

    case DelivererActionTypes.CREATE_DELIVERER_SUCCESS: {
      const deliverer = action.payload;
      return { ...state, deliverer, loading: false };
    }

    case DelivererActionTypes.CREATE_DELIVERER_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    case DelivererActionTypes.UPDATE_DELIVERER: {
      return { ...state, loading: true, error: null };
    }

    case DelivererActionTypes.UPDATE_DELIVERER_SUCCESS: {
      const deliverer = action.payload;
      return { ...state, deliverer, loading: false };
    }

    case DelivererActionTypes.UPDATE_DELIVERER_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    case DelivererActionTypes.DELETE_DELIVERER: {
      return { ...state, loading: true, error: null };
    }

    case DelivererActionTypes.DELETE_DELIVERER_SUCCESS: {
      const deliverer = action.payload;
      return { ...state, deliverer, loading: false };
    }

    case DelivererActionTypes.DELETE_DELIVERER_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    default:
      return state;
  }
}
