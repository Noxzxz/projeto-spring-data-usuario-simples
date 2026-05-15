import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../core/layout/header/header.component';
import { SidebarComponent } from '../../core/layout/sidebar/sidebar.component';
import { CursosService } from '../../core/services/cursos.service';
import type { CursoSummary } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>

      <div class="main-content">
        <app-sidebar></app-sidebar>

        <main class="content-area">
          <div class="container animate-fade-in">
            <div class="page-header">
              <div>
                <h1 class="page-title">Cursos Disponíveis</h1>
                <p class="page-subtitle">Explore novos conhecimentos e expanda suas habilidades</p>
              </div>
              <div class="search-bar glass-panel">
                <i class="ph ph-magnifying-glass"></i>
                <input type="text" placeholder="Buscar cursos..." [(ngModel)]="termoBusca" (input)="filtrar()" id="input-busca">
              </div>
            </div>

            <div class="filters">
              <button class="filter-btn" [class.active]="filtroAtivo === 'TODOS'" (click)="setFiltro('TODOS')">Todos</button>
              <button class="filter-btn" [class.active]="filtroAtivo === 'Frontend'" (click)="setFiltro('Frontend')">Frontend</button>
              <button class="filter-btn" [class.active]="filtroAtivo === 'Backend'" (click)="setFiltro('Backend')">Backend</button>
              <button class="filter-btn" [class.active]="filtroAtivo === 'Design'" (click)="setFiltro('Design')">Design</button>
            </div>

            <!-- Loading -->
            <div *ngIf="carregando()" class="loading-state glass-panel">
              <i class="ph ph-spinner"></i>
              <p>Carregando cursos...</p>
            </div>

            <!-- Erro -->
            <div *ngIf="erro()" class="error-state glass-panel">
              <i class="ph ph-warning-circle"></i>
              <p>Não foi possível carregar os cursos. Verifique se o backend está rodando.</p>
            </div>

            <!-- Grade de Cursos -->
            <div class="course-grid" *ngIf="!carregando() && !erro()">
              <div class="course-card glass-panel" *ngFor="let curso of cursosFiltrados()">
                <div class="course-image"
                     [style.background-image]="'url(' + (curso.capUrl || imgFallback) + ')'">
                  <span class="badge" [ngClass]="badgeClass(curso.categoria)">{{ curso.categoria }}</span>
                  <span class="nivel-tag">{{ nivelLabel(curso.nivel) }}</span>
                </div>
                <div class="course-content">
                  <h3 class="course-title">{{ curso.titulo }}</h3>
                  <p class="course-desc">{{ curso.descricao }}</p>

                  <div class="course-meta">
                    <span><i class="ph ph-users"></i> {{ curso.totalAlunos }} alunos</span>
                    <span><i class="ph ph-clock"></i> {{ curso.duracaoTotal }}</span>
                    <span *ngIf="curso.avaliacao"><i class="ph ph-star"></i> {{ curso.avaliacao }}</span>
                  </div>

                  <div class="course-footer">
                    <span class="course-price">R$ {{ curso.preco | number:'1.2-2' }}</span>
                    <a routerLink="/matricula/planos" class="btn btn-primary">Matricular-se</a>
                  </div>
                </div>
              </div>

              <!-- Vazio -->
              <div *ngIf="cursosFiltrados().length === 0" class="empty-state glass-panel">
                <i class="ph ph-books"></i>
                <p>Nenhum curso encontrado.</p>
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

    .page-header {
      display: flex; justify-content: space-between; align-items: flex-end;
      margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;
    }
    .page-title { font-size: 2rem; margin-bottom: 0.5rem; }
    .page-subtitle { color: var(--text-muted); }

    .search-bar {
      display: flex; align-items: center; padding: 0.75rem 1rem; width: 300px; gap: 0.5rem;
    }
    .search-bar i { color: var(--text-muted); font-size: 1.2rem; }
    .search-bar input { background: transparent; border: none; color: var(--text-main); width: 100%; font-family: var(--font-family); }
    .search-bar input:focus { outline: none; }

    .filters { display: flex; gap: 0.5rem; margin-bottom: 2rem; overflow-x: auto; padding-bottom: 0.5rem; }
    .filter-btn {
      background: rgba(255,255,255,0.05); border: 1px solid var(--border-color);
      color: var(--text-muted); padding: 0.5rem 1.25rem; border-radius: var(--radius-full);
      font-family: var(--font-family); font-size: 0.9rem; font-weight: 500;
      cursor: pointer; white-space: nowrap; transition: all var(--transition-fast);
    }
    .filter-btn:hover { background: rgba(255,255,255,0.1); color: var(--text-main); }
    .filter-btn.active { background: var(--primary-color); color: white; border-color: var(--primary-color); }

    .course-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }

    .course-card { display: flex; flex-direction: column; overflow: hidden; padding: 0; }
    .course-image { height: 180px; background-size: cover; background-position: center; position: relative; }

    .badge {
      position: absolute; top: 1rem; left: 1rem; padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; backdrop-filter: blur(4px);
    }
    .badge-frontend { background: rgba(139,92,246,0.8); color: white; }
    .badge-backend  { background: rgba(16,185,129,0.8);  color: white; }
    .badge-design   { background: rgba(239,68,68,0.8);   color: white; }
    .badge-default  { background: rgba(100,116,139,0.8); color: white; }

    .nivel-tag {
      position: absolute; bottom: 0.75rem; right: 0.75rem; background: rgba(0,0,0,0.6);
      color: white; padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-size: 0.7rem;
    }

    .course-content { padding: 1.5rem; display: flex; flex-direction: column; flex: 1; }
    .course-title { font-size: 1.1rem; margin-bottom: 0.4rem; }
    .course-desc { font-size: 0.83rem; color: var(--text-muted); margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

    .course-meta { display: flex; gap: 1rem; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem; flex-wrap: wrap; }
    .course-meta span { display: flex; align-items: center; gap: 0.3rem; }

    .course-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
    .course-price { font-size: 1.1rem; font-weight: 700; color: var(--secondary-color); }

    .loading-state, .error-state, .empty-state {
      grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center;
      justify-content: center; padding: 3rem; gap: 1rem; color: var(--text-muted);
    }
    .loading-state i, .error-state i, .empty-state i { font-size: 3rem; }

    .btn { padding: 0.5rem 1.2rem; border-radius: var(--radius-md); font-weight: 600; font-size: 0.85rem; text-decoration: none; cursor: pointer; }
    .btn-primary { background: var(--primary-color); color: white; border: none; }
  `]
})
export class DashboardComponent implements OnInit {
  private cursosService = inject(CursosService);

  carregando = signal(true);
  erro = signal(false);
  cursos = signal<CursoSummary[]>([]);
  cursosFiltrados = signal<CursoSummary[]>([]);

  filtroAtivo = 'TODOS';
  termoBusca = '';
  imgFallback = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80';

  ngOnInit() {
    this.cursosService.listar().subscribe({
      next: (res) => {
        this.cursos.set(res.content);
        this.cursosFiltrados.set(res.content);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set(true);
        this.carregando.set(false);
      }
    });
  }

  setFiltro(categoria: string) {
    this.filtroAtivo = categoria;
    this.filtrar();
  }

  filtrar() {
    const lista = this.cursos();
    this.cursosFiltrados.set(
      lista.filter(c => {
        const porCategoria = this.filtroAtivo === 'TODOS' || c.categoria === this.filtroAtivo;
        const porBusca = !this.termoBusca || c.titulo.toLowerCase().includes(this.termoBusca.toLowerCase());
        return porCategoria && porBusca;
      })
    );
  }

  badgeClass(categoria: string): string {
    const map: Record<string, string> = {
      'Frontend': 'badge badge-frontend',
      'Backend': 'badge badge-backend',
      'Design': 'badge badge-design'
    };
    return map[categoria] ?? 'badge badge-default';
  }

  nivelLabel(nivel: string): string {
    const map: Record<string, string> = {
      'INICIANTE': 'Iniciante',
      'INTERMEDIARIO': 'Intermediário',
      'AVANCADO': 'Avançado'
    };
    return map[nivel] ?? nivel;
  }
}
