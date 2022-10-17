import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService, Cart } from 'src/app/services/product.service';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  products: {
    product: Product;
    quantity: number;
  }[] = [];
  totalPrice: number = 0;
  cartProducts: Cart[] = [];
  finalProducts: { id: number; quantity: number }[] = [];

  checkoutForm = new UntypedFormGroup({
    fname: new UntypedFormControl('', Validators.required),
    lname: new UntypedFormControl('', Validators.required),
    cardName: new UntypedFormControl('', Validators.required),
    detail: new UntypedFormControl('', Validators.required),
    addOne: new UntypedFormControl('', Validators.required),
    addTwo: new UntypedFormControl(''),
    city: new UntypedFormControl('', Validators.required),
    state: new UntypedFormControl('', Validators.required),
    zipCode: new UntypedFormControl('', Validators.required),
    country: new UntypedFormControl('', Validators.required),
  });

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    let auth = localStorage.getItem('ArbId');
    if (!auth) auth = '';

    this.productService.getCart(parseInt(auth)).subscribe((resp) => {
      console.log(resp);
      (this.cartProducts = resp),
        resp.forEach((element) => {
          console.log(element), (this.totalPrice += element.totalCost);
        }),
        () => console.log('products retrieved');
    });
  }

  onSubmit(): void {

    if (this.cartProducts.length > 0) {
      this.productService.purchase(23).subscribe(
        (resp) => console.log(resp),
        (err) => console.log(err)
      );   
      alert("Thank you for your purchase!")
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
