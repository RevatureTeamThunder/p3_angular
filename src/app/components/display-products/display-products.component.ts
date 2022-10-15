import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService, Cart } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css'],
})
export class DisplayProductsComponent implements OnInit {
  allProducts: Product[] = [];

  cartId!: number;

  cartProducts!: Cart[];

  subscription!: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (resp) => (this.allProducts = resp),
      (err) => console.log(err),
      () => console.log('Products Retrieved')
    );

    let auth = localStorage.getItem('ArbId');
    if (!auth) auth = '';
    this.subscription = this.productService.getCart(parseInt(auth)).subscribe(
      (cart) => {
        this.cartProducts = cart;
      },
      (error) => this.handleNoCartError(error)
    );

    this.subscription = this.productService.getCartId(parseInt(auth)).subscribe(
      (cart) => {
        this.cartId = cart.cartId;
      },
      (error) => this.handleNoCartError(error)
    );
  }

  private handleNoCartError(error: HttpErrorResponse) {

    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      if (error.status === 500) console.log('error status 500');
        console.log("No cart")
    }
  }
}
