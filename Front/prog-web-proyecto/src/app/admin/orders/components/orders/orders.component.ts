import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../../../models/pedido.model';
import { PedidosService } from '../../../../services/pedidos.service';
import { OrderAdmin } from 'src/app/models/order-admin.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orders: OrderAdmin[] = [];
  id: number = 0

  constructor(private ordersService: PedidosService) { }

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
