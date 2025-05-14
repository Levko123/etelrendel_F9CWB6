import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
})
export class AppComponent {
  private auth = inject(Auth);
  isAdmin = false;
  isLoggedIn = false;
  currentUrl = '';

  constructor(private router: Router, private location: Location) {
    this.checkAdmin();
    this.auth.onAuthStateChanged(user => {
      this.isLoggedIn = !!user;
    });

    this.currentUrl = this.router.url;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  async checkAdmin() {
    const user = this.auth.currentUser;
    if (!user) return;
    const db = getDatabase();
    const roleSnap = await get(ref(db, 'users/' + user.uid + '/role'));
    this.isAdmin = roleSnap.exists() && roleSnap.val() === 'admin';
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }

  goBack() {
    if (this.currentUrl !== '/login') {
      this.location.back();
    }
  }

  showBackButton(): boolean {
    return this.currentUrl !== '/login'&& this.currentUrl !== '/home';
  }
}
