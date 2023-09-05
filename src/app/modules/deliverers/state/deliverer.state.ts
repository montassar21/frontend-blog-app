import { ClientsModel } from "../../clients/models/clients.model";
import { DeliverersModel } from "../models/deliverers.model";

export interface DelivererState {
  deliverers: DeliverersModel[];
  deliverer: DeliverersModel;
  loading: boolean;
  error: any;
}

export const initialState: DelivererState = {
  deliverers: [],
  deliverer: {
    _id: '',
    name: '',
    address: '',
    contact: 0,
    email: '',
  owner:'',
  },
  loading: false,
  error: null
};

