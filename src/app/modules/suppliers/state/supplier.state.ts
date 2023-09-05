import { SuppliersModel } from "../models/suppliers.model";

export interface SupplierState {
  suppliers: any[];
  supplier: SuppliersModel;
  loading: boolean;
  error: any;
}

export const initialState: SupplierState = {
  suppliers: [],
  supplier: {
    _id:'',
     name: '',
    address: '',
    email: '',
    contact: 0,
    service:'',
    owner:'',
  },
  loading: false,
  error: null
};

