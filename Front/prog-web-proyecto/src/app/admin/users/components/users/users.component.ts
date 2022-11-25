import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getAllUsers()
      .subscribe((data: any) => {
        this.users = data;
      });
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id)
    .subscribe(() => {
      this.getUsers();
    });
  }
}
