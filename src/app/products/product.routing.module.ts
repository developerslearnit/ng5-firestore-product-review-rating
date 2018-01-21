import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component.';
import { SingleComponent } from './single.component';



const routes: Routes = [
  {
    path: '',    
    children:[
      {
        path:'shop',
        component: ProductListComponent,
      },
      {
        path:'product/:productid/:productname',
        component:SingleComponent
        
      }
    ]
    // data:{
    //   title:'Product List'
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }

// export const routedComponents = [ProductListComponent];

