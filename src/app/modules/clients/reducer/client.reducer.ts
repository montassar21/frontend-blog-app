import { ClientState, initialState } from "../state/client.state";
import { ClientActionTypes } from '../enums/client.enum';
import { ClientTypes } from '../actions/client.action';


export const clientReducer = (state: ClientState = initialState, action: ClientTypes): ClientState => {

  switch (action.type) {
    case ClientActionTypes.FETCH_CLIENT:
      return { ...state, loading: true, error: null };

    case ClientActionTypes.FETCH_CLIENT_SUCCESS:{
      const clients = action.payload;
      return { ...state, clients, loading: false };}

    case ClientActionTypes.FETCH_CLIENT_FAILURE:{
      const error = action.error;
      return { ...state, error, loading: false };}

    case ClientActionTypes.CREATE_CLIENT:
      return { ...state, loading: true, error: null };

    case ClientActionTypes.CREATE_CLIENT_SUCCESS: {
      const client = action.payload;
      return { ...state, client, loading: false };
    }

    case ClientActionTypes.CREATE_CLIENT_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    case ClientActionTypes.UPDATE_CLIENT: {
      return { ...state, loading: true, error: null };
    }

    case ClientActionTypes.UPDATE_CLIENT_SUCCESS: {
      const client = action.payload;
      return { ...state, client, loading: false };
    }

    case ClientActionTypes.UPDATE_CLIENT_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    case ClientActionTypes.DELETE_CLIENT: {
      return { ...state, loading: true, error: null };
    }

    case ClientActionTypes.DELETE_CLIENT_SUCCESS: {
      const client = action.payload;
      return { ...state, client, loading: false };
    }

    case ClientActionTypes.DELETE_CLIENT_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    default:
      return state;
  }
}
