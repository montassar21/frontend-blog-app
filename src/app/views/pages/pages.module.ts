import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {JwtInterceptor} from '../../shared/jwt.interceptor';
import { HomeComponent } from './home/home.component'
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [LoginComponent, RegisterComponent,HomeComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
  ],
})
export class PagesModule {}
