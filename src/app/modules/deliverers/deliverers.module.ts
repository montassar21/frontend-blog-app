import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelivererService } from './services/deliverer.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  providers:[DelivererService]
})
export class DeliverersModule { }
