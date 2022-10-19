import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Cart, ProductService } from 'src/app/services/product.service';
import { DisplayProductsComponent } from '../display-products/display-products.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartCount: number =0;
  subscription!: Subscription;
  cartProducts!: Cart[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private displayComp: DisplayProductsComponent
  ) {}

  ngOnInit(): void {
    let auth = localStorage.getItem('ArbId');
    if (!auth) auth = '';

    this.subscription = this.productService.getCart(parseInt(auth)).subscribe(
      // (resp) => { console.log(resp)
      //   resp.forEach( (element) => {(this.cartCount += element.quantity), console.log(element.quantity)})
        //this.cartCount = resp[0].quantity;
        (cart) => {
          this.cartProducts = cart;
          console.log(this.cartProducts)
          this.cartProducts.forEach( (element) => {(

            this.cartCount = this.cartCount + element.quantity);
        }

      
    );
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('ArbId');
    this.router.navigate(['login']);
  }

  public callSearchMethod(key: string): void{
    this.displayComp.searchProducts(key);
  }
}
