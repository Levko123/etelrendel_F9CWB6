import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { getDatabase, ref, get } from 'firebase/database';
import { Auth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class HomeComponent {
  isAdmin = false;
  private auth = inject(Auth);

  constructor(private router: Router) {
    this.checkAdmin();
  }

  goToFoodList() {
    this.router.navigate(['/food-list']);
  }

  async checkAdmin() {
    const user = this.auth.currentUser;
    if (!user) return;
    const db = getDatabase();
    const roleSnap = await get(ref(db, 'users/' + user.uid + '/role'));
    this.isAdmin = roleSnap.exists() && roleSnap.val() === 'admin';
  }
}
