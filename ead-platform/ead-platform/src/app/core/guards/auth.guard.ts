import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isLogado() && !auth.isTokenExpirado()) {
    return true;
  }

  // Se não está logado ou token expirou, limpa e redireciona
  auth.logout();
  return false;
};

export const instrutorGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  const perfil = auth.getUserPerfil();

  if (perfil === 'PROFESSOR' || perfil === 'INSTRUTOR' || perfil === 'ADMINISTRADOR' || perfil === 'ADMIN') {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
