import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { SidebarComponent } from '../../../core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-criar-curso',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>
      
      <div class="main-content">
        <app-sidebar></app-sidebar>
        
        <main class="content-area">
          <div class="container animate-fade-in">
            <div class="back-link">
              <a routerLink="/instrutor/dashboard"><i class="ph ph-arrow-left"></i> Voltar para Dashboard</a>
            </div>

            <div class="page-header">
              <div>
                <h1 class="page-title">Criar Novo Curso</h1>
                <p class="page-subtitle">Preencha as informações básicas para iniciar a construção do seu curso</p>
              </div>
              <button class="btn btn-primary">
                <i class="ph ph-floppy-disk"></i> Salvar Rascunho
              </button>
            </div>

            <div class="form-grid">
              <!-- Basic Info -->
              <div class="glass-panel form-section">
                <h3 class="section-title">Informações Básicas</h3>
                
                <div class="form-group">
                  <label class="form-label">Título do Curso</label>
                  <input type="text" class="form-input" placeholder="Ex: Masterclass de Angular 19">
                </div>

                <div class="form-group">
                  <label class="form-label">Descrição</label>
                  <textarea class="form-input textarea" rows="5" placeholder="Descreva o que os alunos aprenderão neste curso..."></textarea>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Categoria</label>
                    <select class="form-input">
                      <option>Desenvolvimento Web</option>
                      <option>Design</option>
                      <option>Marketing</option>
                      <option>Negócios</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Nível</label>
                    <select class="form-input">
                      <option>Iniciante</option>
                      <option>Intermediário</option>
                      <option>Avançado</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Media & Modules -->
              <div class="right-col">
                <div class="glass-panel form-section mb-4">
                  <h3 class="section-title">Capa do Curso</h3>
                  <div class="upload-cover">
                    <i class="ph ph-image"></i>
                    <p>Arraste a imagem ou clique para fazer upload</p>
                    <span class="text-muted">1920x1080 recomendado</span>
                  </div>
                </div>

                <div class="glass-panel form-section">
                  <div class="flex-between mb-3">
                    <h3 class="section-title mb-0">Grade Curricular</h3>
                    <button class="btn btn-secondary btn-sm"><i class="ph ph-plus"></i> Módulo</button>
                  </div>
                  
                  <div class="empty-state">
                    <i class="ph ph-list-dashes"></i>
                    <p>Você ainda não adicionou módulos a este curso.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="actions-footer mt-4">
              <button class="btn btn-danger"><i class="ph ph-x"></i> Cancelar</button>
              <button class="btn btn-primary"><i class="ph ph-paper-plane-right"></i> Publicar Curso</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper { min-height: 100vh; display: flex; flex-direction: column; }
    .main-content { display: flex; flex: 1; }
    .content-area { flex: 1; padding-bottom: var(--spacing-xl); }

    .back-link { margin-bottom: 2rem; }
    .back-link a { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-weight: 500; }
    .back-link a:hover { color: var(--primary-color); }

    .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; }
    .page-title { font-size: 2rem; margin-bottom: 0.5rem; }
    .page-subtitle { color: var(--text-muted); }

    .form-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
    .form-section { padding: 2rem; }
    .section-title { font-size: 1.25rem; margin-bottom: 1.5rem; }
    .mb-0 { margin-bottom: 0; }
    .mb-3 { margin-bottom: 1rem; }
    .mb-4 { margin-bottom: 2rem; }
    .mt-4 { margin-top: 2rem; }

    .textarea { resize: vertical; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    select.form-input { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1em; }

    .upload-cover { border: 2px dashed var(--border-color); border-radius: var(--radius-md); padding: 3rem 1.5rem; text-align: center; cursor: pointer; transition: all var(--transition-fast); background: rgba(0,0,0,0.2); }
    .upload-cover:hover { border-color: var(--primary-color); background: rgba(139, 92, 246, 0.05); }
    .upload-cover i { font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem; }
    .upload-cover p { font-weight: 500; margin-bottom: 0.5rem; }

    .flex-between { display: flex; justify-content: space-between; align-items: center; }
    .btn-sm { padding: 0.5rem 1rem; font-size: 0.85rem; }

    .empty-state { text-align: center; padding: 2rem 1rem; color: var(--text-muted); }
    .empty-state i { font-size: 3rem; margin-bottom: 1rem; opacity: 0.5; }

    .actions-footer { display: flex; justify-content: flex-end; gap: 1rem; padding-top: 2rem; border-top: 1px solid var(--border-color); }
    
    @media (max-width: 992px) {
      .form-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class CriarCursoComponent {}
