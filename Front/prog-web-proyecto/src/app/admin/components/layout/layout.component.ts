import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private usersService:UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.usersService.logout()
    this.router.navigate(['/login']);
  }

}
