import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { User } from 'src/app/models/user.model';
import { CardsService } from 'src/app/services/cards.service';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  form!: FormGroup;
  user!: User;
  user_id!: number;
  cards: Card[] = [];
  card_id: number = 0;
  card: Card  = {
    id: 0,
    user_id: 0,
    card_name: "",
    card_number: "",
    card_expiration_date: "",
    card_cvc: 0
  }

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private cardsService: CardsService,
    private router: Router,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getUser();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      card_name: ['', Validators.required],
      card_number: ['', Validators.required],
      card_expiration_date: ['', Validators.required],
      card_cvc: ['', Validators.required]
    });
  }

  get cardNameFiel() {
    return this.form.get('card_name');
  }

  get cardNumberFiel() {
    return this.form.get('card_number');
  }
  get cardExpirationFiel() {
    return this.form.get('card_expiration_date');
  }
  get cardCvcFiel() {
    return this.form.get('card_cvc');
  }

  save() {
    if (this.form.valid) {
      if (this.card_id === 0) {
        this.createCard();
      }
      else {
        this.updateCard();
      }
      this.router.navigate(['/buy-detail']);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private updateCard() {
    const data = this.form.value;
    this.cardsService.updateCard(this.card_id, data)
    .subscribe(rta => {

    });
  }

  private createCard() {
    const data = this.form.value;
    this.card = data
    this.card.user_id = this.user_id
    this.cardsService.createCard(this.card)
    .subscribe(() => {
    });
  }

  getUser() {
    this.usersService.getUserLogged()
      .subscribe(data => {
        this.user = data
        this.user_id = this.user.id
        this.getCard(this.user_id)
      })
  }

  getCard(user_id: number){
    this.cardsService.getCard(user_id)
    .subscribe(data => {
      this.cards = data.data
      if(this.cards.length != 0){
        this.form.patchValue(this.cards[0]);
        this.card_id = this.cards[0].id
      }
    })
  }
}
