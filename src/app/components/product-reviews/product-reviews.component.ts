import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private ProductReviewsService: ProductReviewsService,
    private productService: ProductService) {
    
  }
  @Input() productInfo!: Product;

  ngOnInit(): void {
    //this.getMyProductReviews(3);
    //this.getProductReviewsByReviewId(4);
    //this.getProductReviewsByProductId(2);
    //this.subscription = this.productService.getSingleProduct().
  }

  public getMyProductReviews(customerId: number): void {
    this.ProductReviewsService.getMyProductReviews(customerId).subscribe(
      (response: ProductReview[]) =>{
        this.productReviewsList = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public getProductReviewsByReviewId(reviewId: number): void{
    this.ProductReviewsService.getProductReviewsByReviewId(reviewId).subscribe(
      (response: ProductReview[]) =>{
        this.productReviewsList = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public getProductReviewsByProductId(productId: number): void{
    this.ProductReviewsService.getProductReviewsByProductId(productId).subscribe(
      (response: ProductReview[]) =>{
        this.productReviewsList = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
}
