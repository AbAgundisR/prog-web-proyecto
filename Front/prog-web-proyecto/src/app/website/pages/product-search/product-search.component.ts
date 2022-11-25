import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  products: Array<Product> = [];
  product: any = {
    search: ""
  };
  productName!: string;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productName = params['name'];
      if (this.productName) {
        this.product.search = this.productName
        console.log(this.product.search)
        this.getProducts();
      }
    });
  }

  private getProducts() {
    this.productsService.searchProduct(this.product)
      .subscribe(data => {
        this.products = data.data;
        console.log(this.products)
      });
  }

  goProductDetail(id: number){
    this.router.navigate(['/product', id]);
  }
}
