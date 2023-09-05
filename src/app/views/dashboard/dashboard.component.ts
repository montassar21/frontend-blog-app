import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { EntityCollectionService, EntityCollectionServiceFactory } from '@ngrx/data';
import { BehaviorSubject, Observable, Subscription, async, map, switchMap } from 'rxjs';
import { ClientsModel } from 'src/app/modules/clients/models/clients.model';
import { UsersService } from 'src/app/shared/users.service';
import { OrdersModel } from '../../modules/orders/models/orders.model'
import { ProductsModel } from 'src/app/modules/products/models/products.model';
import { ClientFacade } from 'src/app/modules/clients/facade/client.facade';
import { InvoiceFacade } from 'src/app/modules/invoices/facade/invoice.facade';
import { OrderFacade } from 'src/app/modules/orders/facade/order.facade';
import { ProductFacade } from 'src/app/modules/products/facade/product.facade';
import { subscribe } from 'diagnostics_channel';
import { InvoicesModel } from 'src/app/modules/invoices/models/invoices.model';



@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allClients$: Observable<ClientsModel[]>;
  allProducts$: Observable<ProductsModel[]>;
  allOrders$: Observable<OrdersModel[]>;
  allInvoices$: Observable<InvoicesModel[]>;
  numberOfClients!: Observable<any>;
  numberOfProducts!: Observable<any>;
  toId: any;
  genderFemale: number=0;
  genderMale: number=0;
  reccuringClient: number=0;
  newClient: number=0;
  daysNewClients:any=[0,0,0,0,0,0,0];
  daysReccuringClients:any= [0,0,0,0,0,0,0];
  numberOfOrders!: Observable<any>;
  paidOrders: number = 0;
  unpaidOrders: number = 0;
  paidInvoices: number = 0;
  unpaidInvoices: number = 0;
  productsLength: number = 0;
  productListQuantity: any = [];
  productListName: any = [];
  userInfo!: any;
  constructor(private user: UsersService,
    private chartsData: DashboardChartsData,
    private invoiceFacade: InvoiceFacade,
    private productFacade: ProductFacade,
    private clientFacade: ClientFacade,
    private orderFacade: OrderFacade,
  ) {
    this.allProducts$ = this.productFacade.products$;
    this.allInvoices$ = this.invoiceFacade.invoices$;
    this.allClients$ = this.clientFacade.clients$;
    this.allOrders$ = this.orderFacade.orders$;

  }

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  // Initialize chartBarData with default values
  chartBarData = {

    labels:[],
    datasets: [
      {
        label: 'Products Sales',
        backgroundColor: '#f87979',
        data: [20,30]
      }
    ]
  };

  async ngOnInit() {
     try {
        const userr =await  this.user.getUser().toPromise();
    console.log(this.user.getToken())
    if (this.user.getToken() != userr.token) {
      this.user.signOut()
    }
     } catch (error) {
             this.user.signOut()

    console.error('An error occurred:', error);
  }

    this.initCharts();
    this.productFacade.fetchProducts()

// Subscribe to the observable and update chart data when productList is populated
this.allProducts$.subscribe(products => {
  this.productListName = [];
  this.productListQuantity = [];
  this.productsLength = 0;
  for (let product of products) {
    this.productListName.push(product.name);
    this.productListQuantity.push(product.quantity);
    this.productsLength = products.length;
  }

  // Update chartBarData.labels after productList is populated

this.chartBarData = {
  labels:this.productListName.slice(0, this.productsLength),
  datasets: [
    {
      label: 'Products Sales',
      backgroundColor: '#f87979',
      data: this.productListQuantity.slice(0, this.productsLength),
    }
  ]
};
});

    this.numberOfClients = this.allClients$.pipe(
      map(clients => { clients.length; console.log(clients)})
    );

    this.numberOfOrders = this.allOrders$.pipe(
      map(orders => orders.length)

    );
    this.numberOfProducts = this.allProducts$.pipe(
      map(products => { products.length })

    );

    this.getProductsSales();
    this.getGender();
    this.getClientStatus();
    this.getOrdersStatus();
    this.getInvoicesStatus();

    }

 getProductsSales(){
    //    this.allProducts.subscribe((products: any) => {
    //    for (let product of products) {
    //      this.productsList.push(product.name);
    //     }
    // },
    //        (error) => {
    //         // Handle errors if any
    //        console.error('Error fetching order status:', error);
    //             });
    //     console.log(...this.productsList);

    }
  getGender() {

    this.allClients$.subscribe((clients) => {
          this.genderFemale = 0;
    this.genderMale = 0;
        // You can use clients to fetch client gender.
        for (let client of clients) {
          if (client.gender == "Male") this.genderMale += 1;
          else if(client.gender == "Female") this.genderFemale += 1;
        }
      },
           (error) => {
            // Handle errors if any
           console.error('Error fetching product cost:', error);
                });
  }
  getClientStatus() {

    this.allClients$.subscribe((clients: any) => {
        // You can use clients to fetch client date registration.
          this.reccuringClient = 0;
    this.newClient = 0;
       for (let client of clients) {
         //New date
         const dte = new Date();

         //Get the date of client registration.
         const dateObject = new Date(client.createdAt);
         //Get the day of client registration.
         const dayIndex = dateObject.getDate();

         if ( dte.getDate()- dayIndex <=1 &&dte.getMonth()==dateObject.getMonth()) this.newClient++,this.daysNewClients[dte.getUTCDay()]++;
         else this.reccuringClient++,this.daysReccuringClients[dte.getUTCDay()]++;;
       }
      },
           (error) => {
            // Handle errors if any
           console.error('Error fetching product cost:', error);
                });
  }
  getOrdersStatus() {

    this.allOrders$.subscribe((orders: any[]) => {
      this.paidOrders = 0;
      this.unpaidOrders = 0;
      for (let order of orders) {
        if (order.payment_status == 'Paid') this.paidOrders++;
        else this.unpaidOrders++;
      }
    },
      (error) => {
        // Handle errors if any
        console.error('Error fetching order status:', error);
      });
  }

 getInvoicesStatus() {

    this.allInvoices$.subscribe((invoices: any[]) => {
              this.paidInvoices = 0;
    this.unpaidInvoices = 0;
      for (let invoice of invoices) {
          if (invoice.status == 'Paid') this.paidInvoices++;
          else this.unpaidInvoices++;
      }
    },
           (error) => {
            // Handle errors if any
           console.error('Error fetching order status:', error);
      });
 }


  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }

   ngOnDestroy() {
    // Unsubscribe when the component is destroyed
  }
}


