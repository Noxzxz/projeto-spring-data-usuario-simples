import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CursosService } from '../../../core/services/cursos.service';
import { CursoSummary } from '../../../core/models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="catalogo-container container animate-fade-in">
      <header class="catalogo-header">
        <div class="header-content">
          <h1>Catálogo de Cursos</h1>
          <p class="subtitle">Explore nossa biblioteca de conhecimento e acelere sua carreira</p>
        </div>
      </header>

      <!-- Erro de Rede -->
      <div *ngIf="errorMessage" class="error-state glass-panel">
        <i class="ph ph-warning-circle"></i>
        <h3>Ops! Erro ao carregar</h3>
        <p>{{ errorMessage }}</p>
        <button class="btn btn-primary" (click)="carregarCursos()">Tentar Novamente</button>
      </div>

      <!-- Skeleton Loading -->
      <div *ngIf="loading" class="cursos-grid">
        <div *ngFor="let item of [1,2,3]" class="curso-card skeleton"></div>
      </div>

      <!-- Lista de Cursos -->
      <div *ngIf="!loading && !errorMessage" class="cursos-grid">
        <div *ngFor="let curso of cursos" class="curso-card glass-panel">
          <div class="curso-capa">
            <img [src]="curso.capUrl || 'https://placehold.co/600x400/16181f/f8fafc?text=Curso'" [alt]="curso.titulo">
            <div class="curso-badge" [class]="curso.nivel.toLowerCase()">{{ curso.nivel }}</div>
          </div>
          
          <div class="curso-info">
            <div class="categoria">{{ curso.categoria }}</div>
            <h3>{{ curso.titulo }}</h3>
            <p class="descricao">{{ curso.descricao }}</p>
            
            <div class="publico-alvo">
              <i class="ph ph-users"></i>
              <span>{{ curso.publicoAlvo || 'Público Geral' }}</span>
            </div>

            <div class="curso-stats">
              <span><i class="ph ph-clock"></i> {{ curso.duracaoTotal }}</span>
              <span><i class="ph ph-star"></i> {{ curso.avaliacao || 'Novo' }}</span>
            </div>

            <div class="curso-footer">
              <div class="preco">
                <span *ngIf="curso.preco > 0">{{ curso.preco | currency:'BRL' }}</span>
                <span *ngIf="curso.preco === 0" class="gratis">Gratuito</span>
              </div>
              <button class="btn btn-primary btn-sm" [routerLink]="['/curso', curso.id]">
                Acessar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado Vazio -->
      <div *ngIf="!loading && !errorMessage && cursos.length === 0" class="empty-state">
        <p>Nenhum curso disponível no momento.</p>
      </div>
    </div>
  `,
  styles: [`
    .catalogo-container {
      padding-top: var(--spacing-xl);
      padding-bottom: var(--spacing-xl);
    }

    .catalogo-header {
      margin-bottom: 3rem;
      text-align: center;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, var(--text-main), var(--primary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .cursos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }

    .curso-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
    }

    .curso-capa {
      position: relative;
      height: 180px;
      overflow: hidden;
    }

    .curso-capa img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-normal);
    }

    .curso-card:hover .curso-capa img {
      transform: scale(1.05);
    }

    .curso-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.1);
    }

    .curso-badge.iniciante { background: rgba(16, 185, 129, 0.2); color: #34d399; }
    .curso-badge.intermediario { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
    .curso-badge.avancado { background: rgba(239, 68, 68, 0.2); color: #f87171; }

    .curso-info {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .categoria {
      color: var(--primary-color);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
      line-height: 1.4;
    }

    .descricao {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 1.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .publico-alvo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 1rem;
      padding: 0.5rem;
      background: rgba(255,255,255,0.03);
      border-radius: var(--radius-sm);
    }

    .curso-stats {
      display: flex;
      gap: 1rem;
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-bottom: 1.5rem;
    }

    .curso-stats i {
      color: var(--primary-color);
    }

    .curso-footer {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }

    .preco {
      font-size: 1.25rem;
      font-weight: 700;
    }

    .gratis {
      color: var(--secondary-color);
    }

    .error-state {
      text-align: center;
      padding: 4rem;
      max-width: 500px;
      margin: 2rem auto;
    }

    .error-state i {
      font-size: 3rem;
      color: var(--danger-color);
      margin-bottom: 1rem;
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    /* Skeleton Loading Animation */
    .skeleton {
      background: linear-gradient(90deg, var(--bg-glass) 25%, var(--bg-glass-hover) 50%, var(--bg-glass) 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      min-height: 400px;
    }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `]
})
export class CatalogoComponent implements OnInit {
  private readonly cursosService = inject(CursosService);

  cursos: CursoSummary[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.carregarCursos();
  }

  carregarCursos(): void {
    this.loading = true;
    this.errorMessage = '';

    this.cursosService.listar()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res) => {
          this.cursos = res.content;
        },
        error: (err) => {
          console.error('[Catálogo] Erro:', err);
          this.errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.';
        }
      });
  }
}
