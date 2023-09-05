import { ClientsModel } from "../../clients/models/clients.model";
import { InvoicesModel } from "../models/invoices.model";

export interface InvoiceState {
  invoices: InvoicesModel[];
  invoice: InvoicesModel;
  loading: boolean;
  error: any;
}

export const initialState: InvoiceState = {
  invoices: [],
  invoice: {
    _id: '',
    client: {
      _id: '',
      customerName: '',
      address: '',
      contactNo: 0,
      email: '',
      inputCity: '',
      inputZip: '',
      state: '',
      gender: '',
    },
    date:new Date(),
  number:0,
  payment_terms:0,
  total:0,
  products: [],
  additionalDetails:'',
  status:'',
  },
  loading: false,
  error: null
};

