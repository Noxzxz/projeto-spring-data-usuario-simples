import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="enrollment-container">
      <div class="stepper">
        <div class="step completed"><i class="ph ph-check"></i> Plano</div>
        <div class="step-line active-line"></div>
        <div class="step completed"><i class="ph ph-check"></i> Dados</div>
        <div class="step-line active-line"></div>
        <div class="step active">3. Pagamento</div>
      </div>

      <div class="payment-grid animate-fade-in">
        <div class="payment-methods glass-panel">
          <h3>Método de Pagamento</h3>
          
          <div class="method-selector">
            <div class="method-option active">
              <i class="ph ph-credit-card"></i> Cartão de Crédito
            </div>
            <div class="method-option">
              <i class="ph ph-qr-code"></i> PIX
            </div>
          </div>

          <form class="card-form">
            <div class="form-group">
              <label class="form-label">Número do Cartão</label>
              <div class="input-with-icon">
                <i class="ph ph-credit-card"></i>
                <input type="text" class="form-input" placeholder="0000 0000 0000 0000">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Nome impresso no cartão</label>
              <input type="text" class="form-input" placeholder="EVELYN CHIAPERINI">
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Validade</label>
                <input type="text" class="form-input" placeholder="MM/AA">
              </div>
              <div class="form-group">
                <label class="form-label">CVC</label>
                <input type="text" class="form-input" placeholder="123">
              </div>
            </div>
          </form>
        </div>

        <div class="order-summary glass-panel">
          <h3>Resumo do Pedido</h3>
          
          <div class="summary-item">
            <span>Plano Anual</span>
            <span>R$ 468,00</span>
          </div>
          <div class="summary-item">
            <span>Desconto</span>
            <span class="discount">- R$ 0,00</span>
          </div>
          
          <div class="summary-total">
            <span>Total</span>
            <span>R$ 468,00</span>
          </div>

          <a routerLink="/matricula/sucesso" class="btn btn-primary btn-block finish-btn">
            Finalizar Compra Segura <i class="ph ph-lock-key"></i>
          </a>
          <p class="secure-text"><i class="ph ph-shield-check"></i> Ambiente 100% seguro e criptografado</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .enrollment-container {
      max-width: 1000px;
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

    .payment-grid {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: 2rem;
    }

    .payment-methods, .order-summary {
      padding: 2rem;
    }

    h3 {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .method-selector {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .method-option {
      flex: 1;
      padding: 1rem;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
      font-weight: 500;
      transition: all var(--transition-fast);
    }

    .method-option.active {
      border-color: var(--primary-color);
      background: rgba(139, 92, 246, 0.1);
      color: var(--primary-color);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
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

    .summary-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      color: var(--text-muted);
    }

    .discount {
      color: var(--secondary-color);
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .finish-btn {
      margin-top: 2rem;
      padding: 1.2rem;
      font-size: 1.1rem;
    }

    .secure-text {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.8rem;
      color: var(--secondary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
    }
  `]
})
export class PaymentComponent {}
