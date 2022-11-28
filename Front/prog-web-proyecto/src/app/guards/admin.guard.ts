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

  user!: User | null;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.user = this.usersService.getUserLogged()
    if (this.user != null) {
      if (this.user.is_superusuario == true) {
        return true
      } else {
        // this.router.navigate(["/login"])
        console.log(this.user)
        return false
      }
    } else {
      return false
    }
  }
}
