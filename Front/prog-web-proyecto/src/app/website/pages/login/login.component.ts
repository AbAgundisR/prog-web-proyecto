import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { User } from 'src/app/models/user.model';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user!: User;
  token!: User;
  flag: boolean = false;
  form!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private tokenService: TokenService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get usernameField() {
    return this.form.get('username');
  }

  get passwordField() {
    return this.form.get('password');
  }

  login() {
    const data = this.form.value;
    console.log("enviando data")
    console.log(data)
    this.usersService.login(data)
      .subscribe(rta => {
        console.log(rta);

        this.tokenService.saveLoggedUser(rta)
        this.token = rta;
        if (this.token != null) {
          this.flag = false
          this.user = this.usersService.getUserLogged() || {}

          if (this.user.is_superusuario == true) {
            this.router.navigate(["/admin"]);
          } else {
            this.router.navigate(["/home"]);
          }
        } else if (this.token == null) {
          this.flag = true
        }
      });
  }

  register() {
    this.router.navigate(["/register"]);
  }
}
