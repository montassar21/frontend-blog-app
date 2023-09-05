import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliverersComponent } from '../deliverers.component'
import { DelivererService } from '../services/deliverer.service';


const routes: Routes = [
  {
    path: 'deliverers',
    data: {
      title: 'Deliverers',
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
