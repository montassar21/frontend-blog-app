import { Component, OnInit } from '@angular/core';
import { EntityCollectionServiceFactory,EntityCollectionService } from '@ngrx/data';
import { ProductsModel } from './models/products.model';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { UsersService } from 'src/app/shared/users.service';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../../shared/image.service'
import { ProductFacade } from './facade/product.facade';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var window:any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  allProducts$: Observable<ProductsModel[]>;
  productModal!: any;
  productModalTitle!: string;
  productForm: ProductsModel={
    name: '',
     image:'',
    category: '',
    brand: '',
    quantity: 0,
    code: '',
    cost: 0,
    price: 0,
    unit: '',
    alert_quantity: 0,
    _id: '',
    owner:'',
    //exp_date:date
                        };
   toId!:any;
   selectedFile!: File;
   displayedImageUrl!: string;
  photoUrl!: string;

  constructor(
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private user:UsersService,
    private imageService: ImageService,
    private productFacade: ProductFacade
  )
    {
    // select products from state
    this.allProducts$ = this.productFacade.products$;
    }

  ngOnInit(): void {
      //Get user Token
      this.toId = this.user.getToken();

      //Open the modal
      this.productModal=new window.bootstrap.Modal(document.getElementById('productsModal'),{Keyboard: false});

      // dispatch fetch action through facade
       this.productFacade.fetchProducts();
     }

    // I used this function to generate a random string id and use it as a primary key of a product.
        formatToObjectId(str: string): string {
          const objectIdArray = [];

          for (let i = 0; i < str.length; i += 2) {
            objectIdArray.push(parseInt(str.substr(i, 2), 36));
          }
           return objectIdArray.join('');
                                          }

    // This function is responsible for the opening of the Modal, it takes a string as an input if this this string is empty
    // the fields of the modal are empty otherwise we get the details of product to be updated.
    openProductModal(id:string){
      if (id == '') {
        this.productModalTitle='Add A New Product';
        this.productForm={
          name: '',
          image:'',
          category: '',
          brand: '',
          quantity: 0,
          code: '',
          cost: 0,
          price: 0,
          unit: '',
          alert_quantity: 0,
          _id: '',
          owner:''   }
             }
      else {
        this.productModalTitle='Edit Product';
        this.productFacade.products$.subscribe(p=>{
          let productToUpdate = p.filter(
            m=>m._id==id)[0];
          this.productForm={...productToUpdate}
        })
        }
      this.productModal.show();
    }

    // A funtion to add a new product or update a given product
  saveorupdate(): void{

      if(this.productForm._id=='' ){
          this.productForm.image=this.selectedFile.name;
          const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          const length = 24; // Length of the random string
          let result = '';
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
                                      }

        //Format the random string to ObjectId-like format
         this.productForm._id = this.formatToObjectId(result)

        // dispatch create product action through facade
        this.productFacade.createProduct(this.productForm);

        // dispatch fetch action through facade
        this.productFacade.fetchProducts();

        this.productModal.hide();

        this._snackBar.open('Product Created !', 'Close', {
        duration: 3000 // Duration in milliseconds
    });


      }

      else {

       // dispatch create product action through facade
        this.productFacade.updateProduct(this.productForm._id,this.productForm);

        // dispatch fetch action through facade
        this.productFacade.fetchProducts();

        this.productModal.hide();

         this._snackBar.open('Product Updated !', 'Close', {
        duration: 3000 // Duration in milliseconds
    });
        }
}

  deleteProduct(productIdToDelete:string):void{
      //dispatch delete product action
      this.productFacade.deleteProduct(productIdToDelete);

      // dispatch fetch action through facade
      this.productFacade.fetchProducts();

    this.productModal.hide();

     this._snackBar.open('Product Deleted !', 'Close', {
        duration: 3000 // Duration in milliseconds
    });
                                             }


    onFileSelected(event: any): void {
       this.selectedFile = event.target.files[0];
                                   }

    async uploadImage() {
         if (this.selectedFile) {
           this.imageService.uploadImage(this.selectedFile).subscribe(res => {
            console.log('Image uploaded successfully', res);
             this.productForm.image = this.selectedFile.name;
              this._snackBar.open('Image uploaded successfully !', 'Close', {
        duration: 3000 // Duration in milliseconds
    });
            }, error => {
            console.error('Image upload failed', error);
          });
                   }
            }

}
