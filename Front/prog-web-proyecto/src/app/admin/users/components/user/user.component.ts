import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

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
    this.route.params.subscribe((params: Params) => {
      this.user_id = params['id'];
      if (this.user_id) {
        this.getUser();
      }
    });
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
      } else {
        this.createUser();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private createUser() {
    const data = this.form.value;
    console.log(data)
    this.usersService.createUser(data)
    .subscribe(() => {
      this.router.navigate(['/admin/users']);
    });
  }

  private updateUser() {
    const data = this.form.value;
    console.log(data)
    this.usersService.updateUser(this.user_id, data)
    .subscribe(rta => {
      this.router.navigate(['/admin/users']);
    });
  }

  private getUser() {
    this.usersService.getUser(this.user_id)
    .subscribe(data => {
      console.log(data)
      this.form.patchValue(data);
    });
  }
}
