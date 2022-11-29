import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { Carrito } from 'src/app/models/carrito.model';
import { ProductosService } from '../../../services/productos.service';
import { Router } from '@angular/router';
import { CarritosService } from '../../../services/carritos.service'
import { UsersService } from '../../../services/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  creador: boolean = false;
  src: any;

  producto!: Producto;
  productId!: number;
  user!: User;
  cart: Carrito = {
    id: 1,
    product_id: 0,
    user_id: 0,
    quantity: 0,
    amount: 0,
    product_stock: 0,
    product: {
      ID: 0,
      code: "",
      nombre: "",
      precio: 0,
      category_id: 0,
      descripcion: "",
      stock: 0,
      in_stock: true
    },
    active: true
  };

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductosService,
    private cartService: CarritosService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.usersService.getUserLogged() || {}
    this.route.params.subscribe((params: Params) => {
      this.productId = params['id'];
      if (this.productId) {
        this.getProduct();
      }
    });
    if (this.route.snapshot.queryParams['crear']) {
      this.creador = true;
    }
  }

  private getProduct() {
    this.productsService.getProduct(this.productId)
      .subscribe(data => {
        this.producto = data.data;
        this.cart.product_id = this.producto.ID;
        this.cart.quantity = 1
      });
  }

  getUser() {
    // this.usersService.getUserLogged()
    //   .subscribe(data => {
    //     this.user = data
    //     this.cart.user_id = this.user.id;
    //   })
  }

  addToCart() {
    // console.log(JSON.stringify(this.cart));
    this.cartService.addToCart(this.cart)
      .subscribe(() => { })
  }

  buy() {
    this.cartService.addToCart(this.cart)
      .subscribe(() => { })
    this.router.navigate(['/shipping-information']);
  }

  procesarImagen(imagen: any) {
    var mimeType = imagen.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      imagen.srcElement.value = "";
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(imagen.target.files[0]);

    reader.onload = (_event) => {
      this.src = reader.result;
    }
  }
}
