import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('ProductService', () => {
  let httpMock: HttpTestingController;
  let prodService: ProductService;

  beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ ProductService ]
    });

    prodService = TestBed.get(ProductService);
    httpMock = TestBed.get(HttpTestingController);

  });

  let product = <Product>{ productId: 4, name: "Baseball Cap", description: "A fancy baseball cap for a fancy person", quantity: 20, price: 10, image:	"https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png"}
    let prod2 = <Product>{ productId: 5, name: "Baseball Cap", description: "A fancy baseball cap for a fancy person", quantity: 20, price: 10, image:	"https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png"}
    const prods  = [product, prod2];

  it('getProducts() should http GET products', () => {
    

    prodService.getProducts().subscribe((res) => {
      expect(res).toEqual(prods);
    });

    const req = httpMock.expectOne(environment.baseUrl+"/api/product/");
    expect(req.request.method).toEqual("GET");
    req.flush(prods);

    httpMock.verify();
  });

  // it('getSingleProductById() should http GET single product', () => {

  //   prodService.getSingleProduct(4).subscribe((res) => {
  //     expect(res).toEqual(product);
  //   });

  //   const req = httpMock.expectOne(environment.baseUrl+"/api/product/" + 4);
  //   expect(req.request.method).toEqual("GET");
  //   req.flush(prods);

  //   httpMock.verify();
  // });



  it('should be created', () => {
    expect(prodService).toBeTruthy();
  });
});
