import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

export interface Cart {
  cartId: number,
  customerId: number,
  id: number,
  name: string,
  price: number,
  productId: number,
  quantity: number,
  totalCost: number
  cartCount: number;
  // products: {
  //   product: Product,
  //   quantity: number
  // }[];
  // totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl: string = "/api/product/";

  private cartUrl: string = "/api/cart/view";

  private cartIdUrl: string = "/api/cart/customer_id/";

  private addToCartUrl: string = "/api/cart/";

  // private _cart = new BehaviorSubject<Cart>({
  //   cartCount: 0,
  //   products: [],
  //   totalPrice: 0.00
  // });

  // private _cart$ = this._cart.asObservable();

  getCartId(customerId: number) {
    return this.http.get<Cart>(environment.baseUrl+this.cartIdUrl + customerId, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  getCart(customer_id: number): Observable<Cart[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("customer_id",customer_id);
    
    return this.http.get<Cart[]>(environment.baseUrl+this.cartUrl, {headers: environment.headers, withCredentials: environment.withCredentials, params: queryParams});
   
  }

  createCart(customer_id: number) {
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append("customer_id",customer_id);
    return this.http.put<any>(environment.baseUrl+this.addToCartUrl + "create?customer_id=" + customer_id, null,{headers: environment.headers, withCredentials: environment.withCredentials})
  }

  addNewProductToCart(cartId: number, productId: number, quantity: number) {

    return this.http.put<any>(environment.baseUrl+this.addToCartUrl + cartId + "/add?product_id="+ productId + "&quantity=" + quantity, null,{headers: environment.headers, withCredentials: environment.withCredentials})
  }

  removeAllFromCart(cartId: number, productId: number) {
    return this.http.delete<any>(environment.baseUrl+this.addToCartUrl + cartId + "/delete?product_id="+ productId,{headers: environment.headers, withCredentials: environment.withCredentials})
  }

  setCart(cartId: number, productId: number, quantity: number) {
    let queryParamsSetCart = new HttpParams();
    console.log(productId)
    queryParamsSetCart = queryParamsSetCart.append("product_id",productId);
    queryParamsSetCart = queryParamsSetCart.append("quantity",quantity);
    console.log(environment.baseUrl+this.addToCartUrl + cartId + "/update")
    console.log(queryParamsSetCart)
    return this.http.put<any>(environment.baseUrl+this.addToCartUrl + cartId + "/update?product_id=" + productId + "&quantity=" + quantity,null,{headers: environment.headers, withCredentials: environment.withCredentials, params: queryParamsSetCart})
   }

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+this.productUrl, {headers: environment.headers, withCredentials: environment.withCredentials});
   // let product = { id: 4, name: "Baseball Cap", description: "A fancy baseball cap for a fancy person", quantity: 20, price: 10, image:	"https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png"}
    //let prod2 = { id: 5, name: "Baseball Cap", description: "A fancy baseball cap for a fancy person", quantity: 20, price: 10, image:	"https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png"}
    //let products = [product, prod2];
    //return products;
  }

  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl+this.productUrl+id,  {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public purchase(products: {id:number, quantity:number}[]): Observable<any> {
    const payload = JSON.stringify(products);
    return this.http.patch<any>(environment.baseUrl+this.productUrl, payload, {headers: environment.headers, withCredentials: environment.withCredentials})
  }
}
