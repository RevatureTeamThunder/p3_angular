import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService: ProductService, 
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      (this.getProductById(params['id']))
      );
  }

  @Input() productInfo!: Product;
  product!: Product;

  getProductById(id: number){
    this.productService.getSingleProduct(id).subscribe(
      (resp) => this.product = resp),
      (error: HttpErrorResponse) =>{
        alert(error.message);
    }
  }
}
