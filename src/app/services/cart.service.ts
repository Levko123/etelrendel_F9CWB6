// src/app/services/cart.service.ts
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getDatabase, ref, push, set } from 'firebase/database';
import { Auth } from '@angular/fire/auth';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: CartItem[] = [];
  private cart$ = new BehaviorSubject<CartItem[]>([]);
  private auth = inject(Auth);

  getCartObservable() {
    return this.cart$.asObservable();
  }

  addToCart(item: CartItem) {
    const existing = this.cart.find(p => p.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cart.push({ ...item });
    }
    this.cart$.next(this.cart);
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter(i => i.id !== id);
    this.cart$.next(this.cart);
  }

  clearCart() {
    this.cart = [];
    this.cart$.next(this.cart);
  }
  
  private latestOrder: CartItem[] = [];
  
  storeCartForOrder() {
    this.latestOrder = [...this.cart];
  }
  
  getStoredOrder(): CartItem[] {
    return this.latestOrder;
  }
  
  submitOrder(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) return Promise.reject('Nincs bejelentkezett felhasználó.');
  
    const db = getDatabase();
    const orderRef = push(ref(db, `orders/${user.uid}`));
    return set(orderRef, {
      items: this.cart,
      timestamp: new Date().toISOString()
    }).then(() => this.clearCart());
  }}  