import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../core/layout/header/header.component';
import { SidebarComponent } from '../../core/layout/sidebar/sidebar.component';
import { AlunoService } from '../../core/services/aluno.service';
import { GamificacaoService } from '../../core/services/gamificacao.service';
import { AuthService } from '../../core/services/auth.service';
import type { AlunoProgresso, SaldoMoedasResponse, MatriculaProgresso } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>
      <div class="main-content">
        <app-sidebar></app-sidebar>
        <main class="content-area">
          <div class="container animate-fade-in">
            <!-- Header -->
            <div class="page-header">
              <div>
                <h1 class="page-title">Olá, {{ usuarioNome }}</h1>
                <p class="page-subtitle">Acompanhe seu progresso na plataforma</p>
              </div>
            </div>

            <!-- Loading -->
            @if (carregando()) {
              <div class="loading-state">
                <i class="ph ph-spinner"></i>
                <p>Carregando dados...</p>
              </div>
            }

            <!-- Error -->
            @if (erro()) {
              <div class="error-state glass-panel">
                <i class="ph ph-warning-circle"></i>
                <p>Não foi possível carregar os dados. Verifique se o backend está rodando.</p>
                <button class="btn btn-secondary" (click)="carregarDados()">Tentar Novamente</button>
              </div>
            }

            @if (!carregando() && !erro()) {
              <!-- Stats Cards -->
              <div class="stats-grid">
                <div class="stat-card glass-panel">
                  <div class="stat-icon plan-icon">
                    <i class="ph ph-crown-simple"></i>
                  </div>
                  <div class="stat-info">
                    <label>Plano</label>
                    <span class="stat-value" [class.premium]="progresso()?.tipoPlano === 'PREMIUM'">
                      {{ progresso()?.tipoPlano || 'BASICO' }}
                    </span>
                  </div>
                </div>

                <div class="stat-card glass-panel">
                  <div class="stat-icon cursos-icon">
                    <i class="ph ph-book-open"></i>
                  </div>
                  <div class="stat-info">
                    <label>Cursos Concluídos</label>
                    <span class="stat-value">{{ progresso()?.totalCursosConcluidos || 0 }}</span>
                  </div>
                </div>

                <div class="stat-card glass-panel">
                  <div class="stat-icon extras-icon">
                    <i class="ph ph-gift"></i>
                  </div>
                  <div class="stat-info">
                    <label>Cursos Extras</label>
                    <span class="stat-value">{{ progresso()?.saldoCursosExtras || 0 }}</span>
                  </div>
                </div>

                <div class="stat-card glass-panel">
                  <div class="stat-icon moedas-icon">
                    <i class="ph ph-coins"></i>
                  </div>
                  <div class="stat-info">
                    <label>Moedas</label>
                    <span class="stat-value">{{ saldoMoedas() }}</span>
                  </div>
                </div>
              </div>

              <!-- Upgrade Banner -->
              @if (mostrarUpgradeBanner()) {
                <div class="upgrade-banner glass-panel">
                  <i class="ph ph-rocket-launch"></i>
                  <div class="upgrade-content">
                    <h3>Falta pouco para o Premium!</h3>
                    <p>Conclua mais {{ 12 - (progresso()?.totalCursosConcluidos || 0) }} cursos para desbloquear benefícios exclusivos.</p>
                  </div>
                  <div class="upgrade-progress">
                    <div class="upgrade-bar">
                      <div class="upgrade-fill" [style.width.%]="upgradePercentual()"></div>
                    </div>
                    <span>{{ progresso()?.totalCursosConcluidos || 0 }}/12</span>
                  </div>
                </div>
              }

              <!-- Premium Banner -->
              @if (progresso()?.tipoPlano === 'PREMIUM') {
                <div class="premium-banner glass-panel">
                  <i class="ph ph-crown"></i>
                  <div>
                    <h3>Parabéns, você é Premium!</h3>
                    <p>Aproveite todos os benefícios do plano Premium.</p>
                  </div>
                </div>
              }

              <!-- Active Enrollments -->
              <div class="section">
                <h2 class="section-title">Minhas Matrículas</h2>
                @if (matriculas().length === 0) {
                  <div class="empty-state glass-panel">
                    <i class="ph ph-book"></i>
                    <p>Você ainda não está matriculado em nenhum curso.</p>
                    <a routerLink="/catalogo" class="btn btn-primary">Ver Cursos</a>
                  </div>
                } @else {
                  <div class="enrollments-list">
                    @for (mat of matriculas(); track mat.id) {
                      <div class="enrollment-card glass-panel">
                        <div class="enrollment-header">
                          <h3>Curso #{{ mat.cursoId }}</h3>
                          <span class="status-badge" [class.active]="mat.status === 'EM_ANDAMENTO'"
                                [class.done]="mat.status === 'CONCLUIDA'">
                            {{ mat.status }}
                          </span>
                        </div>
                        <div class="enrollment-progress">
                          <div class="enr-progress-bar">
                            <div class="enr-progress-fill" [style.width.%]="mat.percentualConcluido"></div>
                          </div>
                          <span class="enr-percent">{{ mat.percentualConcluido | number:'1.0-0' }}%</span>
                        </div>
                        <div class="enrollment-meta">
                          <span>Módulos: {{ mat.modulosConcluidos }}/{{ mat.totalModulos }}</span>
                          @if (mat.notaFinal) {
                            <span>Nota: {{ mat.notaFinal }}</span>
                          }
                        </div>
                        @if (mat.status === 'EM_ANDAMENTO') {
                          <a [routerLink]="['/aula', mat.cursoId]" [queryParams]="{matricula: mat.id}"
                             class="btn btn-primary btn-sm">
                            <i class="ph ph-play"></i> Continuar
                          </a>
                        }
                      </div>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper { min-height: 100vh; display: flex; flex-direction: column; }
    .main-content { display: flex; flex: 1; }
    .content-area { flex: 1; padding: var(--spacing-xl); }

    .page-header { margin-bottom: 2rem; }
    .page-title { font-size: 2rem; margin-bottom: 0.5rem; }
    .page-subtitle { color: var(--text-muted); }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .plan-icon { background: rgba(139,92,246,0.15); color: var(--primary-color); }
    .cursos-icon { background: rgba(16,185,129,0.15); color: var(--secondary-color); }
    .extras-icon { background: rgba(245,158,11,0.15); color: #f59e0b; }
    .moedas-icon { background: rgba(59,130,246,0.15); color: #3b82f6; }

    .stat-info label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.25rem; }
    .stat-value { font-size: 1.5rem; font-weight: 700; }
    .stat-value.premium { color: #f59e0b; }

    .upgrade-banner, .premium-banner {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }

    .upgrade-banner { background: linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.05)); }
    .premium-banner { background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05)); }

    .upgrade-banner i, .premium-banner i { font-size: 2.5rem; }
    .upgrade-banner i { color: var(--primary-color); }
    .premium-banner i { color: #f59e0b; }

    .upgrade-content { flex: 1; }
    .upgrade-content h3 { margin-bottom: 0.25rem; }
    .upgrade-content p { font-size: 0.85rem; color: var(--text-muted); }

    .upgrade-progress { text-align: center; min-width: 120px; }
    .upgrade-bar {
      height: 6px;
      background: rgba(255,255,255,0.1);
      border-radius: 3px;
      margin-bottom: 0.5rem;
      overflow: hidden;
    }
    .upgrade-fill {
      height: 100%;
      background: var(--primary-color);
      border-radius: 3px;
      transition: width 0.3s ease;
    }
    .upgrade-progress span { font-size: 0.85rem; font-weight: 600; color: var(--primary-color); }

    .section { margin-bottom: 3rem; }
    .section-title { font-size: 1.5rem; margin-bottom: 1.5rem; }

    .enrollments-list { display: flex; flex-direction: column; gap: 1rem; }

    .enrollment-card { padding: 1.5rem; }
    .enrollment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .enrollment-header h3 { font-size: 1.1rem; }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 600;
      background: rgba(100,116,139,0.2);
      color: var(--text-muted);
    }
    .status-badge.active { background: rgba(16,185,129,0.15); color: var(--secondary-color); }
    .status-badge.done { background: rgba(59,130,246,0.15); color: #3b82f6; }

    .enrollment-progress {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }
    .enr-progress-bar {
      flex: 1;
      height: 4px;
      background: rgba(255,255,255,0.1);
      border-radius: 2px;
      overflow: hidden;
    }
    .enr-progress-fill {
      height: 100%;
      background: var(--secondary-color);
      border-radius: 2px;
      transition: width 0.3s ease;
    }
    .enr-percent { font-size: 0.85rem; font-weight: 600; color: var(--secondary-color); }

    .enrollment-meta {
      display: flex;
      gap: 1.5rem;
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 1rem;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 3rem;
      gap: 1rem;
      color: var(--text-muted);
    }
    .empty-state i { font-size: 3rem; }

    .loading-state, .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4rem;
      gap: 0.75rem;
    }

    .btn {
      padding: 0.6rem 1.2rem; border-radius: var(--radius-md); font-weight: 600;
      font-size: 0.85rem; cursor: pointer; border: none; text-decoration: none;
      display: inline-flex; align-items: center; gap: 0.5rem;
    }
    .btn-primary { background: var(--primary-color); color: white; }
    .btn-secondary { background: rgba(255,255,255,0.1); color: var(--text-main); border: 1px solid var(--border-color); }
    .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.8rem; }
  `]
})
export class DashboardComponent implements OnInit {
  private alunoService = inject(AlunoService);
  private gamificacaoService = inject(GamificacaoService);
  private authService = inject(AuthService);

  carregando = signal(true);
  erro = signal(false);
  progresso = signal<AlunoProgresso | null>(null);
  matriculas = signal<MatriculaProgresso[]>([]);
  saldoMoedas = signal(0);

  get usuarioNome(): string {
    const u = this.authService.usuario();
    return u ? (u as any).nomeCompleto || 'Aluno' : 'Aluno';
  }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregando.set(true);
    this.erro.set(false);

    this.alunoService.getProgresso().subscribe({
      next: (data) => {
        this.progresso.set(data);
        this.carregarMatriculas();
      },
      error: () => {
        this.erro.set(true);
        this.carregando.set(false);
      }
    });

    this.gamificacaoService.getMoedas().subscribe({
      next: (data) => this.saldoMoedas.set(data.saldo),
      error: () => {}
    });
  }

  private carregarMatriculas(): void {
    this.alunoService.getMatriculas().subscribe({
      next: (data) => {
        this.matriculas.set(data);
        this.carregando.set(false);
      },
      error: () => {
        this.carregando.set(false);
      }
    });
  }

  mostrarUpgradeBanner(): boolean {
    const p = this.progresso();
    if (!p) return false;
    return p.tipoPlano !== 'PREMIUM' && p.totalCursosConcluidos < 12;
  }

  upgradePercentual(): number {
    const p = this.progresso();
    if (!p) return 0;
    return Math.min(100, (p.totalCursosConcluidos / 12) * 100);
  }
}
