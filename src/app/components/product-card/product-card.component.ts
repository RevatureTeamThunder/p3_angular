import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Cart } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  // cartCount!: number;
  //  products: {
  //    product: Product
  //    quantity: number
  //  }[] = [];
  stars: number[] = [1, 2, 3, 4, 5];
  starRating!: number;

  @Input() subscription!: Subscription;

  totalPrice: number = 0;

  @Input() cartId!: number;

  @Input() cartProducts!: Cart[];

  @Input() productInfo!: Product;

  message: number = 0;

  @Output() messageEvent = new EventEmitter<number>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.countStar();
  }

  sendMessage() {
    this.messageEvent.emit(this.message);
  }

  addToCart(product: Product, qty: string): void {
    console.log(this.cartProducts);
    let inCart = false;

    if (this.cartProducts) {
      this.cartProducts.forEach((element) => {
        if (element.productId == product.productId) {
          this.productService
            .setCart(
              this.cartId,
              product.productId,
              element.quantity + Number(qty)
            )
            .subscribe(
              (resp) => console.log(resp),
              (err) => this.handleNoCartError(err)
            );
          this.message = Number(qty);
          inCart = true;
        }
      });
    }
    if (inCart == false) {
      this.productService
        .addNewProductToCart(this.cartId, product.productId, Number(qty))
        .subscribe(
          (resp) => console.log(resp),
          (err) => this.handleNoCartError(err)
        );
      this.message = Number(qty);
    }

    this.sendMessage();
  }

  countStar() {
    //this.selectedValue = star;
    this.starRating = this.productInfo.rating;
    console.log('Value of star', this.starRating);
  }

  private handleNoCartError(error: HttpErrorResponse) {
    console.log('ints an error');
    let auth = localStorage.getItem('ArbId');
    if (!auth) auth = '';

    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      if (error.status === 500) console.log('error status 500');
      this.productService.createCart(parseInt(auth));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
