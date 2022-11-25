import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderComponent } from './components/order/order.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
