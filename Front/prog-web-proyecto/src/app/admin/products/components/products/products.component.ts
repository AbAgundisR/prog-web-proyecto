import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../models/producto.model';
import { ProductosService } from '../../../../services/productos.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Producto[] = [];

  constructor(private productsService: ProductosService) { }

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
