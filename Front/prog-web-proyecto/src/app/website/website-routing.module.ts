import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { ProductSearchComponent } from './pages/product-search/product-search.component';
import { AuthGuard } from '../guards/auth.guard';
import { BuyDetailComponent } from './pages/buy-detail/buy-detail.component';
import { ShippingInformationComponent } from './pages/shipping-information/shipping-information.component';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';
import { PaymentComponent } from './pages/payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
        data: {
          preload: true,
        }
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent
      },
      {
        path: 'product-search/:name',
        component: ProductSearchComponent
      },
      {
        path: 'my-cart',
        canActivate: [AuthGuard],
        component: MycartComponent
      },
      {
        path: 'account',
        canActivate: [AuthGuard],
        component: AccountComponent,
      },
      {
        path: 'shipping-information',
        canActivate: [AuthGuard],
        component: ShippingInformationComponent,
      },
      {
        path: 'payment-method',
        canActivate: [AuthGuard],
        component: PaymentMethodComponent,
      },
      {
        path: 'buy-detail',
        canActivate: [AuthGuard],
        component: BuyDetailComponent,
      },
      {
        path: 'order-detail/:order',
        canActivate: [AuthGuard],
        component: OrderDetailComponent
      },
      {
        path: 'payment/:order',
        canActivate: [AuthGuard],
        component: PaymentComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
