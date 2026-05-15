import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router      = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      switch (err.status) {
        case 401:
          authService.logout();
          break;
        case 403:
          router.navigate(['/acesso-negado']);
          break;
        case 0:
          console.error('[EAD] Servidor indisponível ou sem conexão.');
          break;
        default:
          console.error(`[EAD] Erro HTTP ${err.status}: ${err.message}`);
      }
      return throwError(() => err);
    }),
  );
};
