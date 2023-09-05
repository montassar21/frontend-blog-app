import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { LoginComponent } from './views/pages/login/login.component';
import {AuthGuard} from './shared/auth.guard'
import { ProductsComponent } from './modules/products/products.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { ClientsComponent } from './modules/clients/clients.component';
import { InvoicesComponent } from './modules/invoices/invoices.component';
import { UpdatesComponent } from './modules/updates/updates.component';
import { SuppliersComponent } from './modules/suppliers/suppliers.component';
import { ManageInvoicesComponent } from './modules/manage-invoices/manage-invoices.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { UploadUserImageComponent } from './modules/profile/upload-user-image/upload-user-image.component';
import { DeliverersComponent } from './modules/deliverers/deliverers.component';
import { HomeComponent } from './views/pages/home/home.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/Acceuil',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
     {
        path:'products',
    component: ProductsComponent,
    data: {
          title:'Products'
        },
    canActivate:[AuthGuard]
      },
 {
        path:'orders',
    component: OrdersComponent,
    data: {
          title:'Orders'
    }
    ,canActivate:[AuthGuard]
      },
       {
        path:'clients',
    component: ClientsComponent,
    data: {
          title:'Clients'
        },canActivate:[AuthGuard]
      },
      {
        path:'invoices',
    component: InvoicesComponent,
    data: {
          title:'Create invoice'
    }
    ,canActivate:[AuthGuard]
      },
       {
        path:'suppliers',
    component:SuppliersComponent,
    data: {
          title:'Suppliers'
    }
    ,canActivate:[AuthGuard]
      },
       {
        path:'deliverers',
    component:DeliverersComponent,
    data: {
          title:'Deliverers'
    }
    ,canActivate:[AuthGuard]
      },
 {
        path:'updates',
    component:UpdatesComponent,
    data: {
          title:'Updates'
    }
    ,canActivate:[AuthGuard]
      },
       {
        path: 'manage-invoices',
        component: ManageInvoicesComponent,
        data: {
          title: 'Manage Invoices',
        }
        ,canActivate:[AuthGuard]
      },
        {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'Profile',
    }
    ,canActivate:[AuthGuard]
      },
          {
          path: 'upload-user-image',
          component: UploadUserImageComponent,
          data: {
            title: 'upload-user-image',
          }
          ,canActivate:[AuthGuard]
        },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),canActivate:[AuthGuard]
      },
      // {
      //   path: 'theme',
      //   loadChildren: () =>
      //     import('./views/theme/theme.module').then((m) => m.ThemeModule)
      // },
      // {
      //   path: 'product',
      //   loadChildren: () =>
      //     import('./views/product/product.module').then((m) => m.ProductModule)
      // },
      // {
      //   path: 'base',
      //   loadChildren: () =>
      //     import('./views/base/base.module').then((m) => m.BaseModule)
      // },
      // {
      //   path: 'buttons',
      //   loadChildren: () =>
      //     import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      // },
      // {
      //   path: 'forms',
      //   loadChildren: () =>
      //     import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      // },
      // {
      //   path: 'charts',
      //   loadChildren: () =>
      //     import('./views/charts/charts.module').then((m) => m.ChartsModule)
      // },
      // {
      //   path: 'icons',
      //   loadChildren: () =>
      //     import('./views/icons/icons.module').then((m) => m.IconsModule)
      // },
      // {
      //   path: 'notifications',
      //   loadChildren: () =>
      //     import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      // },
      // {
      //   path: 'widgets',
      //   loadChildren: () =>
      //     import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      // },
      // {
      //   path: 'pages',
      //   loadChildren: () =>
      //     import('./views/pages/pages.module').then((m) => m.PagesModule)
      // },
    ],canActivate:[AuthGuard]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
   {
    path: 'Acceuil',
    component: HomeComponent,
    data: {
      title: 'Home Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

