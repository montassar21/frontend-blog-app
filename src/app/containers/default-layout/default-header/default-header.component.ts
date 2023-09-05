import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/shared/users.service';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { ProductFacade } from 'src/app/modules/products/facade/product.facade';
import { Observable } from 'rxjs';
import { ProductsModel } from 'src/app/modules/products/models/products.model';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  currentImage: any;
  allProducts$:Observable<ProductsModel[]>
  updates: number = 0;

  constructor(private classToggler: ClassToggleService,
    private auth: UsersService,
    private user: UsersService,
    private productFacade: ProductFacade) {
    super();
    this.allProducts$ = this.productFacade.products$;
  }

  async ngOnInit() {
       try {
         const userr = await this.user.getUser().toPromise();
         this.currentImage = userr.image
    console.log(this.user.getToken())
    if (this.user.getToken() != userr.token) {
      this.user.signOut()
    }
     } catch (error) {
             this.user.signOut()

    console.error('An error occurred:', error);
  }

    const subscribtion = this.allProducts$.subscribe(products => {
      this.updates = 0;
      for (let product of products) {
        if (product.quantity <= product.alert_quantity) this.updates++;
      }
    })
  }
  logout(){
    this.auth.signOut();
  }
}
