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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoProductoService } from 'src/app/services/pedido-producto.service';
import { PedidoProducto } from 'src/app/models/pedido-producto';

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
    pedido_ID: 0,
    user_ID: 0,
    subtotal: 100,
    iva: 100,
    total: 100,
    direccion: "direccion",
    ciudad: "ciudad",
    estado: "estado",
    cp: "12345",
    telefono: "123456789",

    order_number: 0,
    cart_id: 0,
    status: ""
  }
  order_number: number = 0
  stock!: number;
  form!: FormGroup;

  constructor(
    private ordersService: PedidosService,
    private orderProductoService: PedidoProductoService,
    private usersService: UsersService,
    private cartsService: CarritosService,
    private cardsService: CardsService,
    private productsService: ProductosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: [''],
      telefono: [''],
      direccion: [''],
      colonia: [''],
      ciudad: [''],
      estado: [''],
      cp: [''],
      nombre_tarjeta: [''],
      numero_tarjeta: [''],
      fecha_vencimiento: [''],
      cvv: [''],
      // username: [''],
      // email: ['', Validators.required],
      // full_name: ['', Validators.required],
      // is_superuser: ['', Validators.required],
      // phone: [''],
      // address_country: [''],
      // address_state: [''],
      // address_city: [''],
      // address_cp: ['', Validators.required],
      // address_line_1: [''],
      // address_line_2: [''],
      // created_at: [''],
      // updated_at: ['']
    });
  }

  ngOnInit(): void {
    this.getUser()
    this.buildForm()
  }

  getUser() {
    this.user = this.usersService.getUserLogged() || {}
    this.user_id = this.user.ID || 0
    this.order.user_ID = this.user_id
    this.cartsService.getCart(this.user_id).subscribe(data => {
      this.products = data.carritos
      this.totalBuy()
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
      this.total = this.total + (product.product_price! * product.cantidad)
    });
  }

  createOrder() {
    this.order.user_ID = this.user_id
    this.order.subtotal = this.total
    this.order.iva = 0
    this.order.total = this.total
    this.order.direccion = this.form.get("direccion")?.value
    this.order.ciudad = this.form.get("ciudad")?.value
    this.order.estado = this.form.get("estado")?.value
    this.order.cp = this.form.get("cp")?.value
    this.order.telefono = this.form.get("telefono")?.value

    var order_id: number = 0

    console.log(this.order);

    this.ordersService.createOrder(this.order).subscribe(data => {
      console.log(data);
      order_id = data.id

      this.products.forEach(producto => {
        var ped_prod: PedidoProducto = {
          pedido_ID: order_id,
          producto_id: producto.producto_id,
          cantidad: producto.cantidad
        }

        console.log(ped_prod);
        this.orderProductoService.createPedidoProduct(ped_prod).subscribe(() => { })
      })

      this.router.navigate(['/order-detail', order_id]);
    })
    // console.log("Crear orden")
    // var order_number: number = Math.round(Math.sqrt(Date.now()))
    // this.order.order_number = order_number
    // this.order.user_id = this.user.ID

    // this.products.forEach(cart => {
    //   this.order.cart_id = cart.id
    //   this.product = cart.product
    //   this.stock = this.product.stock - cart.cantidad
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

  }
}
