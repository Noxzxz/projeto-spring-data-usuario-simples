import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CursosService } from '../../../core/services/cursos.service';
import { CursoDetalhe } from '../../../core/models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-curso-detalhe',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="curso" class="curso-detalhe-container animate-fade-in">
      <!-- Hero Section -->
      <section class="hero-section" [style.background-image]="'linear-gradient(rgba(10, 11, 14, 0.8), rgba(10, 11, 14, 0.95)), url(' + (curso.capUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop') + ')'">
        <div class="container hero-content">
          <div class="breadcrumb">
            <a routerLink="/catalogo">Catálogo</a>
            <i class="ph ph-caret-right"></i>
            <span>{{ curso.categoria }}</span>
          </div>
          
          <h1 class="titulo-curso">{{ curso.titulo }}</h1>
          <p class="descricao-curso">{{ curso.descricao }}</p>

          <div class="hero-stats">
            <div class="stat-item">
              <i class="ph ph-users-three"></i>
              <span>{{ curso.totalAlunos }} alunos matriculados</span>
            </div>
            <div class="stat-item">
              <i class="ph ph-star-fill"></i>
              <span>{{ curso.avaliacao || 4.5 }} (128 avaliações)</span>
            </div>
            <div class="stat-item">
              <i class="ph ph-chalkboard-teacher"></i>
              <span>Instrutor: {{ curso.instrutor?.nomeCompleto || 'Especialista' }}</span>
            </div>
          </div>
        </div>
      </section>

      <div class="container main-content">
        <!-- Coluna Esquerda: Info e Conteúdo -->
        <div class="content-column">
          <!-- Info Cards (RF045) -->
          <section class="info-cards-section">
            <h2 class="section-title">Sobre este curso</h2>
            <div class="info-grid">
              <div class="info-card glass-panel">
                <i class="ph ph-chart-bar-horizontal"></i>
                <div class="info-text">
                  <label>Nível</label>
                  <span>{{ curso.nivel }}</span>
                </div>
              </div>
              <div class="info-card glass-panel">
                <i class="ph ph-clock"></i>
                <div class="info-text">
                  <label>Carga Horária</label>
                  <span>{{ curso.duracaoTotal }}</span>
                </div>
              </div>
              <div class="info-card glass-panel">
                <i class="ph ph-users"></i>
                <div class="info-text">
                  <label>Público-Alvo</label>
                  <span>{{ curso.publicoAlvo || 'Estudantes e Profissionais' }}</span>
                </div>
              </div>
              <div class="info-card glass-panel">
                <i class="ph ph-brain"></i>
                <div class="info-text">
                  <label>Conhecimentos Prévios</label>
                  <span>{{ curso.conhecimentosPrevios || 'Nenhum requisito específico' }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Módulos (Simulados conforme DTO) -->
          <section class="modulos-section">
            <h2 class="section-title">Conteúdo do Curso</h2>
            <div class="modulos-list">
              <div *ngFor="let modulo of curso.modulos; let i = index" class="modulo-item glass-panel">
                <div class="modulo-header">
                  <span class="modulo-index">Módulo {{ i + 1 }}</span>
                  <h3>{{ modulo.titulo }}</h3>
                  <span class="modulo-meta">{{ modulo.totalAulas }} aulas • {{ modulo.duracaoTotal }}</span>
                </div>
                <div class="aulas-list">
                  <div *ngFor="let aula of modulo.aulas" class="aula-item">
                    <i class="ph ph-play-circle"></i>
                    <span>{{ aula.titulo }}</span>
                    <span class="aula-duracao">{{ aula.duracao }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Coluna Direita: Matrícula -->
        <aside class="sidebar">
          <div class="enroll-card glass-panel">
            <div class="price-tag">
              <span class="amount">{{ curso.preco | currency:'BRL' }}</span>
              <span class="access-type">{{ curso.tipoAcesso }}</span>
            </div>

            <button 
              class="btn btn-primary btn-block btn-lg" 
              [disabled]="enrolling"
              (click)="onMatricular()">
              <span *ngIf="!enrolling && !jaMatriculado">Matricular-se Agora</span>
              <span *ngIf="enrolling">Processando...</span>
              <span *ngIf="jaMatriculado">Continuar Curso</span>
              <i class="ph" [class.ph-arrow-right]="!jaMatriculado" [class.ph-play]="jaMatriculado"></i>
            </button>

            <ul class="benefit-list">
              <li><i class="ph ph-check"></i> Acesso vitalício ao conteúdo</li>
              <li><i class="ph ph-certificate"></i> Certificado de conclusão</li>
              <li><i class="ph ph-device-mobile"></i> Assista no celular ou tablet</li>
              <li><i class="ph ph-chat-centered-text"></i> Suporte direto com instrutor</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>

    <!-- Loading State -->
    <div *ngIf="loading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styles: [`
    .curso-detalhe-container {
      min-height: 100vh;
      padding-bottom: 5rem;
    }

    .hero-section {
      padding: 4rem 0;
      background-size: cover;
      background-position: center;
      color: white;
      margin-bottom: 3rem;
    }

    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-lg);
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 2rem;
    }

    .breadcrumb a {
      color: var(--primary-color);
      text-decoration: none;
    }

    .titulo-curso {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
      line-height: 1.1;
    }

    .descricao-curso {
      font-size: 1.2rem;
      color: var(--text-muted);
      max-width: 800px;
      margin-bottom: 2.5rem;
      line-height: 1.6;
    }

    .hero-stats {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.95rem;
      color: #cbd5e1;
    }

    .stat-item i {
      color: var(--primary-color);
      font-size: 1.25rem;
    }

    .main-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 3rem;
      padding: 0 var(--spacing-lg);
    }

    .section-title {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      font-weight: 700;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 4rem;
    }

    .info-card {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.25rem;
      border-radius: var(--radius-lg);
    }

    .info-card i {
      font-size: 2rem;
      color: var(--primary-color);
    }

    .info-text label {
      display: block;
      font-size: 0.75rem;
      text-transform: uppercase;
      color: var(--text-muted);
      letter-spacing: 0.05em;
      margin-bottom: 0.25rem;
    }

    .info-text span {
      font-weight: 600;
      color: var(--text-main);
    }

    .modulos-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .modulo-item {
      padding: 1.5rem;
    }

    .modulo-header {
      margin-bottom: 1.5rem;
    }

    .modulo-index {
      font-size: 0.75rem;
      color: var(--primary-color);
      font-weight: 700;
      display: block;
      margin-bottom: 0.25rem;
    }

    .modulo-meta {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .aulas-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }

    .aula-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
      color: var(--text-muted);
    }

    .aula-duracao {
      margin-left: auto;
      font-size: 0.8rem;
    }

    /* Sidebar & Enroll Card */
    .enroll-card {
      position: sticky;
      top: 2rem;
      padding: 2rem;
      border-radius: var(--radius-xl);
      background: rgba(30, 41, 59, 0.5);
    }

    .price-tag {
      margin-bottom: 2rem;
      text-align: center;
    }

    .price-tag .amount {
      font-size: 2.5rem;
      font-weight: 800;
      display: block;
      color: var(--text-main);
    }

    .price-tag .access-type {
      font-size: 0.85rem;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    .benefit-list {
      margin-top: 2rem;
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .benefit-list li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
      color: var(--text-muted);
    }

    .benefit-list i {
      color: var(--secondary-color);
    }

    .loading-overlay {
      height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 1024px) {
      .main-content {
        grid-template-columns: 1fr;
      }
      .sidebar {
        order: -1;
      }
      .enroll-card {
        position: relative;
        top: 0;
        margin-bottom: 2rem;
      }
    }
  `]
})
export class CourseDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cursosService = inject(CursosService);

  curso?: CursoDetalhe;
  loading = true;
  enrolling = false;
  jaMatriculado = false;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.carregarCurso(Number(id));
      this.verificarStatusMatricula(Number(id));
    }
  }

  carregarCurso(id: number): void {
    this.loading = true;
    this.cursosService.buscarPorId(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res: any) => {
          // A API retorna ApiResponse<CursoDetalhe>
          this.curso = res.data;
        },
        error: () => this.router.navigate(['/catalogo'])
      });
  }

  verificarStatusMatricula(id: number): void {
    this.cursosService.verificarMatricula(id)?.subscribe(matriculas => {
      this.jaMatriculado = matriculas.some((m: any) => m.cursoId === id);
    });
  }

  onMatricular(): void {
    if (this.jaMatriculado) {
      // Ir para o player de aula (rota mock por enquanto)
      this.router.navigate(['/aula', this.curso?.id]);
      return;
    }

    if (!this.curso) return;

    this.enrolling = true;
    this.cursosService.matricular(this.curso.id)
      .pipe(finalize(() => this.enrolling = false))
      .subscribe({
        next: () => {
          this.jaMatriculado = true;
          // Feedback opcional ou navegação direta
        },
        error: (err) => alert('Erro ao realizar matrícula. Tente novamente.')
      });
  }
}
