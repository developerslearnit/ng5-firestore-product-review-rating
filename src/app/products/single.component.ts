import { ProductReview } from './../shared/models/product-review';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../shared/models/product';
import { FormControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';


@Component({

     templateUrl: 'single.component.html'
})

export class SingleComponent implements OnInit {
     product: Product;
     reviewFormGroup: FormGroup;
     reviews: Array<ProductReview>;
     selectedProductId: string;
     productLoaded: boolean = false;
     ratings: Observable<any>;
     avgRating: Observable<any>;
     constructor(private route: ActivatedRoute, private productService: ProductService,
          private fb: FormBuilder) {
          this.selectedProductId = this.route.snapshot.params.productid;
          this.initializeForm();
     }

     ngOnInit() {

          this.productService.getSingleProduct(this.selectedProductId).subscribe((data) => {
               this.product = data;
               this.productLoaded = true;
          });
          this.getReviews();
     }

     getReviews() {
          this.productService.getProductReviews(this.selectedProductId).subscribe((data) => {
               this.reviews = data;
          });
     }

     initializeForm() {
          this.reviewFormGroup = this.fb.group({
               username: ['', Validators.required],
               summary: ['', Validators.required],
               review: ['', Validators.required],
               productId: [this.selectedProductId]
          });
     }

     submitReview() {
          let body: ProductReview = this.reviewFormGroup.value;
          this.productService.postReview(body);
          this.initializeForm();
     }

     rateProduct(val) {

          this.productService.postRating({
               productId: this.selectedProductId,
               ratingValue: val
          });

          this.productService.getProductRating(this.selectedProductId).subscribe((retVal) => {
              const ratings = retVal.map(v => v.ratingValue);
               let avRating = (ratings.length ? ratings.reduce((total, val) => total + val) / retVal.length : 0);

               this.productService.setProductRating(this.selectedProductId,avRating.toFixed(1));
          });



     }


     getAvRating() {




     }
}