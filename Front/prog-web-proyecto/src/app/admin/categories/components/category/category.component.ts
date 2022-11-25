import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  form!: FormGroup;
  category_id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.category_id = params['id'];
      if (this.category_id) {
        this.getCategory();
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  save() {
    if (this.form.valid) {
      if (this.category_id) {
        this.updateCategory();
      } else {
        this.createCategory();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private createCategory() {
    const data = this.form.value;
    this.categoriesService.createCategory(data)
    .subscribe(rta => {
      this.router.navigate(['/admin/categories']);
    });
  }

  private updateCategory() {
    const data = this.form.value;
    this.categoriesService.updateCategory(this.category_id, data)
    .subscribe(rta => {
      this.router.navigate(['/admin/categories']);
    });
  }

  private getCategory() {
    this.categoriesService.getCategory(this.category_id)
    .subscribe(data => {
      this.form.patchValue(data.data);
    });
  }
}
