import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user!: User;
  form!: FormGroup;
  user_id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getUser();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id:[''],
      username: [''],
      email: ['', Validators.required],
      full_name: ['', Validators.required],
      is_superuser: ['', Validators.required],
      phone: [''],
      address_country: [''],
      address_state: [''],
      address_city: [''],
      address_cp: ['', Validators.required],
      address_line_1: [''],
      address_line_2: [''],
      created_at:[''],
      updated_at:['']
    });
  }

  get emailField() {
    return this.form.get('email');
  }

  get fullNameField() {
    return this.form.get('full_name');
  }

  get isSuperuserFiel() {
    return this.form.get('is_superuser');
  }

  get cpFiel() {
    return this.form.get('address_cp');
  }


  save() {
    if (this.form.valid) {
      if (this.user_id) {
        this.updateUser();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private updateUser() {
    const data = this.form.value;
    console.log(data)
    this.usersService.updateUser(this.user_id, data)
    .subscribe(rta => {
      this.router.navigate(['/home']);
    });
  }

  getUser() {
    this.usersService.getUserLogged()
      .subscribe(data => {
        console.log(data)
        this.usersService.getUser(data.id)
        .subscribe(data => {
          console.log(data)
          this.form.patchValue(data);
          this.user = data
          this.user_id = this.user.id
        })
      })
  }
}
