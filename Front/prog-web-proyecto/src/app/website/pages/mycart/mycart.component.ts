import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { UsersService } from '../../../services/users.service';
import { User } from 'src/app/models/user.model';
import { CarritosService } from 'src/app/services/carritos.service';
import { Carrito } from 'src/app/models/carrito.model';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {
  user!: User;
  user_id!: number;
  products!: Carrito[];
  productsAux!: Carrito[];
  total: number = 0;
  cantidad: number = 0;
  stock: number = 0;

  constructor(
    private usersService: UsersService,
    private cartsService: CarritosService,
    private productService: ProductosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.usersService.getUserLogged() || {}
    this.user_id = this.user.ID || 0
    this.cartsService.getCart(this.user_id)
      .subscribe(data => {
        this.products = data.carritos
        console.log(this.products);
        this.totalBuy()
      })
  }

  getUser() {

  }

  getCartUser() {

  }

  totalBuy() {
    this.products.forEach(product => {
      this.total = this.total + (product.product_price! * product.cantidad)
    });
  }

  updateQuantityProductsPlus(cart_id: number, product: any) {
    this.cantidad = product.cantidad
    product.cantidad = this.cantidad + 1
    this.cartsService.updateQuantityProductOnCart(cart_id, product)
      .subscribe(data => {
        product.amount = data.data.amount
        this.total = 0
        this.totalBuy()
      });
  }

  updateQuantityProductsMinus(cart_id: number, product: any) {
    this.cantidad = product.cantidad
    product.cantidad = this.cantidad - 1
    console.log(this.cantidad)
    if (product.cantidad == 0) {
      this.deleteProduct(product.ID)
    }
    else {
      this.cartsService.updateQuantityProductOnCart(cart_id, product)
        .subscribe(data => {
          product.amount = data.data.amount
          this.total = 0
          this.totalBuy()
        });
    }
  }

  deleteProduct(product_id: number) {
    this.cartsService.deleteProductOnCart(product_id)
      .subscribe(() => {
        this.total = 0
        this.getCartUser()
      })
  }

  buy() {
    this.router.navigate(['/buy-detail']);
  }

  // getProduct(){
  //   this.products.map(product => {
  //     this.productService.getProduct(product.product_id)
  //     .subscribe(data => {
  //       product.product_name = data.data.name
  //       product.product_price = data.data.price
  //       product.product_stock = data.data.stock
  //     })
  //   });
  // }

  // ngOnInit(): void {
  //   this.getUser()

  //   /*
  //   this.productos.push({
  //     id: 1,
  //     code: "string",
  //     name: "string",
  //     price: 999999,
  //     description: "string",
  //     category_id: 1,
  //     category_name: "Alimentos",
  //     stock: 999999,
  //     created_at: new Date(),
  //     updated_at: new Date()
  //   });*/
  //   //var cart = this.cartsService.getCart()
  //   this.cartsService.getUserCart(this.user.ID).subscribe(data=>{
  //     data.data.forEach((cart:Cart)=>{
  //       var product!:Product
  //       this.productService.getProduct(cart.product_id).subscribe(data=>{
  //         product = data.data;
  //        });
  //       this.carts.push([cart,product])
  //       this.total = cart.amount;
  //     });
  //   });
  //   /*cart.forEach((cart:Cart) => {
  //      this.productService.getProduct(cart.product_id).subscribe(data=>{
  //       this.total = data.data.price;
  //      })
  //   });*/
  // }

  // EliminarCarrito(id_cart:number){
  //   if (localStorage.getItem("cart_id") != null){
  //     this.cartsService.deleteProductOnCart(id_cart).subscribe(data => {

  //     });
  //   }
  // }
}
