import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartsService } from 'src/app/services/carts.service';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Card } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-buy-detail',
  templateUrl: './buy-detail.component.html',
  styleUrls: ['./buy-detail.component.scss']
})
export class BuyDetailComponent implements OnInit {
  user!: User;
  user_id!: number;
  cards: Card[] = [];
  carts: Cart[] = [];
  products: Cart[] = [];
  product!: Product;
  total: number = 0;
  order: Order = {
    id: 0,
    order_number: 0,
    cart_id: 0,
    user_id: 0,
    status: ""
  }
  order_number: number = 0
  stock!: number;

  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService,
    private cartsService: CartsService,
    private cardsService: CardsService,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.usersService.getUserLogged()
      .subscribe(data => {
        this.user = data
        this.user_id = this.user.id
        this.order.user_id = this.user_id
        this.usersService.getUser(this.user.id)
          .subscribe(data => {
            this.user = data
            // console.log(this.user)
          })
        this.getCard()
        this.getCartUser()
      })
  }

  getCard() {
    this.cardsService.getCard(this.user_id)
      .subscribe(data => {
        this.cards = data.data
        // console.log(this.cards[0])
      })
  }

  getCartUser() {
    this.cartsService.getUserCart(this.user_id)
      .subscribe(data => {
        this.carts = data.data
        this.carts.forEach(cart => {
          if (cart.active == true){
            this.products.push(cart)
          }
        })

        this.totalBuy()
      })
  }

  totalBuy() {
    this.products.forEach(product => {
      this.total = this.total + product.amount
    });
  }

  createOrder() {
    console.log("Crear orden")
    var order_number: number = Math.round(Math.sqrt(Date.now()))
    this.order.order_number = order_number
    this.order.user_id = this.user.id

    this.products.forEach(cart => {
      this.order.cart_id = cart.id
      this.product = cart.product
      this.stock = this.product.stock - cart.quantity
      this.product.stock = this.stock
      console.log(this.product.stock)
      console.log(this.product)

      this.productsService.updateProduct(this.product.id, this.product)
      .subscribe(data => {})

      this.ordersService.createOrder(this.order)
      .subscribe(() => {
        console.log("se ha creado la orden")
       })
    });

    this.router.navigate(['/order-detail', order_number]);

  }
}
