import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar glass-panel">
      <nav class="nav-menu">
        <div class="nav-section" *ngIf="!isInstrutor">
          <span class="nav-label">ALUNO</span>
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <i class="ph ph-books"></i>
            <span>Meus Cursos</span>
          </a>
          <a routerLink="/projetos/enviar" routerLinkActive="active" class="nav-item">
            <i class="ph ph-pencil-simple"></i>
            <span>Atividades</span>
          </a>
        </div>

        <div class="nav-section" *ngIf="isInstrutor" [class.mt-4]="!isInstrutor">
          <span class="nav-label">INSTRUTOR</span>
          <a routerLink="/instrutor/dashboard" routerLinkActive="active" class="nav-item">
            <i class="ph ph-chart-pie-slice"></i>
            <span>Dashboard</span>
          </a>
          <a routerLink="/instrutor/cursos/novo" routerLinkActive="active" class="nav-item">
            <i class="ph ph-plus-circle"></i>
            <span>Criar Curso</span>
          </a>
        </div>
        
        <div class="nav-spacer"></div>

        <a (click)="logout()" class="nav-item nav-logout" style="cursor: pointer;">
          <i class="ph ph-sign-out"></i>
          <span>Sair</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 260px;
      height: calc(100vh - 70px);
      position: sticky;
      top: 70px;
      border-radius: 0;
      border-left: none;
      border-bottom: none;
      border-top: none;
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
    }

    .nav-menu {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .nav-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .mt-4 {
      margin-top: 1.5rem;
    }

    .nav-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-muted);
      letter-spacing: 0.05em;
      padding-left: 1rem;
      margin-bottom: 0.25rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      color: var(--text-main);
      font-weight: 500;
      transition: all var(--transition-fast);
    }

    .nav-item i {
      font-size: 1.25rem;
      color: var(--text-muted);
      transition: color var(--transition-fast);
    }

    .nav-item:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .nav-item.active {
      background: linear-gradient(90deg, rgba(139, 92, 246, 0.2), transparent);
      border-left: 3px solid var(--primary-color);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      color: var(--primary-color);
    }

    .nav-item.active i {
      color: var(--primary-color);
    }

    .nav-spacer {
      flex: 1;
    }

    .nav-logout {
      color: var(--danger-color);
    }

    .nav-logout i {
      color: var(--danger-color);
    }

    .nav-logout:hover {
      background: rgba(239, 68, 68, 0.1);
    }
  `]
})
export class SidebarComponent {
  auth = inject(AuthService);
  router = inject(Router);

  get isInstrutor(): boolean {
    return this.auth.usuario()?.perfil === 'INSTRUTOR';
  }

  logout() {
    this.auth.logout();
  }
}
