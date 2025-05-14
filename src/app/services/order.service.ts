// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Order } from '../models/order.model';
import { CollectionReference, DocumentData } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    // A Firestore-ban "orders" kollekcióba mentjük a rendeléseket
    this.orderCollection = collection(this.firestore, 'orders');
  }

  addOrder(order: Order): Promise<any> {
    // addDoc visszaad egy Promise-ot
    return addDoc(this.orderCollection, {
      ...order,
      createdAt: new Date()
    });
  }
}
