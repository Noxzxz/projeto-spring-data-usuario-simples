import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card glass-panel animate-fade-in">
        <div class="auth-header">
          <div class="logo">
            <i class="ph ph-user-plus"></i>
          </div>
          <h2>Criar Conta</h2>
          <p class="subtitle">Junte-se à nossa plataforma de ensino hoje mesmo</p>
        </div>

        <form class="auth-form" (submit)="onRegister($event)">
          <div class="form-group">
            <label class="form-label">Nome Completo</label>
            <div class="input-with-icon">
              <i class="ph ph-user"></i>
              <input type="text" class="form-input" placeholder="Seu nome completo" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">E-mail</label>
            <div class="input-with-icon">
              <i class="ph ph-envelope-simple"></i>
              <input type="email" class="form-input" placeholder="seu@email.com" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Senha</label>
              <div class="input-with-icon">
                <i class="ph ph-lock-key"></i>
                <input type="password" class="form-input" placeholder="••••••••" required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Confirmar Senha</label>
              <div class="input-with-icon">
                <i class="ph ph-lock-key"></i>
                <input type="password" class="form-input" placeholder="••••••••" required>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-block">
            <span>Cadastrar e Começar</span>
            <i class="ph ph-arrow-right"></i>
          </button>
        </form>

        <div class="auth-footer">
          <p>Já possui uma conta? <a routerLink="/auth/login">Faça Login</a></p>
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
      max-width: 500px;
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
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05));
      border: 1px solid var(--secondary-color);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
    }

    .logo i {
      font-size: 2.5rem;
      color: var(--secondary-color);
    }

    h2 {
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-label {
      margin-bottom: var(--spacing-sm);
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
      color: var(--secondary-color);
    }

    .auth-footer a:hover {
      color: #059669;
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
      opacity: 0.3;
    }

    .glow-1 {
      top: -100px;
      right: -100px;
      background: var(--secondary-color);
    }

    .glow-2 {
      bottom: -100px;
      left: -100px;
      background: var(--primary-color);
    }
  `]
})
export class RegisterComponent {
  constructor(private router: Router) {}

  onRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard']);
  }
}
