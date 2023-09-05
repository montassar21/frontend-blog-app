import { Component, OnInit } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import {InvoicesModel} from './models/invoices.model'
import { ProductsModel } from "../products/models/products.model";
import { ClientsModel } from '../clients/models/clients.model';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { UsersService } from 'src/app/shared/users.service';
import { ProductFacade } from '../products/facade/product.facade';
import { ClientFacade } from '../clients/facade/client.facade';
import { InvoiceFacade } from './facade/invoice.facade';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})

export class InvoicesComponent implements OnInit {
  pdfSrc!: string;
  allProducts$!: Observable<ProductsModel[]>;
  allInvoices$!: Observable<InvoicesModel[]>;
  allClients$!: Observable<ClientsModel[]>;
  clientSaved:boolean = false;
  invoice = new InvoicesModel();
  docDefinition!: any
  client= new ClientsModel();
  subscribtion: any;
  constructor(
    private user: UsersService,
    private productFacade: ProductFacade,
    private clientFacade: ClientFacade,
    private invoiceFacade: InvoiceFacade,
    private _snackBar: MatSnackBar
  )

     {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.allProducts$ = this.productFacade.products$;
    this.allInvoices$ = this.invoiceFacade.invoices$;
    this.allClients$ = this.clientFacade.clients$;

  }
  ngOnInit(){
   }

  generatePDF(action = 'open') {
   this.docDefinition = {
      content: [
        {
          text: 'ELECTRONIC INVOICE',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.invoice.client.customerName,
                bold:true
              },
              { text: this.invoice.client.address },
              { text: this.invoice.client.email },
              { text: this.invoice.client.contactNo },
              { text: this.invoice.client.inputCity+' '+this.invoice.client.state+' '+this.invoice.client.inputZip,

              }

            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Bill No : ${this.invoice.number}`,
                alignment: 'right'
              },
              {
                text: `The invoice will be due in : ${this.invoice.payment_terms}`,
                alignment: 'right'
              }
            ]
          ],
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...this.invoice.products.map(p => ([p._id, p.price, p.quantity, (p.price * p.quantity).toFixed(2)]) ),
              [{text: 'Total Amount', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum, p)=> sum + (p.quantity * p.price), 0).toFixed(2)]
            ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
            text: this.invoice.additionalDetails,
            margin: [0, 0 ,0, 15]
        },
        {
          columns: [
            [{ qr: `${this.invoice.client.customerName}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true}],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Order can be return in max 10 days.',
              'Warrenty of the product will be subject to the manufacturer terms and conditions.',
              'This is system generated invoice.',
            ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]
        }
      }
    };
    if(this.clientSaved==true)
{
    if(action==='download'){
      pdfMake.createPdf(this.docDefinition).download();
    }
    else if (action === 'print') {
      pdfMake.createPdf(this.docDefinition).print();
    }
    else {
      pdfMake.createPdf(this.docDefinition).open();
      pdfMake.createPdf(this.docDefinition).getBlob((blob: Blob) => {
        this.pdfSrc = URL.createObjectURL(blob);
            });
    }}
    else  this._snackBar.open('Save Client First !.', 'Close', {
      duration: 3000 // Duration in milliseconds
    });

  }



  addProduct(){
    this.invoice.products.push(new ProductsModel());
  }

//I used this function to generate a random string id and use it as a primary key of a product.
    formatToObjectId(str: string): string {
      const objectIdArray = [];

      for (let i = 0; i < str.length; i += 2) {
        objectIdArray.push(parseInt(str.substr(i, 2), 36));
      }
       return objectIdArray.join('');
                                      }
  saveClient(){
    this.clientSaved=true;
    this.client=this.invoice.client;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const length = 24; // Length of the random string
    let result = '';

    this.allClients$.subscribe(clients => {
  const clientEmailToFind = this.client.email; // Replace this with the actual client ID you're looking for
  const foundClient = clients.find(client => client.email === clientEmailToFind);
  if (foundClient==undefined) {

        for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
                                }

  // Format the random string to ObjectId-like format
    this.client._id = this.formatToObjectId(result)

    this.clientFacade.createClient(this.client);
    this._snackBar.open('Client Saved !.', 'Close', {
      duration: 3000 // Duration in milliseconds
    });

  }
});

  }

  saveInvoice() {
    if (this.clientSaved) {
      console.log(this.invoice.products)
      let invoices = new InvoicesModel();
      invoices = {
        _id: '',
        date: this.invoice.date,
        client: this.invoice.client,
        number: this.invoice.number,
        payment_terms: this.invoice.payment_terms,
        products: this.invoice.products,
        total: this.invoice.products.reduce((sum, p) => sum + (p.quantity * p.price), 0),
        additionalDetails: this.invoice.additionalDetails,
        status: 'Unpaid',
      }
      for (let i of this.invoice.products) {

         this.subscribtion = this.allProducts$.subscribe(products => {
          const foundProduct = products.find(product => product._id === i._id);
          console.log(foundProduct)
          if (foundProduct != undefined) {
                  let quantityUpdated = JSON.parse(JSON.stringify(foundProduct));
            quantityUpdated.quantity = foundProduct.quantity-i.quantity;
            this.productFacade.updateProduct(i._id,quantityUpdated)
          }

        })

      }
      this.subscribtion.unsubscribe()
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const length = 24; // Length of the random string
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      // Format the random string to ObjectId-like format
      invoices._id = this.formatToObjectId(result)

      this.invoiceFacade.createInvoice(invoices)
       this._snackBar.open('Invoice Saved !', 'Close', {
      duration: 3000
 // Duration in milliseconds
    });

    }

    else  this._snackBar.open('Save Client First !', 'Close', {
      duration: 3000
 // Duration in milliseconds
    });
  }
}
