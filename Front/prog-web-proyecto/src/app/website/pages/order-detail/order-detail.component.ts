import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido.model';
import { PedidosService } from 'src/app/services/pedidos.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CarritosService } from 'src/app/services/carritos.service';
import { Carrito } from 'src/app/models/carrito.model';

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
  total: number = 0;
  order!: Pedido
  orders!: Pedido[];
  order_number!: number;
  fecha = new Date();
  fechaF!: string;

  constructor(
    private ordersService: PedidosService,
    private usersService: UsersService,
    private cartService: CarritosService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getUser()
    this.fechaF = this.fecha.toLocaleDateString()
    this.route.params.subscribe((params: Params) => {
      this.order_number = params['order'];

      this.ordersService.getOrder(this.order_number)
        .subscribe(data => {
          console.log(data)
          this.order = data[0]
          console.log(this.order)
          this.orders = data[0][this.order_number]
          console.log(this.orders)

          this.orders.forEach(order => {
            this.cartService.getCart(order.cart_id)
              .subscribe(data => {
                this.cart = data;
                this.carts.push(this.cart)
                console.log(this.carts)
                this.carts.forEach(cart => {
                  this.total += cart.amount
                })
              })
          })
        })
    })
  }

  getUser() {
    this.user = this.usersService.getUserLogged() || {}
    this.user_id = this.user.ID || 0
    this.order.user_id = this.user_id
  }

  goPayment() {
    this.router.navigate(['/payment', this.order_number]);
  }

}
