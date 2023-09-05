import { InvoiceState, initialState } from "../state/invoice.state";
import { InvoiceActionTypes } from '../enums/invoice.enum';
import { InvoiceTypes } from '../actions/invoice.action';


export const invoiceReducer = (state: InvoiceState = initialState, action: InvoiceTypes): InvoiceState => {

  switch (action.type) {
    case InvoiceActionTypes.FETCH_INVOICE:
      return { ...state, loading: true, error: null };

    case InvoiceActionTypes.FETCH_INVOICE_SUCCESS:{
      const invoices = action.payload;
      return { ...state, invoices, loading: false };}

    case InvoiceActionTypes.FETCH_INVOICE_FAILURE:{
      const error = action.error;
      return { ...state, error, loading: false };}

    case InvoiceActionTypes.CREATE_INVOICE:
      return { ...state, loading: true, error: null };

    case InvoiceActionTypes.CREATE_INVOICE_SUCCESS: {
      const invoice = action.payload;
      return { ...state, invoice, loading: false };
    }

    case InvoiceActionTypes.CREATE_INVOICE_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    case InvoiceActionTypes.UPDATE_INVOICE: {
      return { ...state, loading: true, error: null };
    }

    case InvoiceActionTypes.UPDATE_INVOICE_SUCCESS: {
      const invoice = action.payload;
      return { ...state, invoice, loading: false };
    }

    case InvoiceActionTypes.UPDATE_INVOICE_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    case InvoiceActionTypes.DELETE_INVOICE: {
      return { ...state, loading: true, error: null };
    }

    case InvoiceActionTypes.DELETE_INVOICE_SUCCESS: {
      const invoice = action.payload;
      return { ...state, invoice, loading: false };
    }

    case InvoiceActionTypes.DELETE_INVOICE_FAILURE: {
      const error = action.error;
      return { ...state, error, loading: false };
    }

    default:
      return state;
  }
}
