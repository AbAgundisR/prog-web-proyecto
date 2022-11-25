import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user!: User;
  token!: string;
  flag: boolean = false;
  form!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService
    ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  login(){
    const data = this.form.value;
    this.usersService.login(data)
    .subscribe( rta => {
      this.token = rta.token;
      if (this.token != null){
        this.flag = false
        this.usersService.getUserLogged()
        .subscribe( data => {
          this.user = data
        })
        if(this.user.is_superuser == true){
          this.router.navigate(["/admin"]);
        } else{
          this.router.navigate(["/home"]);
        }
      } else if (this.token == null){
        this.flag = true
      }
    });
  }

  register() {
    this.router.navigate(["/register"]);
  }
}
