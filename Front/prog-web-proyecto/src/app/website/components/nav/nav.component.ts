import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './../../../models/category.model';
import { CategoriesService } from './../../../services/categories.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user!: User;
  userName: String = "Inciar sesión";
  productName: string = "";
  counter: number = 0

  constructor(
    private elem: ElementRef,
    private categoriesService: CategoriesService,
    private renderer: Renderer2,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getUser();
  }

  //Elementos para menu responsivo-----------------------------------------------------
  public get menuElement(): Element { return this.elem.nativeElement.querySelector('.menu-responsivo') }
  public menuOpen: boolean = false;
  public get sidebarElement(): Element { return this.elem.nativeElement.querySelector('.sidebar') }

  toogleMenu() {
    if (this.menuOpen) {
      //this.renderer.removeClass(this.menuElement, "active");
      this.renderer.removeClass(this.sidebarElement, "active");
    } else {
      //this.renderer.addClass(this.menuElement, "active");
      this.renderer.addClass(this.sidebarElement, "active");
    }
    this.menuOpen = !this.menuOpen;
  }

  public topbarOpen: boolean = false;
  public get topbarElement(): Element { return this.elem.nativeElement.querySelector('.topbar') }

  toogleTopbar() {
    if (this.topbarOpen) {
      //this.renderer.removeClass(this.menuElement, "active");
      this.renderer.removeClass(this.topbarElement, "active");
    } else {
      //this.renderer.addClass(this.menuElement, "active");
      this.renderer.addClass(this.topbarElement, "active");
    }
    this.topbarOpen = !this.topbarOpen;
  }

  //Elementos para el dropdown---------------------------------------------------------
  public categories: Category[] = [];
  public currentValue: any = 'TODAS';
  public dropdownOpen: boolean = false;
  public get dropdownElement(): Element { return this.elem.nativeElement.querySelector('.dropdown-list') }
  private currentIndex = -1;

  closeDropdown() {
    this.dropdownElement.setAttribute('aria-expanded', "false");
    this.currentIndex = -1;
    this.dropdownOpen = false;
  }

  selectByIndex(i: number) {
    let value = this.categories[i];
    this.select(value);
  }

  select(value: any) {
    this.currentValue = value;
    this.closeDropdown();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.dropdownElement.setAttribute('aria-expanded', this.dropdownOpen ? "true" : "false");
  }

  getCategories() {
    this.categoriesService.getAllCategories()
      .subscribe((data: any) => {
        this.categories = data.data;
      });
  }

  getUser() {
    this.usersService.getUserLogged()
      .subscribe(data => {
        this.user = data
        this.usersService.getUser(this.user.id)
        .subscribe(data => {
          this.userName = data.full_name
        })
      })
  }

  redirectUser(){
    if(this.userName == "Inciar sesión"){
      this.router.navigate(["/login"]);
    } else {
      this.router.navigate(["/account"]);
    }
  }

  productSearch(name: string){
    this.router.navigate(['/product-search', name]);
  }
}
