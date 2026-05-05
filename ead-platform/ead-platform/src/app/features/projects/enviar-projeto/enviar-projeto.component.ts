import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { SidebarComponent } from '../../../core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-enviar-projeto',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>
      
      <div class="main-content">
        <app-sidebar></app-sidebar>
        
        <main class="content-area">
          <div class="container-sm animate-fade-in">
            <div class="back-link">
              <a routerLink="/aula/1"><i class="ph ph-arrow-left"></i> Voltar para a Aula</a>
            </div>

            <div class="activity-header">
              <h1 class="page-title">Enviar Atividade</h1>
              <p class="page-subtitle">Aula: 1. Introdução ao Componente Autônomo</p>
            </div>

            <div class="upload-card glass-panel">
              <div class="instructions">
                <h3>Instruções da Tarefa</h3>
                <p>Crie um componente autônomo simples em Angular exibindo "Olá Mundo" e faça o upload do arquivo .ts ou do projeto compactado em .zip.</p>
              </div>

              <form class="upload-form">
                <div class="form-group">
                  <label class="form-label">Comentários (Opcional)</label>
                  <textarea class="form-input textarea" rows="4" placeholder="Adicione algum comentário sobre sua entrega..."></textarea>
                </div>

                <div class="upload-zone">
                  <i class="ph ph-cloud-arrow-up upload-icon"></i>
                  <h4>Arraste e solte seus arquivos aqui</h4>
                  <p>ou clique para procurar no seu computador</p>
                  <span class="file-limits">Tamanho máximo: 50MB. Formatos aceitos: .zip, .rar, .ts, .pdf</span>
                  <input type="file" class="file-input" multiple>
                </div>

                <!-- Lista de Arquivos (simulação) -->
                <div class="file-list">
                  <div class="file-item">
                    <i class="ph ph-file-zip file-icon"></i>
                    <div class="file-details">
                      <span class="file-name">meu-componente.zip</span>
                      <span class="file-size">1.2 MB</span>
                    </div>
                    <button type="button" class="remove-btn"><i class="ph ph-x"></i></button>
                  </div>
                </div>

                <button type="button" class="btn btn-primary btn-block">
                  <i class="ph ph-paper-plane-tilt"></i> Enviar Atividade
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      display: flex;
      flex: 1;
    }

    .content-area {
      flex: 1;
      padding-bottom: var(--spacing-xl);
    }

    .back-link {
      margin-bottom: 2rem;
    }

    .back-link a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-muted);
      font-weight: 500;
    }

    .back-link a:hover {
      color: var(--primary-color);
    }

    .activity-header {
      margin-bottom: 2rem;
    }

    .page-title {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .page-subtitle {
      color: var(--primary-color);
      font-weight: 500;
    }

    .upload-card {
      padding: 2.5rem;
    }

    .instructions {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border-color);
    }

    .instructions h3 {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    .instructions p {
      color: var(--text-muted);
      line-height: 1.6;
    }

    .textarea {
      resize: vertical;
      font-family: var(--font-family);
    }

    .upload-zone {
      border: 2px dashed var(--primary-color);
      border-radius: var(--radius-lg);
      padding: 3rem 2rem;
      text-align: center;
      background: rgba(139, 92, 246, 0.05);
      position: relative;
      transition: all var(--transition-fast);
      margin-bottom: 1.5rem;
    }

    .upload-zone:hover {
      background: rgba(139, 92, 246, 0.1);
    }

    .upload-icon {
      font-size: 4rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .upload-zone h4 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    .upload-zone p {
      color: var(--text-muted);
      margin-bottom: 0.5rem;
    }

    .file-limits {
      font-size: 0.8rem;
      color: var(--text-muted);
      opacity: 0.8;
    }

    .file-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }

    .file-list {
      margin-bottom: 2rem;
    }

    .file-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      gap: 1rem;
    }

    .file-icon {
      font-size: 2rem;
      color: var(--primary-color);
    }

    .file-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .file-name {
      font-weight: 500;
    }

    .file-size {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .remove-btn {
      background: transparent;
      border: none;
      color: var(--danger-color);
      cursor: pointer;
      font-size: 1.2rem;
      padding: 0.5rem;
      border-radius: var(--radius-full);
      transition: all var(--transition-fast);
    }

    .remove-btn:hover {
      background: rgba(239, 68, 68, 0.1);
    }
  `]
})
export class EnviarProjetoComponent {}
