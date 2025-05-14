import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { getDatabase, ref, get } from 'firebase/database';

export const roleGuard: CanActivateFn = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = inject(Router);

  if (!user) return router.createUrlTree(['/login']);

  const db = getDatabase();
  const roleSnap = await get(ref(db, 'users/' + user.uid + '/role'));

  if (roleSnap.exists() && roleSnap.val() === 'admin') {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
