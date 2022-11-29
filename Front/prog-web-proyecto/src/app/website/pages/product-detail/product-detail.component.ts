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
  cart!: Carrito;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductosService,
    private cartService: CarritosService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.usersService.getUserLogged() || {}
    console.log(this.user);

    this.route.params.subscribe((params: Params) => {
      console.log(params);
      if (params['id']) {
        this.productId = params['id'];
        this.productsService.getProduct(this.productId)
          .subscribe(data => {
            console.log(data)
            this.producto = data;
          });
      }
    });
    if (this.route.snapshot.queryParams['crear']) {
      this.creador = true;
    }
  }

  getUser() {
    // this.usersService.getUserLogged()
    //   .subscribe(data => {
    //     this.user = data
    //     this.cart.user_id = this.user.ID;
    //   })
  }

  addToCart() {
    this.cartService.addToCart(this.user.ID || 0, this.productId)
      .subscribe(() => {
        this.router.navigate(['/my-cart']);
      })
  }

  buy() {
    this.cartService.addToCart(this.user.ID || 0, this.productId)
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
