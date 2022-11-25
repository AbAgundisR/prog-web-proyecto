import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../../services/users.service';
import { User } from 'src/app/models/user.model';
import { OrdersService } from '../../../../services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  form!: FormGroup;
  user!: User;
  user_id!: number;
  order_number!: number;
  product_id!: number;
  product_name!: string

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.order_number = params['id'];
      console.log(this.order_number)

      this.ordersService.getOrder(this.order_number)
      .subscribe(data => {
        console.log(data[0].user_id)
        this.user_id = data[0].user_id
        this.usersService.getUser(this.user_id)
        .subscribe(data => {
          console.log(data);
          this.user = data
        });
      })
      // if (this.order_id) {
        // this.getOrder();
      // }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id:[''],
      order_number: [''],
      product_id: [''],
      user_id: [''],
      quantity: [''],
      total_price: [''],
      status: [''],
      created_at:[''],
      updated_at:['']
    });
  }


  get productField() {
    return this.form.get('product_id');
  }

  save() {
    if (this.form.valid) {
      if (this.order_number) {
        this.updateOrder();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private updateOrder() {
    const data = this.form.value;
    this.ordersService.updateOrder(this.order_number, data)
    .subscribe(rta => {
      this.router.navigate(['/admin/orders']);
    });
  }

  getOrder() {
    this.ordersService.getOrder(this.order_number)
    .subscribe(data => {
      console.log(data)
      this.user_id = data.data.user_id
      this.getUser();
      // this.getProduct();
      // this.form.patchValue(data.data);
    });
  }

  private getUser() {
    this.usersService.getUser(this.user_id)
    .subscribe(data => {
      console.log(data);
      // this.form2.patchValue(data);
    });
  }

  private getProduct() {
    this.productsService.getProduct(this.product_id)
      .subscribe(data => {
        this.product_name = data.data.name
      });
  }

}
