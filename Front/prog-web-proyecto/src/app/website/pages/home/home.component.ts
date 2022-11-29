import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from '../../../services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Array<Producto> = [
    // {
    //   id: 1,
    //   code: "aaa",
    //   name: "aaa",
    //   price: 100,
    //   category_id: 100,
    //   category_name: "string",
    //   description: "string",
    //   stock: 0
    // },
    // {
    //   id: 1,
    //   code: "aaa",
    //   name: "aaa",
    //   price: 100,
    //   category_id: 100,
    //   category_name: "string",
    //   description: "string",
    //   stock: 0
    // }
  ];

  constructor(private productsService: ProductosService, private router: Router) { }

  ngOnInit(): void {
    this.productsService.getAllProducts()
      .subscribe((data) => {
        console.log(data);
        this.products = data.productos;
      });
  }

  goProductDetail(id: number) {
    this.router.navigate(['/product', id]);
  }

}
