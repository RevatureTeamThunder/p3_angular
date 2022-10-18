import { Component, OnInit } from '@angular/core';
import { OrdersServiceService } from '../../services/orders-service.service';
import { Cart } from 'src/app/services/product.service';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit {

  customerId!: number;

  allCartProducts: Cart[] = [];

  constructor(private orderService: OrdersServiceService) { }

  ngOnInit(): void {
    let auth = localStorage.getItem('ArbId');
    if (!auth) auth = '';
    this.customerId = parseInt(auth);
    this.orderService.getAllOrders(parseInt(auth)).subscribe(
      (resp) => {
        console.log(resp)
        this.allCartProducts = resp },
      (err) => console.log(err)
        );
  }

}
