import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PreviousOrdersComponent } from './previous-orders.component';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
