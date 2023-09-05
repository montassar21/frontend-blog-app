import { Component, OnInit } from '@angular/core';
import { InvoicesModel } from '../invoices/models/invoices.model';
import { Observable} from 'rxjs';
import { UsersService } from 'src/app/shared/users.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { InvoiceFacade } from '../invoices/facade/invoice.facade';

@Component({
  selector: 'app-manage-invoices',
  templateUrl: './manage-invoices.component.html',
  styleUrls: ['./manage-invoices.component.scss']
})
export class ManageInvoicesComponent implements OnInit {
  allInvoices$:Observable<InvoicesModel[]>;
  searchText='';
  pdfSrc: any;
  docDefinition: any
  constructor(private user: UsersService,
  private invoiceFacade:InvoiceFacade) {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.allInvoices$ = this.invoiceFacade.invoices$;

  }
  ngOnInit(): void {
    this.invoiceFacade.fetchInvoices();
  }

  reset() {
    this.searchText = '';
  }


  generatePDF(action = 'open', invoice: InvoicesModel) {
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
                text: invoice.client.customerName,
                bold:true
              },
              { text: invoice.client.address },
              { text:invoice.client.email },
              { text: invoice.client.contactNo },
              { text: invoice.client.inputCity+' '+invoice.client.state+' '+invoice.client.inputZip,

              }

            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Bill No : ${invoice.number}`,
                alignment: 'right'
              },
              {
                text: `The invoice will be due in : ${invoice.payment_terms}`,
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
              ...invoice.products.map((p:any) => ([p.name, p.price, p.quantity, (p.price*p.quantity).toFixed(2)])),
              [{text: 'Total Amount', colSpan: 3}, {}, {}, invoice.products.reduce((sum:any, p:any)=> sum + (p.quantity * p.price), 0).toFixed(2)]
            ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
            text: invoice.additionalDetails,
            margin: [0, 0 ,0, 15]
        },
        {
          columns: [
            [{ qr: `${invoice.client.customerName}`, fit: '50' }],
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

    if (action === 'download') {
      console.log(this.docDefinition)
      pdfMake.createPdf(this.docDefinition).download();
    }
    else if (action === 'print') {
      pdfMake.createPdf(this.docDefinition).print();
    }
    else {
      console.log("hi")
      pdfMake.createPdf(this.docDefinition).open();
      pdfMake.createPdf(this.docDefinition).getBlob((blob: Blob) => {
        this.pdfSrc = URL.createObjectURL(blob);
       });
    }

  }


  deleteInvoice(invoiceId:string):void{
  //delete invoice service
    this.invoiceFacade.deleteInvoice(invoiceId)

        this.invoiceFacade.fetchInvoices()

                                             }

  markAsPaid(invoice:any):void{
  //delete invoice service
    let statusUpdated = JSON.parse(JSON.stringify(invoice));
    statusUpdated.status = 'Paid'
    this.invoiceFacade.updateInvoice(statusUpdated._id,statusUpdated)
    this.invoiceFacade.fetchInvoices()
                                             }


}
