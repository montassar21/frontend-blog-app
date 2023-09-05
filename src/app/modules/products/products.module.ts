import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  providers: [ProductService]
})
export class ProductsModule { }
