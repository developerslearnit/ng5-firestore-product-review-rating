import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import { ProductReview } from '../models/product-review';
import { ProductRating } from '../models/rating';

@Injectable()
export class ProductService {
     products: AngularFirestoreCollection<Product[]>;
     product: Product;

     constructor(private fs: AngularFirestore) { }


     getProducts() {
          return this.fs.collection("products").snapshotChanges().map(actions => {
               return actions.map(a => {
                    const data = a.payload.doc.data() as Product;
                    data.id = a.payload.doc.id;
                    data.avRating = data.avRating/5*100;
                    data.slug = data.name.toLowerCase().replace('/\s/g', '-').replace(' ', '-');
                    return data;
               });
          });
     }



     getSingleProduct(productId) {
          var docPath = `products/${productId}`;
          return this.fs.doc(docPath).snapshotChanges().map((actions) => {
               const data = actions.payload.data() as Product;
               data.avRating = data.avRating/5*100;
               data.id = actions.payload.id;
               return data;
          });
     }

     getProductReviews(productId) {

          return this.fs.collection("reviews", ref => ref.where('productId', '==', productId)).snapshotChanges().map(actions => {
               return actions.map(a => {
                    const data = a.payload.doc.data() as ProductReview;
                    return data;
               });
          })
     }

     postReview(comment: ProductReview) {
          this.fs.collection("reviews").add({
               username: comment.username,
               summary: comment.summary,
               review: comment.review,
               productId: comment.productId
          });
     }

     postRating(rating: ProductRating) {
          this.fs.collection("ratings").add({
               productId: rating.productId,
               ratingValue: rating.ratingValue
          });
     }

     getProductRating(productId) {

          return this.fs.collection("ratings", ref => ref.where('productId', '==', productId)).snapshotChanges().map(actions => {
               return actions.map(a => {
                    const data = a.payload.doc.data() as ProductRating;
                    return data;
               });
          })
     }

     setProductRating(productId, rating) {
          var docPath = `products/${productId}`;
          let productDoc = this.fs.doc(docPath);
          productDoc.update({ avRating: rating });
     }
}