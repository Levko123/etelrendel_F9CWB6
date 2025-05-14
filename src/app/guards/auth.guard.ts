import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Promise<boolean>((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      if (user) {
        console.log('AuthGuard passed: user logged in.');
        resolve(true);
      } else {
        console.warn('AuthGuard blocked: no user.');
        router.navigate(['/login']);
        resolve(false);
      }
    });
  });
};
