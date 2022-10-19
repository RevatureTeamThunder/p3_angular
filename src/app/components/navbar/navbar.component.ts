import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
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
  cartCount: number = 0;
  subscription!: Subscription;
  cartProducts!: Cart[];

  @Input() childMessage!: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.childMessage.currentValue) this.cartCount = this.childMessage;
  }

  counter: number = 0;

  @Output() messageEvent = new EventEmitter<number>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private displayComp: DisplayProductsComponent
  ) {}

  sendCounter() {
    this.messageEvent.emit(this.counter);
  }

  ngOnInit(): void {
    let auth = localStorage.getItem('ArbId');
    if (!auth) auth = '';
    console.log(this.childMessage);
    this.subscription = this.productService
      .getCart(parseInt(auth))
      .subscribe((cart) => {
        this.cartProducts = cart;
        console.log(this.cartProducts);
        this.cartProducts.forEach((element) => {
          this.cartCount += element.quantity;
          this.counter = this.cartCount;
          this.sendCounter();
        });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('ArbId');
    this.router.navigate(['login']);
  }

  public callSearchMethod(key: string): void {
    this.displayComp.searchProducts(key);
  }
}
