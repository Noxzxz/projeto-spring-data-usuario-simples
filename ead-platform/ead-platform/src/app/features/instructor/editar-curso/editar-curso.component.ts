import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { SidebarComponent } from '../../../core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-editar-curso',
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
                <h1 class="page-title">Editar Curso</h1>
                <p class="page-subtitle">Modifique as informações do curso existente</p>
              </div>
              <div class="actions">
                <button class="btn btn-secondary">
                  <i class="ph ph-eye"></i> Visualizar
                </button>
                <button class="btn btn-primary ml-2">
                  <i class="ph ph-floppy-disk"></i> Salvar Alterações
                </button>
              </div>
            </div>

            <div class="form-grid">
              <!-- Basic Info -->
              <div class="glass-panel form-section">
                <h3 class="section-title">Informações Básicas</h3>
                
                <div class="form-group">
                  <label class="form-label">Título do Curso</label>
                  <input type="text" class="form-input" value="Angular 19 Avançado">
                </div>

                <div class="form-group">
                  <label class="form-label">Descrição</label>
                  <textarea class="form-input textarea" rows="5">Aprenda a construir aplicações modernas com a versão mais recente do Angular, focando em Standalone Components, Signals e SSR.</textarea>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Categoria</label>
                    <select class="form-input">
                      <option selected>Desenvolvimento Web</option>
                      <option>Design</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Nível</label>
                    <select class="form-input">
                      <option>Iniciante</option>
                      <option>Intermediário</option>
                      <option selected>Avançado</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Media & Modules -->
              <div class="right-col">
                <div class="glass-panel form-section mb-4">
                  <h3 class="section-title">Capa do Curso</h3>
                  <div class="upload-cover has-image">
                    <div class="overlay">
                      <i class="ph ph-camera"></i>
                      <span>Alterar Imagem</span>
                    </div>
                  </div>
                </div>

                <div class="glass-panel form-section">
                  <div class="flex-between mb-3">
                    <h3 class="section-title mb-0">Grade Curricular</h3>
                    <button class="btn btn-secondary btn-sm"><i class="ph ph-plus"></i> Módulo</button>
                  </div>
                  
                  <div class="module-item">
                    <div class="module-drag"><i class="ph ph-dots-six-vertical"></i></div>
                    <div class="module-content">
                      <h4>Módulo 1: Fundamentos</h4>
                      <span class="text-muted">3 aulas</span>
                    </div>
                    <div class="module-actions">
                      <i class="ph ph-pencil-simple"></i>
                      <i class="ph ph-trash text-danger"></i>
                    </div>
                  </div>

                  <div class="module-item">
                    <div class="module-drag"><i class="ph ph-dots-six-vertical"></i></div>
                    <div class="module-content">
                      <h4>Módulo 2: Signals</h4>
                      <span class="text-muted">4 aulas</span>
                    </div>
                    <div class="module-actions">
                      <i class="ph ph-pencil-simple"></i>
                      <i class="ph ph-trash text-danger"></i>
                    </div>
                  </div>

                </div>
              </div>
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
    .actions { display: flex; gap: 1rem; }
    .ml-2 { margin-left: 0.5rem; }

    .form-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
    .form-section { padding: 2rem; }
    .section-title { font-size: 1.25rem; margin-bottom: 1.5rem; }
    .mb-0 { margin-bottom: 0; }
    .mb-3 { margin-bottom: 1rem; }
    .mb-4 { margin-bottom: 2rem; }

    .textarea { resize: vertical; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    select.form-input { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1em; }

    .upload-cover { border: 2px dashed var(--border-color); border-radius: var(--radius-md); padding: 3rem 1.5rem; text-align: center; cursor: pointer; transition: all var(--transition-fast); background: rgba(0,0,0,0.2); position: relative; overflow: hidden; }
    .upload-cover.has-image { border: none; background-image: url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'); background-size: cover; background-position: center; height: 200px; padding: 0; }
    .upload-cover .overlay { position: absolute; top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6); display:flex; flex-direction:column; align-items:center; justify-content:center; opacity:0; transition:opacity var(--transition-fast); }
    .upload-cover:hover .overlay { opacity: 1; }
    .upload-cover .overlay i { font-size: 2.5rem; margin-bottom: 0.5rem; }

    .flex-between { display: flex; justify-content: space-between; align-items: center; }
    .btn-sm { padding: 0.5rem 1rem; font-size: 0.85rem; }

    .module-item { display: flex; align-items: center; background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 0.75rem; }
    .module-drag { cursor: grab; padding-right: 1rem; color: var(--text-muted); font-size: 1.2rem; }
    .module-content { flex: 1; }
    .module-content h4 { margin-bottom: 0.25rem; font-size: 0.95rem; }
    .text-muted { font-size: 0.8rem; color: var(--text-muted); }
    .module-actions { display: flex; gap: 0.75rem; font-size: 1.1rem; color: var(--text-muted); cursor: pointer; }
    .module-actions i:hover { color: var(--text-main); }
    .text-danger:hover { color: var(--danger-color) !important; }
    
    @media (max-width: 992px) {
      .form-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class EditarCursoComponent {}
