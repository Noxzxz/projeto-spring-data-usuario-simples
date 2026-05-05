import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { SidebarComponent } from '../../../core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>
      
      <div class="main-content">
        <app-sidebar></app-sidebar>
        
        <main class="content-area">
          <div class="container animate-fade-in">
            <div class="page-header">
              <div>
                <h1 class="page-title">Dashboard do Instrutor</h1>
                <p class="page-subtitle">Gerencie seus cursos e acompanhe seus alunos</p>
              </div>
              <a routerLink="/instrutor/cursos/novo" class="btn btn-primary">
                <i class="ph ph-plus"></i> Novo Curso
              </a>
            </div>

            <div class="stats-grid">
              <div class="stat-card glass-panel">
                <div class="stat-icon"><i class="ph ph-users"></i></div>
                <div class="stat-info">
                  <h3>Total de Alunos</h3>
                  <div class="stat-value">1.284</div>
                </div>
              </div>
              <div class="stat-card glass-panel">
                <div class="stat-icon" style="color: var(--secondary-color)"><i class="ph ph-books"></i></div>
                <div class="stat-info">
                  <h3>Cursos Ativos</h3>
                  <div class="stat-value">4</div>
                </div>
              </div>
              <div class="stat-card glass-panel">
                <div class="stat-icon" style="color: #f59e0b"><i class="ph ph-star"></i></div>
                <div class="stat-info">
                  <h3>Avaliação Média</h3>
                  <div class="stat-value">4.8</div>
                </div>
              </div>
            </div>

            <h2 class="section-title">Seus Cursos</h2>
            
            <div class="course-list glass-panel">
              <div class="course-list-header">
                <div class="col-name">Nome do Curso</div>
                <div class="col-status">Status</div>
                <div class="col-students">Alunos</div>
                <div class="col-actions">Ações</div>
              </div>

              <!-- Course Row 1 -->
              <div class="course-list-item">
                <div class="col-name">
                  <strong>Angular 19 Avançado</strong>
                  <span class="text-muted">Atualizado há 2 dias</span>
                </div>
                <div class="col-status"><span class="badge badge-success">Publicado</span></div>
                <div class="col-students">842</div>
                <div class="col-actions">
                  <a routerLink="/instrutor/cursos/1/editar" class="icon-btn"><i class="ph ph-pencil-simple"></i></a>
                  <button class="icon-btn btn-danger-text" (click)="openDeleteModal()"><i class="ph ph-trash"></i></button>
                </div>
              </div>

              <!-- Course Row 2 -->
              <div class="course-list-item">
                <div class="col-name">
                  <strong>React e Next.js Masterclass</strong>
                  <span class="text-muted">Atualizado há 1 mês</span>
                </div>
                <div class="col-status"><span class="badge badge-success">Publicado</span></div>
                <div class="col-students">442</div>
                <div class="col-actions">
                  <a routerLink="/instrutor/cursos/2/editar" class="icon-btn"><i class="ph ph-pencil-simple"></i></a>
                  <button class="icon-btn btn-danger-text" (click)="openDeleteModal()"><i class="ph ph-trash"></i></button>
                </div>
              </div>

              <!-- Course Row 3 -->
              <div class="course-list-item">
                <div class="col-name">
                  <strong>Introdução ao TypeScript</strong>
                  <span class="text-muted">Criado hoje</span>
                </div>
                <div class="col-status"><span class="badge badge-warning">Rascunho</span></div>
                <div class="col-students">0</div>
                <div class="col-actions">
                  <a routerLink="/instrutor/cursos/3/editar" class="icon-btn"><i class="ph ph-pencil-simple"></i></a>
                  <button class="icon-btn btn-danger-text" (click)="openDeleteModal()"><i class="ph ph-trash"></i></button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <!-- Delete Modal Overlay -->
      <div class="modal-overlay" *ngIf="showDeleteModal">
        <div class="modal-card glass-panel animate-fade-in">
          <div class="modal-icon text-danger">
            <i class="ph ph-warning-circle"></i>
          </div>
          <h3>Excluir Curso?</h3>
          <p>Tem certeza que deseja excluir este curso? Esta ação não pode ser desfeita e todo o conteúdo, bem como o progresso dos alunos, será perdido permanentemente.</p>
          
          <div class="modal-actions">
            <button class="btn btn-secondary" (click)="closeDeleteModal()">Cancelar</button>
            <button class="btn btn-danger" (click)="confirmDelete()">Sim, Excluir Curso</button>
          </div>
        </div>
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

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2.5rem;
    }

    .page-title {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .page-subtitle {
      color: var(--text-muted);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: var(--primary-color);
    }

    .stat-info h3 {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 0.25rem;
      font-weight: 500;
    }

    .stat-value {
      font-size: 1.75rem;
      font-weight: 700;
    }

    .section-title {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    .course-list {
      padding: 0;
      overflow: hidden;
    }

    .course-list-header {
      display: flex;
      padding: 1rem 1.5rem;
      background: rgba(0, 0, 0, 0.2);
      border-bottom: 1px solid var(--border-color);
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .course-list-item {
      display: flex;
      padding: 1rem 1.5rem;
      align-items: center;
      border-bottom: 1px solid var(--border-color);
      transition: background var(--transition-fast);
    }

    .course-list-item:last-child {
      border-bottom: none;
    }

    .course-list-item:hover {
      background: rgba(255, 255, 255, 0.02);
    }

    .col-name { flex: 2; display: flex; flex-direction: column; }
    .col-status { flex: 1; }
    .col-students { flex: 1; color: var(--text-muted); }
    .col-actions { flex: 0 0 100px; display: flex; gap: 0.5rem; justify-content: flex-end; }

    .text-muted {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 0.2rem;
    }

    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 600;
    }

    .badge-success { background: rgba(16, 185, 129, 0.1); color: var(--secondary-color); border: 1px solid rgba(16, 185, 129, 0.2); }
    .badge-warning { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); }

    .icon-btn {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid transparent;
      color: var(--text-main);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .icon-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .btn-danger-text {
      color: var(--danger-color);
    }

    .btn-danger-text:hover {
      background: rgba(239, 68, 68, 0.1);
      color: var(--danger-hover);
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .modal-card {
      width: 100%;
      max-width: 450px;
      padding: 2.5rem;
      text-align: center;
    }

    .modal-icon {
      font-size: 4rem;
      color: var(--danger-color);
      margin-bottom: 1rem;
    }

    .modal-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .modal-card p {
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 2rem;
    }

    .modal-actions {
      display: flex;
      gap: 1rem;
    }

    .modal-actions .btn {
      flex: 1;
    }
  `]
})
export class InstructorDashboardComponent {
  showDeleteModal = false;

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDelete() {
    // API Call to delete
    this.showDeleteModal = false;
  }
}
