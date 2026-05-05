import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card glass-panel animate-fade-in">
        <div class="auth-header">
          <div class="logo">
            <i class="ph ph-graduation-cap"></i>
          </div>
          <h2>Bem-vindo de volta</h2>
          <p class="subtitle">Acesse sua conta para continuar aprendendo</p>
          <div style="background: rgba(139, 92, 246, 0.1); padding: 0.75rem; border-radius: 8px; margin-top: 1rem; font-size: 0.8rem; border: 1px dashed var(--primary-color);">
            <strong>Dica de Teste:</strong><br>
            Use um e-mail com <em>"instrutor"</em> para acessar como Instrutor.<br>Qualquer outro e-mail entrará como Aluno.
          </div>
        </div>

        <form class="auth-form" (submit)="onLogin($event)">
          <div class="form-group">
            <label class="form-label">E-mail</label>
            <div class="input-with-icon">
              <i class="ph ph-envelope-simple"></i>
              <input type="email" class="form-input" placeholder="seu@email.com" [(ngModel)]="email" name="email" required>
            </div>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label class="form-label">Senha</label>
              <a href="#" class="forgot-password">Esqueceu a senha?</a>
            </div>
            <div class="input-with-icon">
              <i class="ph ph-lock-key"></i>
              <input type="password" class="form-input" placeholder="••••••••" [(ngModel)]="senha" name="senha" required>
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
export class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);

  email = '';
  senha = '';
  loading = false;

  onLogin(event: Event) {
    event.preventDefault();
    this.loading = true;
    
    this.auth.login({ email: this.email, senha: this.senha }).subscribe({
      next: () => {
        this.loading = false;
        const isInstrutor = this.auth.usuario()?.perfil === 'INSTRUTOR';
        if (isInstrutor) {
          this.router.navigate(['/instrutor/dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
