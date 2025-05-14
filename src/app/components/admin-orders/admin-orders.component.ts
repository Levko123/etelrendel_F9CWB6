import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, get, child } from 'firebase/database';
import { CommonModule } from '@angular/common';

interface Order {
  userId: string;
  orderId: string;
  timestamp: string;
  items: any[];
}

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
  imports: [CommonModule]
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  fetchAllOrders() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'orders')).then(snapshot => {
      const results: Order[] = [];
      snapshot.forEach(userSnap => {
        const userId = userSnap.key!;
        userSnap.forEach(orderSnap => {
          results.push({
            userId,
            orderId: orderSnap.key!,
            timestamp: orderSnap.val().timestamp,
            items: orderSnap.val().items
          });
        });
      });
      this.orders = results;
    });
  }
}
