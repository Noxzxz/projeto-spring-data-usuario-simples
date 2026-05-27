import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { SidebarComponent } from '../../../core/layout/sidebar/sidebar.component';
import { AulaService } from '../../../core/services/aula.service';
import { CursosService } from '../../../core/services/cursos.service';
import { ProgressoService } from '../../../core/services/progresso.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-course-player',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>
      <div class="main-content">
        <app-sidebar></app-sidebar>
        <main class="content-area">
          <!-- Loading -->
          @if (carregando()) {
            <div class="loading-state">
              <i class="ph ph-spinner"></i>
              <p>Carregando aula...</p>
            </div>
          }

          <!-- Error -->
          @if (erro()) {
            <div class="error-state">
              <p>{{ erro() }}</p>
              <button class="btn btn-secondary" (click)="voltar()">Voltar</button>
            </div>
          }

          <!-- Content -->
          @if (aula() && !carregando()) {
            <div class="player-container animate-fade-in">
              <div class="video-section">
                @if (aula().tipoConteudo === 'VIDEO') {
                  <div class="video-wrapper glass-panel">
                    <iframe [src]="videoUrl()" frameborder="0" allowfullscreen class="video-iframe"></iframe>
                  </div>
                } @else if (aula().tipoConteudo === 'PDF' || aula().tipoConteudo === 'LINK') {
                  <div class="material-card glass-panel">
                    <i class="ph ph-file-text material-icon"></i>
                    <h3>{{ aula().titulo }}</h3>
                    <p>{{ aula().descricao }}</p>
                    <a [href]="aula().url" target="_blank" class="btn btn-primary">
                      <i class="ph ph-external-link"></i> Abrir Material
                    </a>
                  </div>
                }

                <div class="lesson-info">
                  <h1 class="lesson-title">{{ aula().titulo }}</h1>
                  <p class="lesson-desc">{{ aula().descricao }}</p>

                  <div class="lesson-actions">
                    <button class="btn btn-secondary" (click)="voltar()">
                      <i class="ph ph-arrow-left"></i> Voltar
                    </button>
                    <button class="btn btn-primary"
                            [disabled]="concluindo()"
                            (click)="concluirModulo()">
                      @if (concluindo()) {
                        <i class="ph ph-spinner"></i> Processando...
                      } @else {
                        <i class="ph ph-check"></i> Marcar como Concluída
                      }
                    </button>
                  </div>

                  @if (mensagem()) {
                    <div class="toast" [class.success]="mensagemTipo() === 'success'"
                         [class.error]="mensagemTipo() === 'error'">
                      {{ mensagem() }}
                    </div>
                  }

                  @if (cursoConcluido()) {
                    <div class="course-complete-banner">
                      <i class="ph ph-trophy"></i>
                      <div>
                        <h3>Parabéns! Curso concluído!</h3>
                        <p>Você concluiu todos os módulos deste curso.</p>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <div class="modules-sidebar glass-panel">
                <div class="sidebar-header">
                  <h3>Conteúdo do Curso</h3>
                  <span class="progress-text">{{ percentualGlobal() }}% concluído</span>
                </div>

                <div class="progress-bar-container">
                  <div class="progress-bar" [style.width.%]="percentualGlobal()"></div>
                </div>

                <div class="module-list">
                  @for (modulo of modulos(); track modulo.id) {
                    <div class="module">
                      <div class="module-title">
                        <div>
                          <h4>{{ modulo.titulo }}</h4>
                          <span class="module-meta">{{ modulo.aulas?.length || 0 }} aulas</span>
                        </div>
                        <i class="ph" [class.ph-caret-up]="moduloExpandido(modulo.id)"
                           [class.ph-caret-down]="!moduloExpandido(modulo.id)"></i>
                      </div>
                      @if (moduloExpandido(modulo.id)) {
                        <div class="lesson-list">
                          @for (aulaItem of modulo.aulas; track aulaItem.id) {
                            <div class="lesson-item"
                                 [class.active]="aulaItem.id === aula()?.id"
                                 [class.bloqueado]="getStatusAula(modulo.ordem) === 'BLOQUEADO'"
                                 (click)="navegarParaAula(aulaItem.id)">
                              <div class="lesson-status" [class.completed]="getStatusAula(modulo.ordem) === 'CONCLUIDO'">
                                <i class="ph"
                                   [class.ph-check-circle]="getStatusAula(modulo.ordem) === 'CONCLUIDO'"
                                   [class.ph-play-circle]="getStatusAula(modulo.ordem) === 'EM_ANDAMENTO'"
                                   [class.ph-lock]="getStatusAula(modulo.ordem) === 'BLOQUEADO'"></i>
                              </div>
                              <div class="lesson-details">
                                <span class="lesson-name">{{ aulaItem.titulo }}</span>
                                <span class="lesson-type">{{ tipoLabel(aulaItem.tipoConteudo) }}</span>
                              </div>
                            </div>
                          }
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper { min-height: 100vh; display: flex; flex-direction: column; }
    .main-content { display: flex; flex: 1; }
    .content-area { flex: 1; padding: var(--spacing-xl); padding-top: 2rem; }

    .player-container {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
      max-width: 1600px;
      margin: 0 auto;
    }

    .video-wrapper {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
      border-radius: var(--radius-lg);
      overflow: hidden;
      margin-bottom: 1.5rem;
    }

    .video-iframe {
      width: 100%;
      height: 100%;
    }

    .material-card {
      padding: 3rem;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .material-icon {
      font-size: 5rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .lesson-info { margin-bottom: 2rem; }
    .lesson-title { font-size: 1.75rem; margin-bottom: 0.5rem; }
    .lesson-desc { color: var(--text-muted); margin-bottom: 1.5rem; }

    .lesson-actions {
      display: flex;
      gap: 1rem;
      border-top: 1px solid var(--border-color);
      padding-top: 1.5rem;
    }

    .toast {
      margin-top: 1rem;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      font-weight: 500;
    }

    .toast.success { background: rgba(16,185,129,0.15); color: var(--secondary-color); }
    .toast.error { background: rgba(239,68,68,0.15); color: var(--danger-color); }

    .course-complete-banner {
      margin-top: 1.5rem;
      padding: 1.5rem;
      background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05));
      border: 1px solid rgba(245,158,11,0.3);
      border-radius: var(--radius-lg);
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .course-complete-banner i { font-size: 2.5rem; color: #f59e0b; }

    /* Module Sidebar */
    .modules-sidebar {
      padding: 1.5rem;
      height: fit-content;
      max-height: calc(100vh - 120px);
      overflow-y: auto;
      position: sticky;
      top: 90px;
    }

    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .sidebar-header h3 { font-size: 1.1rem; }
    .progress-text { font-size: 0.85rem; color: var(--primary-color); font-weight: 600; }

    .progress-bar-container {
      height: 4px;
      background: rgba(255,255,255,0.1);
      border-radius: 2px;
      margin-bottom: 1.5rem;
    }

    .progress-bar {
      height: 100%;
      background: var(--primary-color);
      border-radius: 2px;
      transition: width 0.3s ease;
    }

    .module { margin-bottom: 1rem; }

    .module-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 0.75rem;
      background: rgba(255,255,255,0.03);
      border-radius: var(--radius-md);
    }

    .module-title h4 { font-size: 0.9rem; margin-bottom: 0.2rem; }
    .module-meta { font-size: 0.75rem; color: var(--text-muted); }

    .lesson-list {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.5rem 0 0.5rem 0.5rem;
    }

    .lesson-item {
      display: flex;
      gap: 0.75rem;
      padding: 0.75rem;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .lesson-item:hover { background: rgba(255,255,255,0.05); }
    .lesson-item.active { background: rgba(139,92,246,0.1); border-left: 2px solid var(--primary-color); }
    .lesson-item.bloqueado { opacity: 0.4; cursor: not-allowed; }

    .lesson-status { display: flex; align-items: center; color: var(--text-muted); font-size: 1.2rem; }
    .lesson-status.completed { color: var(--secondary-color); }

    .lesson-details { display: flex; flex-direction: column; }
    .lesson-name { font-size: 0.85rem; font-weight: 500; }
    .lesson-type { font-size: 0.7rem; color: var(--text-muted); }

    .btn {
      padding: 0.6rem 1.2rem; border-radius: var(--radius-md); font-weight: 600;
      font-size: 0.85rem; cursor: pointer; border: none; text-decoration: none;
      display: inline-flex; align-items: center; gap: 0.5rem;
    }

    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-primary { background: var(--primary-color); color: white; }
    .btn-secondary { background: rgba(255,255,255,0.1); color: var(--text-main); }

    .loading-state, .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem;
      gap: 1rem;
    }

    .btn-secondary {
      background: rgba(255,255,255,0.1);
      color: var(--text-main);
      border: 1px solid var(--border-color);
    }

    @media (max-width: 1024px) {
      .player-container { grid-template-columns: 1fr; }
      .modules-sidebar { position: static; max-height: none; }
    }
  `]
})
export class CoursePlayerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private aulaService = inject(AulaService);
  private cursosService = inject(CursosService);
  private progressoService = inject(ProgressoService);
  private sanitizer = inject(DomSanitizer);

  aula = signal<any>(null);
  curso = signal<any>(null);
  modulos = signal<any[]>([]);
  matriculaId = signal<number | null>(null);
  progresso = signal<any>(null);
  modulosConcluidosData = signal<Set<number>>(new Set());
  modulosExpandidos = signal<Set<number>>(new Set([1]));
  carregando = signal(true);
  erro = signal<string | null>(null);
  concluindo = signal(false);
  mensagem = signal<string | null>(null);
  mensagemTipo = signal<'success' | 'error'>('success');
  cursoConcluido = signal(false);

  videoUrl = signal<SafeResourceUrl | null>(null);

  ngOnInit() {
    const aulaId = Number(this.route.snapshot.params['id']);
    const matriculaId = Number(this.route.snapshot.queryParams['matricula']);

    if (!aulaId) {
      this.erro.set('Aula não encontrada');
      this.carregando.set(false);
      return;
    }

    this.matriculaId.set(matriculaId || null);
    this.carregarAula(aulaId);
  }

  private carregarAula(aulaId: number): void {
    this.aulaService.buscarPorId(aulaId).subscribe({
      next: (aulaData) => {
        this.aula.set(aulaData);

        if (aulaData.tipoConteudo === 'VIDEO' && aulaData.url) {
          const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.converterParaEmbed(aulaData.url)
          );
          this.videoUrl.set(safeUrl);
        }

        this.carregarCurso(aulaData.cursoId);
      },
      error: () => {
        this.erro.set('Erro ao carregar aula');
        this.carregando.set(false);
      }
    });
  }

  private carregarCurso(cursoId: number): void {
    this.cursosService.buscarPorId(cursoId).subscribe({
      next: (res: any) => {
        const cursoData = res.data || res;
        this.curso.set(cursoData);
        this.modulos.set(cursoData.modulos || []);

        const ids = new Set<number>();
        (cursoData.modulos || []).forEach((m: any) => ids.add(m.id));
        this.modulosExpandidos.set(ids);

        if (this.matriculaId()) {
          this.carregarProgresso();
        } else {
          this.carregando.set(false);
          this.buscarMatricula(cursoId);
        }
      },
      error: () => {
        this.erro.set('Erro ao carregar curso');
        this.carregando.set(false);
      }
    });
  }

  private buscarMatricula(cursoId: number): void {
    this.cursosService.verificarMatricula(cursoId)?.subscribe({
      next: (matriculas: any[]) => {
        const mat = matriculas.find((m: any) => m.cursoId === cursoId);
        if (mat) {
          this.matriculaId.set(mat.id);
          this.carregarProgresso();
        } else {
          this.carregando.set(false);
        }
      },
      error: () => this.carregando.set(false)
    });
  }

  private carregarProgresso(): void {
    const id = this.matriculaId();
    if (!id) {
      this.carregando.set(false);
      return;
    }

    this.progressoService.getProgresso(id).subscribe({
      next: (prog) => {
        this.progresso.set(prog);
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false)
    });
  }

  getStatusAula(ordemModulo: number): string {
    const prog = this.progresso();
    if (!prog) return ordemModulo <= 1 ? 'EM_ANDAMENTO' : 'BLOQUEADO';
    const modConcluidos = prog.modulosConcluidos || 0;
    if (ordemModulo <= modConcluidos) return 'CONCLUIDO';
    if (ordemModulo === modConcluidos + 1) return 'EM_ANDAMENTO';
    return 'BLOQUEADO';
  }

  percentualGlobal(): number {
    const prog = this.progresso();
    if (!prog) return 0;
    return prog.percentualConcluido || 0;
  }

  moduloExpandido(moduloId: number): boolean {
    return this.modulosExpandidos().has(moduloId);
  }

  navegarParaAula(aulaId: number): void {
    this.router.navigate(['/aula', aulaId], {
      queryParams: { matricula: this.matriculaId() }
    }).then(() => window.location.reload());
  }

  concluirModulo(): void {
    const matId = this.matriculaId();
    if (!matId) {
      this.mensagem.set('Matrícula não encontrada');
      this.mensagemTipo.set('error');
      return;
    }

    const aulaAtual = this.aula();
    if (!aulaAtual) return;

    this.concluindo.set(true);
    this.mensagem.set(null);

    this.progressoService.concluirModulo(matId, aulaAtual.ordem)
      .pipe(finalize(() => this.concluindo.set(false)))
      .subscribe({
        next: (res) => {
          this.mensagem.set('Aula concluída com sucesso!');
          this.mensagemTipo.set('success');
          this.carregarProgresso();

          if (res.cursoConcluido) {
            this.cursoConcluido.set(true);
            this.mensagem.set('Parabéns! Curso concluído!');
          }

          setTimeout(() => this.mensagem.set(null), 3000);
        },
        error: (err) => {
          this.mensagem.set(err.error?.erro || 'Erro ao concluir aula');
          this.mensagemTipo.set('error');
          setTimeout(() => this.mensagem.set(null), 3000);
        }
      });
  }

  voltar(): void {
    this.router.navigate(['/catalogo']);
  }

  private converterParaEmbed(url: string): string {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  }

  tipoLabel(tipo: string): string {
    const map: Record<string, string> = {
      'VIDEO': 'Vídeo',
      'PDF': 'Material PDF',
      'LINK': 'Link Externo',
      'AULA_SINCRONA_GRAVADA': 'Aula Gravada'
    };
    return map[tipo] || tipo;
  }
}
