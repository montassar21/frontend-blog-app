import { ProductsModel } from "../../products/models/products.model";

export class OrdersModel {
  _id!:string;
  reference!: string;
  orderDate!: any;
  customer!: string;
  total!: number;
  paid!: number;
  deliverer!: string;
  orderStatus!: string;
  orderItems!: ProductsModel[];
  payment_status!: string;

}
