import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAllProducts()
      .subscribe((data: any) => {
        this.products = data.data;
      });
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id)
    .subscribe(() => {
      this.getProducts();
    });
  }
}
