import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Array<Product> = [
    {
      id: 1,
      code: "aaa",
      name: "aaa",
      price: 100,
      category_id: 100,
      category_name: "string",
      description: "string",
      stock: 0
    },
    {
      id: 1,
      code: "aaa",
      name: "aaa",
      price: 100,
      category_id: 100,
      category_name: "string",
      description: "string",
      stock: 0
    }
  ];

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    // this.productsService.getAllProducts()
    //   .subscribe((data) => {
    //     this.products = data.data;
    //   });
  }

  goProductDetail(id: number) {
    this.router.navigate(['/product', id]);
  }

}
