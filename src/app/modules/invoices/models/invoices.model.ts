import { ProductsModel } from "../../products/models/products.model";
import { ClientsModel } from "../../clients/models/clients.model";


export class InvoicesModel{
  _id!: string;
  client: ClientsModel = {
    _id:'',
    customerName:'',
    address: '',
    contactNo:0,
    email:'',
    inputCity:'',
    inputZip:'',
    state: '',
    gender:'',
  };
  date!:Date;
  number!:number;
  payment_terms!:number;
  total!:number;
  products: ProductsModel[] = [];
  additionalDetails!: string;
  status!: string ;
}
