import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;

  @Input() productInfo!: Product;

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
        console.log(cart)
      }
    );
    
  }

  addToCart(product: Product, qty: string): void {

    let inCart = false;
    
    
    this.products.forEach(
      (element) => {
        console.log("element " + element)
        if(element.product.id == product.id){
          console.log("element = element")
          element.quantity = element.quantity + Number(qty);
          console.log("element.quantity is " + element.quantity)
          let cart = {
            cartCount: element.quantity,
            products: this.products,
            totalPrice: this.totalPrice + (product.price * element.quantity)
          };
          this.productService.setCart(cart);
          inCart=true;
          return;
        };
      }
    );

    if(inCart == false){
      let newProduct = {
        product: product,
        quantity: Number(qty)
      };
      this.products.push(newProduct);
      let cart = {
        cartCount: this.cartCount + Number(qty),
        products: this.products,
        totalPrice: this.totalPrice + (product.price * (newProduct.quantity-1))
      }
      this.productService.setCart(cart);
    }


      
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
