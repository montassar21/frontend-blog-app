import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageInvoicesComponent } from './manage-invoices.component'


const routes: Routes = [
  {
    path: 'manage-invoices',
    data: {
      title: 'Manage Invoices',
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
