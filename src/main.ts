// main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from '../../etelrendeles_F9CWB6/src/app/environments/environments';


bootstrapApplication(AppComponent, {
  providers: [
    // Angular router
    provideRouter(routes),

    // Itt jönnek az "NgModule"-ok standalone importként
    importProvidersFrom(
      BrowserModule,
      ReactiveFormsModule,
    ),

    // Firebase beállítások
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    // Ha kell Auth vagy Storage:
    // provideAuth(() => getAuth()),
    // provideStorage(() => getStorage()),
  ]
})
.catch(err => console.error(err));
