import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-select-plan',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="enrollment-container">
      <div class="stepper">
        <div class="step active">1. Plano</div>
        <div class="step-line"></div>
        <div class="step">2. Dados</div>
        <div class="step-line"></div>
        <div class="step">3. Pagamento</div>
      </div>

      <div class="page-header text-center">
        <h2>Escolha seu Plano</h2>
        <p class="subtitle">Desbloqueie todo o seu potencial com nossos cursos</p>
      </div>

      <div class="plans-grid">
        <!-- Plan 1 -->
        <div class="plan-card glass-panel animate-fade-in">
          <div class="plan-header">
            <h3>Mensal</h3>
            <div class="price">R$ 49<span>/mês</span></div>
          </div>
          <ul class="plan-features">
            <li><i class="ph ph-check"></i> Acesso a todos os cursos</li>
            <li><i class="ph ph-check"></i> Certificados de conclusão</li>
            <li><i class="ph ph-check"></i> Suporte da comunidade</li>
          </ul>
          <a routerLink="/matricula/dados" class="btn btn-secondary btn-block">Escolher Plano Mensal</a>
        </div>

        <!-- Plan 2 -->
        <div class="plan-card glass-panel highlight animate-fade-in" style="animation-delay: 0.1s">
          <div class="popular-badge">Mais Popular</div>
          <div class="plan-header">
            <h3>Anual</h3>
            <div class="price">R$ 39<span>/mês</span></div>
            <p class="billed-yearly">Faturado R$ 468 por ano</p>
          </div>
          <ul class="plan-features">
            <li><i class="ph ph-check"></i> Tudo do plano mensal</li>
            <li><i class="ph ph-check"></i> Mentoria 1 a 1</li>
            <li><i class="ph ph-check"></i> Projetos práticos reais</li>
          </ul>
          <a routerLink="/matricula/dados" class="btn btn-primary btn-block">Escolher Plano Anual</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .enrollment-container {
      max-width: 900px;
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
    }

    .step.active {
      color: var(--primary-color);
      background: rgba(139, 92, 246, 0.1);
      border: 1px solid var(--primary-color);
    }

    .step-line {
      width: 50px;
      height: 2px;
      background: rgba(255, 255, 255, 0.1);
      margin: 0 0.5rem;
    }

    .text-center {
      text-align: center;
      margin-bottom: 3rem;
    }

    .subtitle {
      color: var(--text-muted);
      margin-top: 0.5rem;
    }

    .plans-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .plan-card {
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .plan-card.highlight {
      border-color: var(--primary-color);
      box-shadow: 0 0 30px rgba(139, 92, 246, 0.15);
      transform: scale(1.02);
    }

    .popular-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--primary-color);
      color: white;
      padding: 0.25rem 1rem;
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      font-weight: 600;
    }

    .plan-header {
      text-align: center;
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border-color);
    }

    .plan-header h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .price {
      font-size: 3rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .price span {
      font-size: 1rem;
      color: var(--text-muted);
      font-weight: 400;
    }

    .billed-yearly {
      font-size: 0.85rem;
      color: var(--secondary-color);
      margin-top: 0.5rem;
    }

    .plan-features {
      list-style: none;
      flex: 1;
      margin-bottom: 2rem;
    }

    .plan-features li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      color: var(--text-muted);
    }

    .plan-features i {
      color: var(--primary-color);
    }
  `]
})
export class SelectPlanComponent {}
