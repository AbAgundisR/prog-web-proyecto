import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../../services/products.service';
import { Category } from './../../../../models/category.model';
import { CategoriesService } from './../../../../services/categories.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  form!: FormGroup;
  product_id!: number;
  public categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getCategories();
    this.route.params.subscribe((params: Params) => {
      this.product_id = params['id'];
      if (this.product_id) {
        this.getProduct();
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      category_id: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required]
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get codeField() {
    return this.form.get('code');
  }

  get categoryField() {
    return this.form.get('category_id');
  }

  get priceField() {
    return this.form.get('price');
  }

  get descriptionField() {
    return this.form.get('description');
  }

  get stockField() {
    return this.form.get('stock');
  }

  save() {
    if (this.form.valid) {
      if (this.product_id) {
        this.updateProduct();
      } else {
        this.createProduct();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private createProduct() {
    const data = this.form.value;
    console.log(data);
    this.productsService.createProduct(data)
      .subscribe(rta => {
        this.router.navigate(['/admin/products']);
      });
  }

  private updateProduct() {
    const data = this.form.value;
    this.productsService.updateProduct(this.product_id, data)
      .subscribe(rta => {
        this.router.navigate(['/admin/products']);
      });
  }

  private getProduct() {
    this.productsService.getProduct(this.product_id)
      .subscribe(data => {
        this.form.patchValue(data.data);
      });
  }

  getCategories() {
    this.categoriesService.getAllCategories()
      .subscribe((data: any) => {
        this.categories = data.data;
      });
  }

}
