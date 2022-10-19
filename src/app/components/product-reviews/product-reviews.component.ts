import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  customerId!: number;
  productId!: number;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue!: number;

  reviewForm = new UntypedFormGroup({
    rating: new UntypedFormControl(''),
    comments: new UntypedFormControl(''),
  })

  constructor(private productReviewsService: ProductReviewsService,
    private route: ActivatedRoute, private router: Router) {
    
  }
  @Input() productInfo!: Product;

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      (this.getProductReviewsByProductId(params['id']))
      );
      this.route.params.subscribe(params =>
        (this.getProductIdInParams(params['id']))
        );  
  }

  countStar(star: number){
    this.selectedValue = star;
    console.log('Value of star', star);
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
        console.log("No exisiting reviews from database");
      }
    );
  }

  public getProductIdInParams(id: number){
     this.route.params.subscribe(params =>
      (this.getProductReviewsByProductId(params['id']))
      );

  }
  public addAProductReview(): void{
    let auth = localStorage.getItem('ArbId');
    if (!auth) auth = '';
    this.customerId = parseInt(auth);
    this.getProductIdInParams(this.productId);
    let rating = this.selectedValue;
    console.log()
    this.productReviewsService.addReview(this.productInfo.productId, this.customerId, rating, this.reviewForm.get('comments')?.value).subscribe(
      (response: ProductReview) =>{
        this.productReview = response;
        console.log(response);
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      },
      () => {}
    );

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/api/product/' + this.productInfo.productId]);
  }); 
  }
}
