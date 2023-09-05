import { NgModule, isDevMode } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule
} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { UsersService } from './shared/users.service';
import { PagesModule } from './views/pages/pages.module';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule, HttpUrlGenerator } from '@ngrx/data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgToastModule } from 'ng-angular-popup';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ClientsModule } from './modules/clients/clients.module';
import {JwtInterceptor} from '../app/shared/jwt.interceptor'
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { OrderEffects } from './modules/orders/effects/order.effect';
import { ProductEffects } from './modules/products/effects/product.effect';
import { ClientEffects } from './modules/clients/effects/client.effect';
import { InvoiceEffects } from './modules/invoices/effects/invoice.effect';
import { SupplierEffects } from './modules/suppliers/effects/supplier.effect';

import { centralReducer } from './ngrx/reducers/app.reducers';
import { ProductsComponent } from './modules/products/products.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { OrdersComponent } from './modules/orders/orders.component';
import { ClientsComponent } from './modules/clients/clients.component';
import { InvoicesComponent } from './modules/invoices/invoices.component';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { UpdatesModule } from './modules/updates/updates.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { UpdatesComponent } from './modules/updates/updates.component';
import { SuppliersComponent } from './modules/suppliers/suppliers.component';
import { ManageInvoicesComponent } from './modules/manage-invoices/manage-invoices.component';
import { SearchPipe } from './modules/manage-invoices/search.pipe';
import { ProfileComponent } from './modules/profile/profile.component';
import { UploadUserImageComponent } from './modules/profile/upload-user-image/upload-user-image.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // For toast notifications
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeliverersComponent } from './modules/deliverers/deliverers.component';
import { DeliverersModule } from './modules/deliverers/deliverers.module';
import {DelivererEffects} from './modules/deliverers/effects/deliverer.effect'
const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ProductsComponent,
    OrdersComponent,
    ClientsComponent,
    InvoicesComponent,
    UpdatesComponent,
    SuppliersComponent,
    ManageInvoicesComponent,
    SearchPipe,
    ProfileComponent,
    UploadUserImageComponent,
    DeliverersComponent,
  ],
  imports: [
    ProductsModule,
    OrdersModule,
    ClientsModule,
    InvoicesModule,
    UpdatesModule,
    SuppliersModule,
    DeliverersModule,
    BrowserModule,
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    FormsModule,
    NgScrollbarModule,
   HttpClientModule,
   StoreModule.forRoot(centralReducer),
   EffectsModule.forRoot([ProductEffects,OrderEffects,ClientEffects,InvoiceEffects,SupplierEffects,DelivererEffects]),
   EntityDataModule.forRoot({}),
   StoreDevtoolsModule.instrument(
    { maxAge: 25,
    logOnly:false,
       autoPause: true,
     }),
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  exports: [CommonModule,FormsModule, ReactiveFormsModule],

  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,

    },

      JwtHelperService,

      {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},
    {
     provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi :true
    },

    IconSetService,
    Title,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
