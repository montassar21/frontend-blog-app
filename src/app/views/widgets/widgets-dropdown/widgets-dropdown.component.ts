import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { getStyle } from '@coreui/utils';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { EntityCollectionService, EntityCollectionServiceFactory } from '@ngrx/data';
import { BehaviorSubject, Observable, switchMap, map, async } from 'rxjs';
import { ClientsModel } from 'src/app/modules/clients/models/clients.model';
import { InvoicesModel } from 'src/app/modules/invoices/models/invoices.model';
import { OrdersModel } from 'src/app/modules/orders/models/orders.model';
import { ProductsModel } from 'src/app/modules/products/models/products.model';
import { UsersService } from 'src/app/shared/users.service';
import { ProductServiceService } from '../../../shared/product-service.service';
import { ClientFacade } from 'src/app/modules/clients/facade/client.facade';
import { InvoiceFacade } from 'src/app/modules/invoices/facade/invoice.facade';
import { OrderFacade } from 'src/app/modules/orders/facade/order.facade';
import { ProductFacade } from 'src/app/modules/products/facade/product.facade';

declare var window:any;

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {


  allProducts$: Observable<ProductsModel[]>;
  allInvoices$: Observable<InvoicesModel[]>;
  allClients$:Observable<ClientsModel[]>;
  allOrders$: Observable<OrdersModel[]>;


  numberOfInvoices!: Observable<number>;
  numberOfProducts!: Observable<number>;
  numberOfOrders!: Observable<number>;
  numberOfClients!: Observable<number>;


  username: any;
  email: any;
  address: any;
  toId!: any;
  userInfo!: any;
  userModal: any;
  income: number=0  ;
  costProd!:any;
  userForm: any = {
    _id:'',
    username:'',
    email:'',
    password1: '',
    password2:''

  };

  data: any[] = [];
  options: any[] = [];
  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
    'April'
  ];
  datasets = [
    [{
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-primary'),
      pointHoverBorderColor: getStyle('--cui-primary'),
      data: [65, 59, 84, 84, 51, 55, 40]
    }], [{
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-info'),
      pointHoverBorderColor: getStyle('--cui-info'),
      data: [1, 18, 9, 17, 34, 22, 11]
    }], [{
      label: 'My Third dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-warning'),
      pointHoverBorderColor: getStyle('--cui-warning'),
      data: [78, 81, 80, 45, 34, 12, 40],
      fill: true
    }], [{
      label: 'My Fourth dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
      barPercentage: 0.7
    }]
  ];
  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        min: 30,
        max: 89,
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };

  constructor(private user: UsersService,
    private changeDetectorRef: ChangeDetectorRef,
    private prodService: ProductServiceService,
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

  ngOnInit(): void {
    this.invoiceFacade.fetchInvoices();
    this.productFacade.fetchProducts();
    this.clientFacade.fetchClients();
    this.orderFacade.fetchOrders();

    //This Modal is responsible for the user information modification.
    this.userModal = new window.bootstrap.Modal(document.getElementById('Modal'), { Keyboard: false });

    //Get the token of current user.
    this.toId = this.user.getToken();

    this.numberOfInvoices = this.allInvoices$.pipe(
      map(invoices => invoices.length)
    );

    this.numberOfProducts = this.allProducts$.pipe(
      map(products => products.length)
    );

    this.numberOfOrders = this.allOrders$.pipe(
      map(orders => orders.length)
    );

    this.numberOfClients = this.allClients$.pipe(
      map(clients => clients.length)
    );
          this.getIncome();


    this.setData();
  }
  getIncome() {

    this.allInvoices$.subscribe((invoices) => {
        this.income = 0;
      // You can use invoices to fetch products prices.
         for (let invoice of invoices) {
           let ans = 0;
           for (let p of invoice.products) {
              this.prodService.getProductCost(p._id).subscribe(
           (product:any)  => {
           // Use the 'cost' value here
                  this.income += (p.quantity * (p.price - product.cost));
                  // product.quantity -= p.quantity;
                  // this.productFacade.updateProduct(p._id,product)
               },
           (error) => {
            // Handle errors if any
           console.error('Error fetching product cost:', error);
                });
           }
         }
       });
}


  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();

  }

  setData() {
    for (let idx = 0; idx < 4; idx++) {
      this.data[idx] = {
        labels: idx < 3 ? this.labels.slice(0, 7) : this.labels,
        datasets: this.datasets[idx]
      };
    }
    this.setOptions();
  }

  setOptions() {
    for (let idx = 0; idx < 4; idx++) {
      const options = JSON.parse(JSON.stringify(this.optionsDefault));
      switch (idx) {
        case 0: {
          this.options.push(options);
          break;
        }
        case 1: {
          options.scales.y.min = -9;
          options.scales.y.max = 39;
          this.options.push(options);
          break;
        }
        case 2: {
          options.scales.x = { display: false };
          options.scales.y = { display: false };
          options.elements.line.borderWidth = 2;
          options.elements.point.radius = 0;
          this.options.push(options);
          break;
        }
        case 3: {
          options.scales.x.grid = { display: false, drawTicks: false };
          options.scales.x.grid = { display: false, drawTicks: false, drawBorder: false };
          options.scales.y.min = undefined;
          options.scales.y.max = undefined;
          options.elements = {};
          this.options.push(options);
          break;
        }
      }
    }
  }
}

@Component({
  selector: 'app-chart-sample',
  template: '<c-chart type="line" [data]="data" [options]="options" width="300" #chart></c-chart>'
})
export class ChartSample implements AfterViewInit {

  constructor() {}

  @ViewChild('chart') chartComponent!: ChartjsComponent;

  colors = {
    label: 'My dataset',
    backgroundColor: 'rgba(77,189,116,.2)',
    borderColor: '#4dbd74',
    pointHoverBackgroundColor: '#fff'
  };

  labels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  data = {
    labels: this.labels,
    datasets: [{
      data: [65, 59, 84, 84, 51, 55, 40],
      ...this.colors,
      fill: { value: 65 }
    }]
  };

  options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      const data = () => {
        return {
          ...this.data,
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            ...this.data.datasets[0],
            data: [42, 88, 42, 66, 77],
            fill: { value: 55 }
          }, { ...this.data.datasets[0], borderColor: '#ffbd47', data: [88, 42, 66, 77, 42] }]
        };
      };
      const newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const newData = [42, 88, 42, 66, 77];
      let { datasets, labels } = { ...this.data };
      // @ts-ignore
      const before = this.chartComponent?.chart?.data.datasets.length;
      console.log('before', before);
      // console.log('datasets, labels', datasets, labels)
      // @ts-ignore
      // this.data = data()
      this.data = {
        ...this.data,
        datasets: [{ ...this.data.datasets[0], data: newData }, {
          ...this.data.datasets[0],
          borderColor: '#ffbd47',
          data: [88, 42, 66, 77, 42]
        }],
        labels: newLabels
      };
      // console.log('datasets, labels', { datasets, labels } = {...this.data})
      // @ts-ignore
      setTimeout(() => {
        const after = this.chartComponent?.chart?.data.datasets.length;
        console.log('after', after);
      });
    }, 5000);
  }
}
