import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
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

        <div *ngIf="errorMessage" class="alert-danger">
          {{ errorMessage }}
        </div>

        <form class="auth-form" [formGroup]="registerForm" (ngSubmit)="onRegister()">
          <div class="form-group">
            <label class="form-label">Nome Completo</label>
            <div class="input-with-icon">
              <i class="ph ph-user"></i>
              <input 
                type="text" 
                class="form-input" 
                [class.is-invalid]="isFieldInvalid('nomeCompleto')"
                placeholder="Seu nome completo" 
                formControlName="nomeCompleto">
            </div>
            <div *ngIf="isFieldInvalid('nomeCompleto')" class="invalid-feedback">
              O nome é obrigatório.
            </div>
          </div>

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
              <span *ngIf="registerForm.get('email')?.errors?.['required']">O e-mail é obrigatório.</span>
              <span *ngIf="registerForm.get('email')?.errors?.['email']">Informe um e-mail válido.</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Senha</label>
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
                <span *ngIf="registerForm.get('senha')?.errors?.['required']">Obrigatório.</span>
                <span *ngIf="registerForm.get('senha')?.errors?.['minlength']">Mín. 6 chars.</span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Confirmar</label>
              <div class="input-with-icon">
                <i class="ph ph-lock-key"></i>
                <input 
                  type="password" 
                  class="form-input" 
                  [class.is-invalid]="isFieldInvalid('confirmarSenha') || registerForm.errors?.['passwordsMismatch']"
                  placeholder="••••••••" 
                  formControlName="confirmarSenha">
              </div>
              <div *ngIf="isFieldInvalid('confirmarSenha')" class="invalid-feedback">
                Obrigatório.
              </div>
            </div>
          </div>
          
          <div *ngIf="registerForm.errors?.['passwordsMismatch'] && registerForm.get('confirmarSenha')?.touched" class="invalid-feedback" style="margin-bottom: 1rem;">
            As senhas não coincidem.
          </div>

          <button type="submit" class="btn btn-primary btn-block" [disabled]="loading">
            <span *ngIf="!loading">Cadastrar e Começar</span>
            <span *ngIf="loading">Cadastrando...</span>
            <i class="ph ph-arrow-right" *ngIf="!loading"></i>
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
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  registerForm!: FormGroup;
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nomeCompleto: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha');
    const confirmarSenha = control.get('confirmarSenha');
    return senha && confirmarSenha && senha.value !== confirmarSenha.value 
      ? { passwordsMismatch: true } 
      : null;
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.auth.register(this.registerForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.mensagem || 'Erro ao realizar cadastro. Tente novamente.';
      }
    });
  }
}
