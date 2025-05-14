// src/app/components/order-form/order-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { getDatabase, ref, push, set } from 'firebase/database';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatCardModule, 
  ]
})
export class OrderFormComponent {
  orderForm!: FormGroup;
  isSubmitting = false;
  orderItems: CartItem[] = [];
  total = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.createForm();
    this.orderItems = this.cartService.getStoredOrder();
    this.total = this.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  createForm() {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['cash', Validators.required]
    });
  }

  onSubmit() {
    console.log('onSubmit() meghívva');
    if (this.orderForm.valid) {
      this.isSubmitting = true;
      console.log('Form állapot: VALID');
  
      const orderData = {
        ...this.orderForm.value,
        items: this.orderItems,
        total: this.total,
        timestamp: new Date().toISOString()
      };
  
      console.log('Értékek:', orderData);
  
      const user = this.cartService['auth'].currentUser;
      if (!user) {
        alert('Nem vagy bejelentkezve.');
        return;
      }
  
      const db = getDatabase();
      const orderRef = push(ref(db, `orders/${user.uid}`));
      set(orderRef, orderData)
        .then(() => {
          this.cartService.clearCart();
          this.isSubmitting = false;
          this.router.navigate(['/order-success']);
        })
        .catch((err) => {
          console.error('Hiba a rendelés mentésekor:', err);
          alert('Hiba történt a rendelés mentésekor.');
          this.isSubmitting = false;
        });
    }
  }}
