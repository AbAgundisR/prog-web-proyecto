import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  user!: User;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.usersService.getUserLogged()
      .subscribe(data => {
        this.user = data
        console.log(this.user)
      })
    if (this.user.is_superuser == true) {
      return true
    } else {
      // this.router.navigate(["/login"])
      console.log(this.user)
      return false
    }
  }
}
