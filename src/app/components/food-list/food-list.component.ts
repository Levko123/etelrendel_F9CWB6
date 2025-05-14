import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Observable, of } from 'rxjs';
import { CartService } from '../../services/cart.service';

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Component({
  standalone: true,
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
  imports: [CommonModule, MatCardModule],
})
export class FoodListComponent {
  foods$: Observable<FoodItem[]> = of([
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Paradicsom, mozzarella, bazsalikom',
      price: 1500,
    },
    {
      id: 2,
      name: 'Húsos Pizza',
      description: 'Sonka, kolbász, szalonna',
      price: 2000,
    },
  ]);

  constructor(private cartService: CartService) {}

  addToCart(item: FoodItem) {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    };
    this.cartService.addToCart(cartItem);
  }
}
