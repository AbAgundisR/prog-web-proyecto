import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/category.model';
import { CategoriesService } from '../../../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getAllCategories()
      .subscribe((data: any) => {
        this.categories = data.data;
      });
  }

  deleteCategory(id: number) {
    this.categoriesService.deleteCategory(id)
    .subscribe(() => {
      this.getCategories();
    });
  }
}
