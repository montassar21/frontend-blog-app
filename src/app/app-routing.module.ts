import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { RegisterComponent } from './views/pages/register/register.component';
import { LoginComponent } from './views/pages/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { ProfileComponent } from './modules/profile/profile.component';
import { UploadUserImageComponent } from './modules/profile/upload-user-image/upload-user-image.component';
import { HomeComponent } from './views/pages/home/home.component';
import { ManagePostsComponent } from './modules/manage-posts/manage-posts.component';
import { PostsComponent } from './modules/posts/posts.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/Acceuil',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Dashboard',
    },
    children: [
      {
        path: 'posts',
        component: PostsComponent,
        data: {
          title: 'Posts',
        },
        canActivate: [AuthGuard],
      },

      {
        path: 'manage-posts',
        component: ManagePostsComponent,
        data: {
          title: 'Manage Posts',
        },
        canActivate: [AuthGuard],
      },

      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Profile',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'upload-user-image',
        component: UploadUserImageComponent,
        data: {
          title: 'upload-user-image',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  {
    path: 'Acceuil',
    component: HomeComponent,
    data: {
      title: 'Home Page',
    },
  },
  {
    path: 'dashboards',
    component: DashboardComponent,
    data: {
      title: 'dashboard',
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
