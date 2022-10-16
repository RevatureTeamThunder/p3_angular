import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductReview } from 'src/app/models/product-review';
import { ProductReviewsService } from 'src/app/services/product-review.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})
export class ProductReviewsComponent implements OnInit {
  productReviewsList!: ProductReview[];
  productReview!: ProductReview;
  // singleProduct: Product;
  // subscription: Subscription;
  constructor(private productReviewsService: ProductReviewsService,
    private route: ActivatedRoute) {
    
  }
  @Input() productInfo!: Product;

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      (this.getProductReviewsByProductId(params['id']))
      );
  }

  public getMyProductReviews(customerId: number): void {
    this.productReviewsService.getMyProductReviews(customerId).subscribe(
      (response: ProductReview[]) =>{
        this.productReviewsList = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public getProductReviewsByReviewId(reviewId: number): void{
    this.productReviewsService.getProductReviewsByReviewId(reviewId).subscribe(
      (response: ProductReview[]) =>{
        this.productReviewsList = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public getProductReviewsByProductId(productId: number): void{
    this.productReviewsService.getProductReviewsByProductId(productId).subscribe(
      (response: ProductReview[]) =>{
        this.productReviewsList = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public addAProductReview(productId: number, customerId: number, rating: number, comments: string): void{
    this.productReviewsService.addReview(productId, customerId, rating, comments).subscribe(
      (response: ProductReview) =>{
        this.productReview = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }
}
