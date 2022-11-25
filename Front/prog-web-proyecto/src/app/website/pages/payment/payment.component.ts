import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  user!: User;
  user_id!: number;
  cards: Card[] = [];
  order_number!: number;
  order!: Order
  fecha = new Date();
  fechaF!: string;
  payment: Payment = {
    order_number: 0,
    user_id: 2,
    card_id: 1
  }

  constructor(
    private usersService: UsersService,
    private cardsService: CardsService,
    private ordersService: OrdersService,
    private paymentsService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getUser()
    this.fechaF = this.fecha.toLocaleDateString()
    this.route.params.subscribe((params: Params) => {
      this.order_number = params['order'];
      this.payment.order_number = this.order_number

      this.ordersService.getOrder(this.order_number)
        .subscribe(data => {
          this.order = data[0]
        })
    })
  }

  getUser() {
    this.usersService.getUserLogged()
      .subscribe(data => {
        this.user = data
        this.user_id = this.user.id
        this.payment.user_id = this.user_id
        this.usersService.getUser(this.user.id)
          .subscribe(data => {
            this.user = data
          })
        this.getCard()
      })
  }

  getCard() {
    this.cardsService.getCard(this.user_id)
      .subscribe(data => {
        this.cards = data.data
        this.payment.card_id = this.cards[0].id
        // console.log(this.cards[0])
      })
  }

  pay(){
    console.log(this.payment)
    this.paymentsService.createPayment(this.payment)
    .subscribe(data => {
      this.router.navigate(['/payment', this.order_number]);
    })
  }

  backHome(){
    this.router.navigate(['/home'])
  }

}
