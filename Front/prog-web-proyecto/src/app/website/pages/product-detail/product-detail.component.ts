import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Cart } from 'src/app/models/cart.model';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { CartsService } from '../../../services/carts.service'
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

  producto: Product = {
    id: 1,
    code: "aaa",
    name: "aaa",
    price: 100,
    category_id: 100,
    category_name: "string",
    description: "string",
    stock: 0
  };
  productId!: number;
  user!: User;
  cart: Cart = {
    id: 1,
    product_id: 0,
    user_id: 0,
    quantity: 0,
    amount: 0,
    product_stock: 0,
    product: {
      id: 0,
      code: "",
      name: "",
      price: 0,
      category_id: 0,
      description: "",
      stock: 0
    },
    active: true
  };

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartsService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.getUser()
    // this.route.params.subscribe((params: Params) => {
    //   this.productId = params['id'];
    //   if (this.productId) {
    //     this.getProduct();
    //   }
    // });
    if (this.route.snapshot.queryParams['crear']) {
      this.creador = true;
    }
  }

  private getProduct() {
    this.productsService.getProduct(this.productId)
      .subscribe(data => {
        this.producto = data.data;
        this.cart.product_id = this.producto.id;
        this.cart.quantity = 1
      });
  }

  getUser() {
    this.usersService.getUserLogged()
      .subscribe(data => {
        this.user = data
        this.cart.user_id = this.user.id;
      })
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
