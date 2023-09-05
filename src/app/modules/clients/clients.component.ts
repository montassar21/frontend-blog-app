import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { ClientsModel } from './models/clients.model';
import { UsersService } from 'src/app/shared/users.service';
import { ClientFacade } from './facade/client.facade';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  allClients$: Observable<ClientsModel[]>;
  refreshClients = new BehaviorSubject<boolean>(true);
  toId:any;
  constructor(private user: UsersService,
    private clientFacade: ClientFacade
){
    this.allClients$=this.clientFacade.clients$;
  }


  ngOnInit(): void {
    this.toId = this.user.getToken();
    this.clientFacade.fetchClients();

  }


  deleteProduct(clientIdToDelete:string):void{
    //delete product service
      this.clientFacade.deleteClient(clientIdToDelete);

      // dispatch fetch action through facade
      this.clientFacade.fetchClients();
    // this.toast.success({detail:"SUCCESS",summary:"Product Deleted Succesfully !",duration:5000});
                                      }


}
