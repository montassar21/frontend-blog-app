import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadUserImageComponent } from './upload-user-image.component'


const routes: Routes = [
  {
    path: 'upload-user-image',
    data: {
      title: 'Upload User Image',
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
