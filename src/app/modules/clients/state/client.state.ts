import { ClientsModel } from "../models/clients.model";

export interface ClientState {
  clients: ClientsModel[];
  client: ClientsModel;
  loading: boolean;
  error: any;
}

export const initialState: ClientState = {
  clients: [],
  client: {
    _id:'',
customerName:'',
address:'',
contactNo:0,
email:'',
inputCity:'',
state:'',
inputZip:'',
gender:'',
  },
  loading: false,
  error: null
};

