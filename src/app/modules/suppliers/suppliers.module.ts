import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierService } from './services/supplier.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  providers: [SupplierService]
})
export class SuppliersModule { }
