import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductReview } from '../models/product-review';


// interface ProductReview{
//   reviewId: number;
//   customerId: number;
//   productId: number;
//   rating: number;
//   productComments: string;
// }



@Injectable({
  providedIn: 'root'
})
export class ProductReviewsService {
  private apiServerUrl: string = `${environment.baseUrl}/api/review`;
  

  constructor(private http:HttpClient) { }

  public getMyProductReviews(customerId: number): Observable<ProductReview[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("customerId",customerId);
    return this.http.get<ProductReview[]>(`${this.apiServerUrl}/me`, {params: queryParams});
  }

  public getProductReviewsByReviewId(reviewId: number): Observable<ProductReview[]>{
    return this.http.get<ProductReview[]>(`${this.apiServerUrl}/`+reviewId);
  }

  public getProductReviewsByProductId(productId: number): Observable<ProductReview[]>{
    return this.http.get<ProductReview[]>(`${this.apiServerUrl}/view/`+productId);
  }

  public addReview(productId: number, customerId: number, rating: number, comments: string): Observable<ProductReview>{
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append("rating", rating);
    // queryParams = queryParams.append("comments", comments);
    const payload = {product_id: productId, customer_id: customerId, rating: rating, comment: comments};
    return this.http.put<ProductReview>(`${this.apiServerUrl}/add`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }
}
