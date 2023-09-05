import { Component, OnInit } from '@angular/core';
import { EntityCollectionServiceFactory,EntityCollectionService } from '@ngrx/data';
import { DeliverersModel } from './models/deliverers.model';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { UsersService } from 'src/app/shared/users.service';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../../shared/image.service'
import { DelivererFacade } from './facade/deliverer.facade';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var window:any;
@Component({
  selector: 'app-deliverers',
  templateUrl: './deliverers.component.html',
  styleUrls: ['./deliverers.component.scss']
})
export class DeliverersComponent implements OnInit {
  allDeliverers$: Observable<DeliverersModel[]>;
  delivererModal!: any;
  delivererModalTitle!: string;
  delivererForm: DeliverersModel = {
    _id:'',
    name: '',
    address: '',
    email: '',
    contact: 0,
    owner:''
                        };

  constructor(
    private dialog : MatDialog,
    private fb:FormBuilder,
    private user:UsersService,
    private delivererFacade: DelivererFacade,
    private _snackBar: MatSnackBar,

  )
    {
    // select deliverers from state
    this.allDeliverers$ = this.delivererFacade.deliverers$;
    }

  ngOnInit(): void {

      //Open the modal
      this.delivererModal=new window.bootstrap.Modal(document.getElementById('deliverersModal'),{Keyboard: false});

      // dispatch fetch action through facade
       this.delivererFacade.fetchDeliverers();
     }

    // I used this function to generate a random string id and use it as a primary key of a deliverer.
        formatToObjectId(str: string): string {
          const objectIdArray = [];

          for (let i = 0; i < str.length; i += 2) {
            objectIdArray.push(parseInt(str.substr(i, 2), 36));
          }
           return objectIdArray.join('');
                                          }

    // This function is responsible for the opening of the Modal, it takes a string as an input if this this string is empty
    // the fields of the modal are empty otherwise we get the details of deliverer to be updated.
    openDelivererModal(id:string){
      if (id == '') {
        this.delivererModalTitle='Add A New Deliverer';
        this.delivererForm={
           _id:'',
           name: '',
           address: '',
           email: '',
           contact: 0,
           owner:''   }
             }
      else {
        this.delivererModalTitle='Edit Deliverer';
        this.delivererFacade.deliverers$.subscribe(p=>{
          let delivererToUpdate = p.filter(
            m=>m._id==id)[0];
          this.delivererForm={...delivererToUpdate}
        })
        }
      this.delivererModal.show();
    }

    // A funtion to add a new deliverer or update a given deliverer
  saveorupdate(): void{

      if(this.delivererForm._id=='' ){
          const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
          const length = 24; // Length of the random string
          let result = '';
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
                                      }

        //Format the random string to ObjectId-like format
         this.delivererForm._id = this.formatToObjectId(result)

        // dispatch create deliverer action through facade
        this.delivererFacade.createDeliverer(this.delivererForm);

        // dispatch fetch action through facade
        this.delivererFacade.fetchDeliverers();

        this.delivererModal.hide();

        this._snackBar.open('Deliverer Created successfully!', 'Close', {
        duration: 3000 // Duration in milliseconds
    });
      }

      else {

       // dispatch create deliverer action through facade
        this.delivererFacade.updateDeliverer(this.delivererForm._id,this.delivererForm);

        // dispatch fetch action through facade
        this.delivererFacade.fetchDeliverers();

        this.delivererModal.hide();

        this._snackBar.open('Deliverer Updated successfully!', 'Close', {
        duration: 3000 // Duration in milliseconds
    });

        }
}

  deleteDeliverer(delivererIdToDelete:string):void{
      //dispatch delete deliverer action
      this.delivererFacade.deleteDeliverer(delivererIdToDelete);

      // dispatch fetch action through facade
      this.delivererFacade.fetchDeliverers();

    this.delivererModal.hide();

      this._snackBar.open('Deliverer Deleted successfully!', 'Close', {
        duration: 3000 // Duration in milliseconds
    });
                                             }



}
