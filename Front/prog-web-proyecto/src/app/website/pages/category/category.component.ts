import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  categoryId! : number;
  products: Array<Product> = [];

  constructor(private route: ActivatedRoute, private router: Router, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params['id'];
      this.productsService.getAllProductsByCategory(this.categoryId)
    .subscribe((data) => {
      this.products = data.data;
    });
    });
  }

  goProductDetail(id: number) {
    this.router.navigate(['/product', id]);
  }
}
