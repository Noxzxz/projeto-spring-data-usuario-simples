import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isLogado()) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};

export const instrutorGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  const user   = auth.usuario();

  if (user?.perfil === 'INSTRUTOR' || user?.perfil === 'ADMIN') {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
