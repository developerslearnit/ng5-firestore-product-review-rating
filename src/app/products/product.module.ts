import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component.';
import { ProductRoutingModule } from './product.routing.module';
import { ProductService } from '../shared/services/product.service';
import { SingleComponent } from './single.component';



@NgModule({
  imports: [
    CommonModule ,
    FormsModule,
    ProductRoutingModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [ProductListComponent,SingleComponent],
  providers: [
    ProductService
  ],
})
export class ProductModule { }
