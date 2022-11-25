import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { MyValidators } from './../../../utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      full_name: ['', Validators.required],
      email: ['', Validators.required],
      // password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },{
      validators: MyValidators.matchPasswords
    });
  }

  get fullnameField() {
    return this.form.get('full_name');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get confirmPasswordField() {
    return this.form.get('confirmPassword');
  }

  registerUser(){
    const data = this.form.value;
    console.log(data)
    this.usersService.createUser(data)
    .subscribe(() => {
        this.router.navigate(["/login"]);
    });
  }
}
