import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';


@Component({
     templateUrl: 'product-list.component.html'
})

export class ProductListComponent implements OnInit {
     products: any;

     constructor(private productService: ProductService) { }

     ngOnInit() {
          this.getProducts();
     }



     getProducts() {
          //this.productService.getProducts();
          this.productService.getProducts().subscribe((data) => {
               this.products = data;

          });
     }


}