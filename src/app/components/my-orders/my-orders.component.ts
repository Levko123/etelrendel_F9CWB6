import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { getDatabase, ref, child, get } from 'firebase/database';

@Component({
  standalone: true,
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  imports: [CommonModule]
})
export class MyOrdersComponent implements OnInit {
  private auth = inject(Auth);
  orders: any[] = [];

  ngOnInit(): void {
    const user = this.auth.currentUser;
    if (!user) return;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `orders/${user.uid}`)).then(snapshot => {
      const result: any[] = [];
      snapshot.forEach(orderSnap => {
        result.push(orderSnap.val());
      });
      this.orders = result;
    });
  }
}
