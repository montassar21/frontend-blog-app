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
import {JwtInterceptor} from '../app/shared/jwt.interceptor'
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ProfileComponent } from './modules/profile/profile.component';
import { UploadUserImageComponent } from './modules/profile/upload-user-image/upload-user-image.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // For toast notifications
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { ManagePostsComponent } from './modules/manage-posts/manage-posts.component';
const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ProfileComponent,
    UploadUserImageComponent,
    PostsComponent,
    ManagePostsComponent,
  ],
  imports: [

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
