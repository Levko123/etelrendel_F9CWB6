import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderSuccessComponent } from './components/order-succes/order-succes.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './guards/auth.guard'; 
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { roleGuard } from './guards/role.guard';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'food-list', component: FoodListComponent },
  { path: 'order', component: OrderFormComponent, canActivate: [authGuard] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'admin-orders', component: AdminOrdersComponent, canActivate: [authGuard, roleGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' }
];
