import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PreviousOrdersComponent } from './previous-orders.component';
import { OrdersServiceService } from 'src/app/services/orders-service.service';

describe('PreviousOrdersComponent', () => {
  let component: PreviousOrdersComponent;
  let fixture: ComponentFixture<PreviousOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PreviousOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should get the order stub', () => {
  //   let oServ = new OrdersServiceService(null);
  //   sut = new PreviousOrdersComponent(oServ);
  // })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
