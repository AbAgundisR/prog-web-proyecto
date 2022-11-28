import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/models/carrito.model';
import { CarritosService } from 'src/app/services/carritos.service';
import { Pedido } from 'src/app/models/pedido.model';
import { PedidosService } from 'src/app/services/pedidos.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Card } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-buy-detail',
  templateUrl: './buy-detail.component.html',
  styleUrls: ['./buy-detail.component.scss']
})
export class BuyDetailComponent implements OnInit {
  user!: User;
  user_id!: number;
  cards: Card[] = [];
  carts: Carrito[] = [];
  products: Carrito[] = [];
  product!: Producto;
  total: number = 0;
  order: Pedido = {
    id: 0,
    order_number: 0,
    cart_id: 0,
    user_id: 0,
    status: ""
  }
  order_number: number = 0
  stock!: number;

  constructor(
    private ordersService: PedidosService,
    private usersService: UsersService,
    private cartsService: CarritosService,
    private cardsService: CardsService,
    private productsService: ProductosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.user = this.usersService.getUserLogged() || {}
    this.user_id = this.user.id || 0
    this.order.user_id = this.user_id
  }

  getCard() {
    this.cardsService.getCard(this.user_id)
      .subscribe(data => {
        this.cards = data.data
        // console.log(this.cards[0])
      })
  }

  getCartUser() {
    // this.cartsService.getUserCart(this.user_id)
    //   .subscribe(data => {
    //     this.carts = data.data
    //     this.carts.forEach(cart => {
    //       if (cart.active == true) {
    //         this.products.push(cart)
    //       }
    //     })

    //     this.totalBuy()
    //   })
  }

  totalBuy() {
    this.products.forEach(product => {
      this.total = this.total + product.amount
    });
  }

  createOrder() {
    // console.log("Crear orden")
    // var order_number: number = Math.round(Math.sqrt(Date.now()))
    // this.order.order_number = order_number
    // this.order.user_id = this.user.id

    // this.products.forEach(cart => {
    //   this.order.cart_id = cart.id
    //   this.product = cart.product
    //   this.stock = this.product.stock - cart.quantity
    //   this.product.stock = this.stock
    //   console.log(this.product.stock)
    //   console.log(this.product)

    //   this.productsService.updateProduct(this.product.ID, this.product)
    //   .subscribe(data => {})

    //   this.ordersService.createOrder(this.order)
    //   .subscribe(() => {
    //     console.log("se ha creado la orden")
    //    })
    // });

    this.router.navigate(['/order-detail', 1]);

  }
}
