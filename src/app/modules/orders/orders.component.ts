import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EntityCollectionService, EntityCollectionServiceFactory } from '@ngrx/data';
import { NgToastService } from 'ng-angular-popup';
import { OrdersModel } from '../orders/models/orders.model';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { UsersService } from 'src/app/shared/users.service';
import { OrderFacade } from '../orders/facade/order.facade';
import { DelivererFacade } from '../deliverers/facade/deliverer.facade'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeliverersModel } from '../deliverers/models/deliverers.model';

declare var window:any;


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  allOrders$: Observable<OrdersModel[]>;
  allDeliverers$: Observable<DeliverersModel[]>;
  orderModal: any;
  orderModalTitle!: any;
  toId!: any

  orderForm: OrdersModel = {
    _id: '',
    reference: '',
    orderDate: '',
    customer: '',
    total: 0,
    paid: 0,
    deliverer:'',
    orderStatus: '',
    orderItems: [],
    payment_status: '',
  };
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private user: UsersService,
    private orderFacade: OrderFacade,
    private deliverersFacade: DelivererFacade,

    private _snackBar: MatSnackBar,

  ) {
    this.allOrders$ = this.orderFacade.orders$;
    this.allDeliverers$ = this.deliverersFacade.deliverers$;

  }

  ngOnInit(): void {
    this.toId = this.user.getToken();
    this.orderModal = new window.bootstrap.Modal(document.getElementById('ordersModal'), { Keyboard: false });

    // dispatch fetch action through facade
    this.orderFacade.fetchOrders();
    this.deliverersFacade.fetchDeliverers();
  }

  // I used this function to generate a random string id and use it as a primary key of a product.
  formatToObjectId(str: string): string {
    const objectIdArray = [];

    for (let i = 0; i < str.length; i += 2) {
      objectIdArray.push(parseInt(str.substr(i, 2), 36));
    }
    return objectIdArray.join('');
  }

  // This function is responsible for the opening of the Modal, it takes a string as an input if this this string is empty
  // the fields of the modal are empty otherwise we get the details of order to be updated.
  openOrderModal(id: string) {
    if (id == '') {
      this.orderModalTitle = 'Add A New Order';
      this.orderForm = {
        _id: '',
        reference: '',
        orderDate: '',
        customer: '',
        total: 0,
        paid: 0,
        deliverer:'',
        orderStatus: '',
        orderItems: [],
        payment_status: '',
      }
    }
    else {
      this.orderModalTitle = 'Edit Order';
      this.orderFacade.orders$.subscribe(p => {
        let orderToUpdate = p.filter(
          m => m._id == id)[0];
        this.orderForm = { ...orderToUpdate }

      })
    }

    this.orderModal.show();
  }

  // A funtion to add a new order or update a given order
  saveorupdate() {
    if (this.orderForm._id == '') {
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const length = 24; // Length of the random string
      let result = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      // Format the random string to ObjectId-like format
      this.orderForm._id = this.formatToObjectId(result)

        // dispatch create order action through facade
        this.orderFacade.createOrder(this.orderForm);

        // dispatch fetch action through facade
        this.orderFacade.fetchOrders();

      this.orderModal.hide()


      this._snackBar.open('Order Created !', 'Close', {
      duration: 3000 // Duration in milliseconds
    });
    }
    else {
        // dispatch update order action through facade
        this.orderFacade.updateOrder(this.orderForm._id,this.orderForm);

        // dispatch fetch action through facade
        this.orderFacade.fetchOrders();

       this.orderModal.hide()

       this._snackBar.open('Order Updated !', 'Close', {
        duration: 3000 // Duration in milliseconds
    });


    }
  }
    deleteOrder(orderIdToDelete: string){
      //delete action
      this.orderFacade.deleteOrder(orderIdToDelete);

      // dispatch fetch action through facade
      this.orderFacade.fetchOrders();

      this.orderModal.hide();

      this._snackBar.open('Order Deleted !', 'Close', {
      duration: 3000 // Duration in milliseconds
    });
    }

  }

