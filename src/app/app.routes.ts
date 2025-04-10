// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderSuccessComponent } from '../app/components/order-succes/order-succes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // üres path -> home-ra irányít
  { path: 'home', component: HomeComponent },
  { path: 'food-list', component: FoodListComponent },
  { path: 'order', component: OrderFormComponent },
  { path: 'order-success', component: OrderSuccessComponent },
];
