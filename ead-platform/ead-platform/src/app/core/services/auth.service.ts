import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UsuarioSummary,
} from '../models';

const TOKEN_KEY = 'ead_access_token';
const USER_KEY = 'ead_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly base = `${environment.apiUrl}/auth`;

  // ── signals ──────────────────────────────────────────────
  private readonly _token = signal<string | null>(this._loadToken());
  private readonly _usuario = signal<UsuarioSummary | null>(this._loadUser());

  readonly token = this._token.asReadonly();
  readonly usuario = this._usuario.asReadonly();
  readonly isLogado = computed(() => {
    const t = this._token();
    return !!t && !this.isTokenExpirado();
  });

  // ── public API ───────────────────────────────────────────

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  isTokenExpirado(): boolean {
    const t = this._token();
    if (!t) return true;

    try {
      const decoded = this.decodeToken(t);
      if (!decoded || !decoded.exp) return false; // Se não tem exp, assumimos válido ou tratamos conforme regra

      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch {
      return true;
    }
  }

  getUserPerfil(): string | null {
    // 1. Tenta pegar do sinal do usuário (mais confiável se o token não for um JWT completo)
    const user = this._usuario();
    if (user && user.perfil) {
      return user.perfil;
    }

    // 2. Fallback para decodificação do token
    const t = this._token();
    if (!t) return null;
    const decoded = this.decodeToken(t);
    return decoded?.perfil || decoded?.role || null;
  }

  login(payload: LoginRequest) {
    return this.http
      .post<AuthResponse>(`${this.base}/login`, payload)
      .pipe(tap(res => this._persistSession(res)));
  }

  register(payload: RegisterRequest) {
    return this.http
      .post<AuthResponse>(`${this.base}/registrar`, payload)
      .pipe(tap(res => this._persistSession(res)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._token.set(null);
    this._usuario.set(null);
    this.router.navigate(['/auth/login']);
  }

  refreshToken() {
    return this.http
      .post<AuthResponse>(`${this.base}/refresh`, {})
      .pipe(
        tap(res => this._persistSession(res)),
        catchError(err => {
          this.logout();
          return throwError(() => err);
        }),
      );
  }

  // ── private helpers ──────────────────────────────────────

  private _persistSession(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.usuario));
    this._token.set(res.token);
    this._usuario.set(res.usuario);
  }

  private _loadToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private _loadUser(): UsuarioSummary | null {
    const raw = localStorage.getItem(USER_KEY);
    try {
      return raw ? (JSON.parse(raw) as UsuarioSummary) : null;
    } catch {
      return null;
    }
  }
}
