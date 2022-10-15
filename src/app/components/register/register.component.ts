import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {


  registerForm = new UntypedFormGroup({
    fname: new UntypedFormControl(''),
    lname: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  })
  
  public showEmailError: Boolean
  constructor(private authService: AuthService, private productService: ProductService, private router: Router, ) { this.showEmailError = false }

  ngOnInit(): void {

  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      if (error.status === 500)
      console.error(
        
        `Backend returned code ${error.status}, body was: `, error.error);
        this.showEmailError=true;
    }
    // Return an observable with a user-facing error message.
 
  }
  
  onSubmit(): void {
    
    this.authService.register(this.registerForm.get('fname')?.value, this.registerForm.get('lname')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).subscribe(
      (resp) => this.productService.createCart(resp.customerId).subscribe(),
      (err) => this.handleError(err),
      () => this.router.navigate(['login'])
    );

 
  }
}
