import { ProductsModel } from "../models/products.model";

export interface ProductState {
  products: any[];
  product: ProductsModel;
  loading: boolean;
  error: any;
}

export const initialState: ProductState = {
  products: [],
  product: {
     name: '',
     image:'',
    category: '',
    brand: '',
    quantity: 0,
    code: '',
    cost: 0,
    price: 0,
    unit: '',
    alert_quantity: 0,
    _id: '',
    owner:'',
  },
  loading: false,
  error: null
};

