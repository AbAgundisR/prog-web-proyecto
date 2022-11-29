import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido.model';
import { PedidosService } from 'src/app/services/pedidos.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CarritosService } from 'src/app/services/carritos.service';
import { Carrito } from 'src/app/models/carrito.model';
import { PedidoProductoService } from 'src/app/services/pedido-producto.service';
import { PedidoProducto } from 'src/app/models/pedido-producto';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  user!: User;
  user_id!: number;
  cart!: Carrito;
  carts: Carrito[] = [];
  productos: PedidoProducto[] = [];
  total: number = 0;
  order!: Pedido
  orders!: Pedido[];
  order_number!: number;
  fecha = new Date();
  fechaF!: string;

  constructor(
    private ordersService: PedidosService,
    private orderProductoService: PedidoProductoService,
    private usersService: UsersService,
    private cartService: CarritosService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.user = this.usersService.getUserLogged() || {}
    this.user_id = this.user.ID || 0

    this.route.params.subscribe((params: Params) => {
      if (params['order']) {
        this.order_number = params['order'];
        console.log(this.order_number);

        this.ordersService.getOrder(this.order_number).subscribe(data => {
          console.log(data);

          this.order = data

          this.orderProductoService.getPedidoProducts(this.order.pedido_ID).subscribe(data => {
            console.log(data);

            this.productos = data.pedido_productos
            this.productos.forEach(prod => {
              this.total = this.total + (prod.precio! * prod.cantidad)
            })
          })
        })
      }
    });

    this.fechaF = this.fecha.toLocaleDateString()

  }

  getUser() {

  }

  goPayment() {
    this.router.navigate(['/payment', this.order_number]);
  }

}
