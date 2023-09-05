import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from './services/invoice.service';
import { FormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  providers:[InvoiceService]
})
export class InvoicesModule { }
