import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinkModule } from 'ngx-quicklink';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    QuicklinkModule,
  ]
})
export class AdminModule { }
