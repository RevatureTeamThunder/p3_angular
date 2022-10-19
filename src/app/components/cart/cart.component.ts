import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService, Cart } from 'src/app/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartId!: number;
  customerId!: number;
  totalPrice: number = 0;
  cartProducts: Product[] = [];

  allCartProducts: Cart[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    let auth = localStorage.getItem('ArbId');
    if (!auth) auth = '';
    this.customerId = parseInt(auth);
    this.productService.getCart(parseInt(auth)).subscribe(
      (resp) => {
        (this.allCartProducts = resp),
          this.allCartProducts.forEach(
            (element) => (this.totalPrice += element.totalCost)
          ),
          (this.cartId = resp[0].cartId),
          () => console.log('Products Retrieved');
      },
      (error) => this.handleNoCartError(error)
    );
  }

  emptyCart(): void {
    this.allCartProducts.forEach((element) => {
      this.productService
        .removeAllFromCart(this.cartId, element.productId)
        .subscribe(
          (resp) => console.log(resp),
          (err) => console.log(err)
        );
    });

    this.router.navigate(['/home']);
  }

  removeFromCart(productId: number): void {
    this.productService.removeAllFromCart(this.cartId, productId).subscribe(
      (resp) => console.log(resp),
      (err) => console.log(err)
    );

    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/cart']);
      });
    }, 1000);
  }

  updateCartCount(productId: number, qty: string) {
    this.productService.setCart(this.cartId, productId, Number(qty)).subscribe(
      (resp) => {
        this.allCartProducts = resp;
      },
      (err) => console.log(err)
    );

    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/cart']);
      });
    }, 1000);
  }

  private handleNoCartError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      if (error.status === 500) console.log('error status 500');
      console.log('No cart');
    }
  }
}
