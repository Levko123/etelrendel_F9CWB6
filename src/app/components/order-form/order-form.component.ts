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

import { OrderService } from '../../services/order.service';

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
    MatButtonModule
  ]
})
export class OrderFormComponent {
  orderForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['cash', Validators.required]
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.isSubmitting = true; // A gombot letiltjuk, amíg dolgozunk

      const orderData = this.orderForm.value;
      // Ha vannak plusz adatok (items, totalPrice), töltsd fel ide

      this.orderService.addOrder(orderData)
        .then(() => {
          // Sikeres mentés után
          this.isSubmitting = false;
          // Átirányítás a "Sikeres rendelés" oldalra
          this.router.navigate(['/order-success']);
        })
        .catch((err: any) => {
          console.error('Hiba a rendelés mentésekor:', err);
          this.isSubmitting = false;
          // Ide valami hibaüzenet-kezelés
        });
    }
  }
}
