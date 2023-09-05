import { OrdersModel } from "../models/orders.model";

export interface OrderState {
  orders: OrdersModel[];
  order: OrdersModel;
  loading: boolean;
  error: any;
}

export const initialState: OrderState = {
  orders: [],
  order: {
      _id:'',
  reference:'',
  orderDate:'',
  customer:'',
  total:0,
  paid: 0,
  deliverer:'',
  orderStatus:'',
  orderItems:[],
  payment_status:'',
  },
  loading: false,
  error: null
};

