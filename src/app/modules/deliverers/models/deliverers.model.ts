import { ProductsModel } from "../../products/models/products.model";
import { ClientsModel } from "../../clients/models/clients.model";


export class DeliverersModel{
  _id!: string;
  name!: string;
  address!: string;
  contact!: number;
  email!: string;
  owner!: string;
}
