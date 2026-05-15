import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-personal-data',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="enrollment-container">
      <div class="stepper">
        <div class="step completed"><i class="ph ph-check"></i> Plano</div>
        <div class="step-line active-line"></div>
        <div class="step active">2. Dados</div>
        <div class="step-line"></div>
        <div class="step">3. Pagamento</div>
      </div>

      <div class="form-container glass-panel animate-fade-in">
        <div class="page-header text-center">
          <h2>Dados Pessoais</h2>
          <p class="subtitle">Complete seu perfil para continuar</p>
        </div>

        <form class="data-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nome Completo</label>
              <input type="text" class="form-input" value="Evelyn" required>
            </div>
            <div class="form-group">
              <label class="form-label">CPF</label>
              <input type="text" class="form-input" placeholder="000.000.000-00" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">E-mail</label>
            <input type="email" class="form-input" value="evelyn@example.com" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">CEP</label>
              <input type="text" class="form-input" placeholder="00000-000">
            </div>
            <div class="form-group">
              <label class="form-label">Celular</label>
              <input type="text" class="form-input" placeholder="(00) 00000-0000">
            </div>
          </div>

          <div class="actions">
            <a routerLink="/matricula/planos" class="btn btn-secondary">Voltar</a>
            <a routerLink="/matricula/pagamento" class="btn btn-primary">Prosseguir para Pagamento <i class="ph ph-arrow-right"></i></a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .enrollment-container {
      max-width: 800px;
      margin: 0 auto;
      padding: var(--spacing-xl);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .stepper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 3rem;
    }

    .step {
      font-weight: 500;
      color: var(--text-muted);
      padding: 0.5rem 1rem;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .step.active {
      color: var(--primary-color);
      background: rgba(139, 92, 246, 0.1);
      border: 1px solid var(--primary-color);
    }

    .step.completed {
      color: var(--secondary-color);
      border: 1px solid var(--secondary-color);
      background: rgba(16, 185, 129, 0.1);
    }

    .step-line {
      width: 50px;
      height: 2px;
      background: rgba(255, 255, 255, 0.1);
      margin: 0 0.5rem;
    }

    .step-line.active-line {
      background: var(--secondary-color);
    }

    .text-center {
      text-align: center;
      margin-bottom: 2rem;
    }

    .subtitle {
      color: var(--text-muted);
      margin-top: 0.5rem;
    }

    .form-container {
      padding: 2.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
    }
  `]
})
export class PersonalDataComponent {}
