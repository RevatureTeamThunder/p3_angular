import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrdersServiceService } from './orders-service.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { keyframes } from '@angular/animations';
import { PreviousOrdersComponent } from '../components/previous-orders/previous-orders.component';

describe('OrdersServiceService', () => {
  let httpMock: HttpTestingController;
  let testService: OrdersServiceService;

  beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ OrdersServiceService ]
    });

    testService = TestBed.get(OrdersServiceService);
    httpMock = TestBed.get(HttpTestingController);

  });

  it('getData() should http GET names', () => {

    const names = [{name: 'a'}, {name: 'b'}];

    // testService.getAllOrders().subscribe((res) => {
    //   expect(res).toEqual(names);
    // });

    const req = httpMock.expectOne('/app/data');
    expect(req.request.method).toEqual("GET");
    req.flush(names);

    httpMock.verify();
  });


  it('should be created', () => {
    expect(testService).toBeTruthy();
  });

  
});
