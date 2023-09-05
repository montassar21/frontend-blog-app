import { Component, OnInit } from '@angular/core';
import { EntityCollectionServiceFactory,EntityCollectionService } from '@ngrx/data';
import { SuppliersModel } from './models/suppliers.model';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { UsersService } from 'src/app/shared/users.service';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../../shared/image.service'
import { SupplierFacade } from './facade/supplier.facade';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var window:any;
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  allSuppliers$: Observable<SuppliersModel[]>;
  supplierModal!: any;
  supplierModalTitle!: string;
  supplierForm: SuppliersModel = {
    _id:'',
    name: '',
    address: '',
    email: '',
    contact: 0,
    service:'',
    owner:''
                        };

  constructor(
    private dialog : MatDialog,
    private fb:FormBuilder,
    private user:UsersService,
    private supplierFacade: SupplierFacade,
    private _snackBar: MatSnackBar,

  )
    {
    // select suppliers from state
    this.allSuppliers$ = this.supplierFacade.suppliers$;
    }

  ngOnInit(): void {

      //Open the modal
      this.supplierModal=new window.bootstrap.Modal(document.getElementById('suppliersModal'),{Keyboard: false});

      // dispatch fetch action through facade
       this.supplierFacade.fetchSuppliers();
     }

    // I used this function to generate a random string id and use it as a primary key of a supplier.
        formatToObjectId(str: string): string {
          const objectIdArray = [];

          for (let i = 0; i < str.length; i += 2) {
            objectIdArray.push(parseInt(str.substr(i, 2), 36));
          }
           return objectIdArray.join('');
                                          }

    // This function is responsible for the opening of the Modal, it takes a string as an input if this this string is empty
    // the fields of the modal are empty otherwise we get the details of supplier to be updated.
    openSupplierModal(id:string){
      if (id == '') {
        this.supplierModalTitle='Add A New Supplier';
        this.supplierForm={
           _id:'',
           name: '',
           address: '',
           email: '',
           contact: 0,
           service:'',
           owner:''   }
             }
      else {
        this.supplierModalTitle='Edit Supplier';
        this.supplierFacade.suppliers$.subscribe(p=>{
          let supplierToUpdate = p.filter(
            m=>m._id==id)[0];
          this.supplierForm={...supplierToUpdate}
        })
        }
      this.supplierModal.show();
    }

    // A funtion to add a new supplier or update a given supplier
  saveorupdate(): void{

      if(this.supplierForm._id=='' ){
          const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
          const length = 24; // Length of the random string
          let result = '';
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
                                      }

        //Format the random string to ObjectId-like format
         this.supplierForm._id = this.formatToObjectId(result)

        // dispatch create supplier action through facade
        this.supplierFacade.createSupplier(this.supplierForm);

        // dispatch fetch action through facade
        this.supplierFacade.fetchSuppliers();

        this.supplierModal.hide();

        this._snackBar.open('Supplier Created successfully!', 'Close', {
        duration: 3000 // Duration in milliseconds
    });
      }

      else {

       // dispatch create supplier action through facade
        this.supplierFacade.updateSupplier(this.supplierForm._id,this.supplierForm);

        // dispatch fetch action through facade
        this.supplierFacade.fetchSuppliers();

        this.supplierModal.hide();

        this._snackBar.open('Supplier Updated successfully!', 'Close', {
        duration: 3000 // Duration in milliseconds
    });

        }
}

  deleteSupplier(supplierIdToDelete:string):void{
      //dispatch delete supplier action
      this.supplierFacade.deleteSupplier(supplierIdToDelete);

      // dispatch fetch action through facade
      this.supplierFacade.fetchSuppliers();

    this.supplierModal.hide();

      this._snackBar.open('Supplier Deleted successfully!', 'Close', {
        duration: 3000 // Duration in milliseconds
    });
                                             }



}
