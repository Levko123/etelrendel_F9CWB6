// src/app/components/order-success/order-success.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-order-success',
  template: `
    <div class="success-container">
      <h2>Rendelésed sikeresen leadva!</h2>
      <p>Köszönjük a rendelésed, hamarosan megkezdjük a feldolgozását.</p>
    </div>
  `,
  styleUrls: ['./order-succes.component.scss'],
  imports: [CommonModule],
})
export class OrderSuccessComponent {}