import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../models/order.model';
import { OrdersService } from '../../../../services/orders.service';
import { OrderAdmin } from 'src/app/models/order-admin.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orders: OrderAdmin[] = [];
  id: number = 0

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getAllOrders()
      .subscribe((data: any) => {
        // console.log(data)
        this.orders = data
        // console.log(this.orders)

        this.orders.forEach(order => {
          this.id++;
          order.id = this.id;
          console.log(order)
        })
      });
  }
}
