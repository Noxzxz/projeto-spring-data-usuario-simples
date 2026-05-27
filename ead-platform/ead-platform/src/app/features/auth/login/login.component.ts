import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card glass-panel animate-fade-in">
        <div class="auth-header">
          <div class="logo">
            <i class="ph ph-graduation-cap"></i>
          </div>
          <h2>Bem-vindo de volta</h2>
          <p class="subtitle">Acesse sua conta para continuar aprendendo</p>
        </div>

        <div *ngIf="errorMessage" class="alert-danger">
          {{ errorMessage }}
        </div>

        <form class="auth-form" [formGroup]="loginForm" (ngSubmit)="onLogin()">
          <div class="form-group">
            <label class="form-label">E-mail</label>
            <div class="input-with-icon">
              <i class="ph ph-envelope-simple"></i>
              <input 
                type="email" 
                class="form-input" 
                [class.is-invalid]="isFieldInvalid('email')"
                placeholder="seu@email.com" 
                formControlName="email">
            </div>
            <div *ngIf="isFieldInvalid('email')" class="invalid-feedback">
              <span *ngIf="loginForm.get('email')?.errors?.['required']">O e-mail é obrigatório.</span>
              <span *ngIf="loginForm.get('email')?.errors?.['email']">Informe um e-mail válido.</span>
            </div>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label class="form-label">Senha</label>
              <a href="#" class="forgot-password">Esqueceu a senha?</a>
            </div>
            <div class="input-with-icon">
              <i class="ph ph-lock-key"></i>
              <input 
                type="password" 
                class="form-input" 
                [class.is-invalid]="isFieldInvalid('senha')"
                placeholder="••••••••" 
                formControlName="senha">
            </div>
            <div *ngIf="isFieldInvalid('senha')" class="invalid-feedback">
              <span *ngIf="loginForm.get('senha')?.errors?.['required']">A senha é obrigatória.</span>
              <span *ngIf="loginForm.get('senha')?.errors?.['minlength']">A senha deve ter no mínimo 6 caracteres.</span>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-block" [disabled]="loading">
            <span *ngIf="!loading">Entrar na Plataforma</span>
            <span *ngIf="loading">Entrando...</span>
            <i class="ph ph-arrow-right" *ngIf="!loading"></i>
          </button>
        </form>

        <div class="auth-footer">
          <p>Ainda não tem uma conta? <a routerLink="/auth/cadastro">Cadastre-se agora</a></p>
        </div>
      </div>
      
      <div class="auth-bg-elements">
        <div class="glow glow-1"></div>
        <div class="glow glow-2"></div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-xl);
      position: relative;
      overflow: hidden;
    }

    .auth-card {
      width: 100%;
      max-width: 440px;
      padding: 2.5rem;
      position: relative;
      z-index: 10;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo {
      width: 64px;
      height: 64px;
      margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05));
      border: 1px solid var(--primary-color);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
    }

    .logo i {
      font-size: 2.5rem;
      color: var(--primary-color);
    }

    h2 {
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-sm);
    }

    .label-row .form-label {
      margin-bottom: 0;
    }

    .forgot-password {
      font-size: 0.8rem;
    }

    .input-with-icon {
      position: relative;
    }

    .input-with-icon i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      font-size: 1.2rem;
    }

    .input-with-icon .form-input {
      padding-left: 3rem;
    }

    .btn-block {
      margin-top: 1.5rem;
      padding: 1rem;
      font-size: 1.1rem;
    }

    .auth-footer {
      margin-top: 2rem;
      text-align: center;
      font-size: 0.9rem;
      color: var(--text-muted);
    }

    .auth-footer a {
      font-weight: 600;
    }

    /* Background Effects */
    .auth-bg-elements {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      overflow: hidden;
      pointer-events: none;
    }

    .glow {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.4;
    }

    .glow-1 {
      top: -100px;
      left: -100px;
      background: var(--primary-color);
    }

    .glow-2 {
      bottom: -100px;
      right: -100px;
      background: var(--secondary-color);
    }
  `]
})
export class LoginComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    
    this.auth.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading = false;
        const perfil = this.auth.getUserPerfil();
        if (perfil === 'PROFESSOR' || perfil === 'INSTRUTOR') {
          this.router.navigate(['/instrutor/dashboard']);
        } else if (perfil === 'ADMINISTRADOR' || perfil === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.mensagem || 'E-mail ou senha incorretos.';
      }
    });
  }
}
