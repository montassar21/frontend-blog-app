import { ObserversModule } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsModel } from '../products/models/products.model';
import { ProductFacade } from '../products/facade/product.facade';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {
allProducts$:Observable<ProductsModel[]>
constructor(private productFacade:ProductFacade){
  this.allProducts$ = this.productFacade.products$;
}
  ngOnInit(): void {
    this.productFacade.fetchProducts();
    
  }


}
