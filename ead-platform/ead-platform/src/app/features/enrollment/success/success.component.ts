import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="enrollment-container">
      <div class="success-card glass-panel animate-fade-in">
        <div class="success-icon-wrapper">
          <div class="success-icon">
            <i class="ph ph-check-circle"></i>
          </div>
          <div class="glow-effect"></div>
        </div>
        
        <h2>Matrícula Realizada com Sucesso!</h2>
        <p class="subtitle">Bem-vindo(a) à nossa plataforma. Seu pagamento foi processado e seu acesso já está liberado.</p>
        
        <div class="receipt-box">
          <div class="receipt-row">
            <span>Plano Adquirido</span>
            <strong>Plano Anual Premium</strong>
          </div>
          <div class="receipt-row">
            <span>Valor Pago</span>
            <strong>R$ 468,00</strong>
          </div>
          <div class="receipt-row">
            <span>Método</span>
            <strong>Cartão de Crédito final 4242</strong>
          </div>
          <div class="receipt-row">
            <span>Nº do Pedido</span>
            <strong>#ORD-987654321</strong>
          </div>
        </div>

        <div class="actions">
          <button class="btn btn-secondary"><i class="ph ph-receipt"></i> Baixar Recibo</button>
          <a routerLink="/dashboard" class="btn btn-primary">
            Acessar Meus Cursos <i class="ph ph-arrow-right"></i>
          </a>
        </div>
      </div>
      
      <div class="confetti-bg"></div>
    </div>
  `,
  styles: [`
    .enrollment-container {
      max-width: 600px;
      margin: 0 auto;
      padding: var(--spacing-xl);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }

    .success-card {
      padding: 3rem;
      text-align: center;
      position: relative;
      z-index: 10;
    }

    .success-icon-wrapper {
      position: relative;
      width: 120px;
      height: 120px;
      margin: 0 auto 2rem;
    }

    .success-icon {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--secondary-color), #059669);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
    }

    .success-icon i {
      font-size: 4rem;
      color: white;
    }

    .glow-effect {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 150%;
      height: 150%;
      background: var(--secondary-color);
      filter: blur(40px);
      opacity: 0.3;
      z-index: 1;
      border-radius: 50%;
      animation: pulse 2s infinite alternate;
    }

    @keyframes pulse {
      0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.2; }
      100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.4; }
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: var(--secondary-color);
    }

    .subtitle {
      color: var(--text-muted);
      margin-bottom: 2.5rem;
      font-size: 1.1rem;
      line-height: 1.6;
    }

    .receipt-box {
      background: rgba(0, 0, 0, 0.2);
      border: 1px dashed var(--border-color);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      margin-bottom: 2.5rem;
      text-align: left;
    }

    .receipt-row {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .receipt-row:last-child {
      border-bottom: none;
    }

    .receipt-row span {
      color: var(--text-muted);
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .confetti-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 20%),
                        radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 20%),
                        radial-gradient(circle at 50% 80%, rgba(239, 68, 68, 0.1) 0%, transparent 30%);
      z-index: 1;
      pointer-events: none;
    }
  `]
})
export class SuccessComponent {}
