import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-shipping-information',
  templateUrl: './shipping-information.component.html',
  styleUrls: ['./shipping-information.component.scss']
})
export class ShippingInformationComponent implements OnInit {

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
      email: [''],
      full_name: [''],
      is_superuser: [''],
      phone: ['', Validators.required],
      address_country: ['', Validators.required],
      address_state: ['', Validators.required],
      address_city: ['', Validators.required],
      address_cp: ['', Validators.required],
      address_line_1: ['', Validators.required],
      address_line_2: ['', Validators.required],
      created_at:[''],
      updated_at:['']
    });
  }

  get phoneFiel() {
    return this.form.get('phone');
  }

  get addressCountryFiel() {
    return this.form.get('address_country');
  }
  get addressStatepFiel() {
    return this.form.get('address_state');
  }
  get addressCityFiel() {
    return this.form.get('address_city');
  }
  get cpFiel() {
    return this.form.get('address_cp');
  }
  get addressLine1Fiel() {
    return this.form.get('address_line_1');
  }

  get addressLine2Fiel() {
    return this.form.get('address_line_2');
  }

  save() {
    if (this.form.valid) {
      if (this.user_id) {
        this.updateUserShippingInformation();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private updateUserShippingInformation() {
    const data = this.form.value;
    console.log(data)
    this.usersService.updateUser(this.user_id, data)
    .subscribe(rta => {
      this.router.navigate(['/payment-method']);
    });
  }

  getUser() {
    this.usersService.getUserLogged()
      .subscribe(data => {
        this.form.patchValue(data);
        this.user = data
        this.user_id = this.user.id
      })
  }

}
