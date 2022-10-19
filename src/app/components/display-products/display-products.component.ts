import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService, Cart } from 'src/app/services/product.service';
import { Subscription, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css'],
})
export class DisplayProductsComponent implements OnInit {
  allProducts!: Product[];

  cartId!: number;
  cartCount!: number;
  cartProducts!: Cart[];

  subscription!: Subscription;

  constructor(private productService: ProductService) {}

  message!: number;

  count!: number;

  receiveMessage($event: number) {
    this.receiveCount;
    this.message = this.count + $event;
    console.log(this.message);
  }

  receiveCount($event: number) {
    this.count = $event;
  }

  ngOnInit(): void {
    this.getProductList();

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
      console.log('No cart');
    }
  }
  public getProductList(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.allProducts = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      },
      () => console.log('Products Retrieved')
    );
  }
  searchProducts(key: string): void {
    console.log(key);
    const results: Product[] = [];
    for (const product of this.allProducts) {
      if (product.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(product);
        //this.subject.next();
        console.log(product);
      }
    }
    this.allProducts = results;
    if (results.length === 0 || !key) {
      this.getProductList();
    }
  }
}
