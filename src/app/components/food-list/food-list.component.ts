// src/app/components/food-list/food-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Observable, of } from 'rxjs';

// Példa: ha van FoodItem interface-ünk:
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

@Component({
  standalone: true,
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
  imports: [
    // A *ngIf, *ngFor, currency pipe miatt:
    CommonModule,
    // A <mat-card>, <mat-card-header> stb. miatt:
    MatCardModule,
  ],
})
export class FoodListComponent {
  // 1) Kell egy foods$ property, mert a HTML-ben foods$-ra hivatkozunk
  // Például egy Observable, ami egy listát ad vissza:
  foods$: Observable<FoodItem[]> = of([
    { id: '1', name: 'Margherita Pizza', description: 'Paradicsom, mozzarella, bazsalikom', price: 1500 },
    { id: '2', name: 'Húsos Pizza', description: 'Sonka, kolbász, szalonna', price: 2000 },
  ]);

  // 2) Kell egy addToCart metódus, mert a HTML (click)="addToCart(item)"
  addToCart(item: FoodItem) {
    console.log('Kosárba rakva:', item);
    // Ide jöhetne service hívás is
  }
}
