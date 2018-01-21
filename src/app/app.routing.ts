import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterPageComponent } from './shared/masterpage/master.component';

export const routes: Routes = [
  {
  path: '',
  redirectTo: 'shop',
  pathMatch: 'full',
},
{
  path: '',
  component: MasterPageComponent,
  data: {
    title: 'ProductList'
  },
  children: [
    {
      path: '',
      loadChildren: './products/product.module#ProductModule',
    }
  ]
}]

@NgModule({
     imports: [ RouterModule.forRoot(routes)],
     exports: [ RouterModule ]
   })
   export class AppRoutingModule {}