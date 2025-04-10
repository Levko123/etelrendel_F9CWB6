// src/app/app.component.ts
import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <app-navbar>
      <!-- A router-outlet lesz az oldalsó menü melletti terület -->
      <router-outlet></router-outlet>
    </app-navbar>
  `,
  imports: [
    NavbarComponent,
    RouterOutlet
  ]
})
export class AppComponent {}