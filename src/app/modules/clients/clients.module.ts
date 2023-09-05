import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientService} from '../clients/services/client.service'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
    providers:[ClientService]

})
export class ClientsModule { }
