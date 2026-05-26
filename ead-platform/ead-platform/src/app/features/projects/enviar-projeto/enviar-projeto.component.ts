import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { SidebarComponent } from '../../../core/layout/sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-enviar-projeto',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>
      <div class="main-content">
        <app-sidebar></app-sidebar>
        <main class="content-area">
          <div class="container-sm animate-fade-in">
            <div class="back-link">
              <a routerLink="/catalogo"><i class="ph ph-arrow-left"></i> Voltar</a>
            </div>

            <div class="activity-header">
              <h1 class="page-title">Enviar Projeto</h1>
              <p class="page-subtitle">Faça o upload do seu projeto final para avaliação</p>
            </div>

            @if (mensagem()) {
              <div class="alert" [class.success]="mensagemTipo() === 'success'"
                   [class.error]="mensagemTipo() === 'error'">
                {{ mensagem() }}
              </div>
            }

            <div class="upload-card glass-panel">
              <div class="instructions">
                <h3>Instruções</h3>
                <p>Envie o arquivo do seu projeto. Formatos aceitos: PDF, DOCX, ZIP (máx 10MB).</p>
              </div>

              <div class="form-group">
                <label class="form-label">Matrícula ID</label>
                <input type="number" class="form-input" [(ngModel)]="matriculaId" placeholder="ID da matrícula">
              </div>

              <div class="form-group">
                <label class="form-label">Aula ID</label>
                <input type="number" class="form-input" [(ngModel)]="aulaId" placeholder="ID da aula">
              </div>

              <div class="form-group">
                <label class="form-label">Comentários (Opcional)</label>
                <textarea class="form-input textarea" rows="4" [(ngModel)]="comentario"
                          placeholder="Adicione algum comentário sobre sua entrega..."></textarea>
              </div>

              <div class="upload-zone" (dragover)="$event.preventDefault()" (drop)="onDrop($event)">
                <i class="ph ph-cloud-arrow-up upload-icon"></i>
                <h4>Arraste e solte seus arquivos aqui</h4>
                <p>ou clique para procurar</p>
                <span class="file-limits">PDF, DOCX, ZIP - Máx 10MB</span>
                <input type="file" class="file-input" (change)="onFileSelected($event)" accept=".pdf,.docx,.zip">
              </div>

              @if (arquivoSelecionado()) {
                <div class="file-list">
                  <div class="file-item">
                    <i class="ph ph-file file-icon"></i>
                    <div class="file-details">
                      <span class="file-name">{{ arquivoSelecionado()?.name }}</span>
                      <span class="file-size">{{ (arquivoSelecionado()?.size || 0) / 1024 | number:'1.0-0' }} KB</span>
                    </div>
                    <button type="button" class="remove-btn" (click)="arquivoSelecionado.set(null)">
                      <i class="ph ph-x"></i>
                    </button>
                  </div>
                </div>
              }

              @if (uploadProgresso() > 0 && uploadProgresso() < 100) {
                <div class="progress-container">
                  <div class="upload-progress" [style.width.%]="uploadProgresso()"></div>
                  <span class="progress-label">{{ uploadProgresso() }}%</span>
                </div>
              }

              <button class="btn btn-primary btn-block"
                      [disabled]="enviando() || !arquivoSelecionado() || !matriculaId || !aulaId"
                      (click)="enviar()">
                @if (enviando()) {
                  <i class="ph ph-spinner"></i> Enviando...
                } @else {
                  <i class="ph ph-paper-plane-tilt"></i> Enviar Projeto
                }
              </button>
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
    .back-link a { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-weight: 500; text-decoration: none; }
    .back-link a:hover { color: var(--primary-color); }

    .activity-header { margin-bottom: 2rem; }
    .page-title { font-size: 2rem; margin-bottom: 0.5rem; }
    .page-subtitle { color: var(--primary-color); font-weight: 500; }

    .alert {
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      margin-bottom: 1rem;
      font-weight: 500;
    }
    .alert.success { background: rgba(16,185,129,0.15); color: var(--secondary-color); }
    .alert.error { background: rgba(239,68,68,0.15); color: var(--danger-color); }

    .upload-card { padding: 2.5rem; }
    .instructions { margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border-color); }
    .instructions h3 { margin-bottom: 0.5rem; }
    .instructions p { color: var(--text-muted); }

    .form-group { margin-bottom: 1.5rem; }
    .form-label { display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem; }
    .form-input {
      width: 100%; padding: 0.75rem 1rem; background: rgba(255,255,255,0.05);
      border: 1px solid var(--border-color); border-radius: var(--radius-md);
      color: var(--text-main); font-family: var(--font-family); font-size: 0.9rem;
    }
    .form-input:focus { outline: none; border-color: var(--primary-color); }
    .textarea { resize: vertical; }

    .upload-zone {
      border: 2px dashed var(--primary-color);
      border-radius: var(--radius-lg);
      padding: 3rem 2rem;
      text-align: center;
      background: rgba(139,92,246,0.05);
      position: relative;
      transition: all var(--transition-fast);
      margin-bottom: 1.5rem;
    }
    .upload-zone:hover { background: rgba(139,92,246,0.1); }
    .upload-icon { font-size: 4rem; color: var(--primary-color); margin-bottom: 1rem; }
    .upload-zone h4 { font-size: 1.2rem; margin-bottom: 0.5rem; }
    .upload-zone p { color: var(--text-muted); margin-bottom: 0.5rem; }
    .file-limits { font-size: 0.8rem; color: var(--text-muted); }
    .file-input { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }

    .file-list { margin-bottom: 1.5rem; }
    .file-item {
      display: flex; align-items: center; padding: 1rem;
      background: rgba(255,255,255,0.05); border: 1px solid var(--border-color);
      border-radius: var(--radius-md); gap: 1rem;
    }
    .file-icon { font-size: 2rem; color: var(--primary-color); }
    .file-details { flex: 1; display: flex; flex-direction: column; }
    .file-name { font-weight: 500; }
    .file-size { font-size: 0.8rem; color: var(--text-muted); }
    .remove-btn { background: transparent; border: none; color: var(--danger-color); cursor: pointer; font-size: 1.2rem; }
    .remove-btn:hover { background: rgba(239,68,68,0.1); border-radius: var(--radius-full); padding: 0.5rem; }

    .progress-container {
      margin-bottom: 1.5rem;
      height: 8px;
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
      position: relative;
      overflow: hidden;
    }
    .upload-progress {
      height: 100%;
      background: var(--primary-color);
      border-radius: 4px;
      transition: width 0.3s ease;
    }
    .progress-label {
      position: absolute;
      right: 0;
      top: -1.5rem;
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .btn {
      padding: 0.75rem 1.5rem; border-radius: var(--radius-md); font-weight: 600;
      font-size: 0.9rem; cursor: pointer; border: none; text-decoration: none;
      display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
    }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-primary { background: var(--primary-color); color: white; }
    .btn-block { width: 100%; }
  `]
})
export class EnviarProjetoComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  matriculaId: number | null = null;
  aulaId: number | null = null;
  comentario = '';
  arquivoSelecionado = signal<File | null>(null);
  enviando = signal(false);
  uploadProgresso = signal(0);
  mensagem = signal<string | null>(null);
  mensagemTipo = signal<'success' | 'error'>('success');

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.arquivoSelecionado.set(input.files[0]);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.arquivoSelecionado.set(event.dataTransfer.files[0]);
    }
  }

  enviar(): void {
    const file = this.arquivoSelecionado();
    if (!file || !this.matriculaId || !this.aulaId) return;

    if (file.size > 10 * 1024 * 1024) {
      this.mensagem.set('Arquivo muito grande. Máximo: 10MB');
      this.mensagemTipo.set('error');
      return;
    }

    this.enviando.set(true);
    this.mensagem.set(null);
    this.uploadProgresso.set(0);

    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('matriculaId', String(this.matriculaId));
    formData.append('aulaId', String(this.aulaId));
    if (this.comentario) formData.append('comentario', this.comentario);

    this.http.post(`${environment.apiUrl}/projetos`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(finalize(() => this.enviando.set(false)))
      .subscribe({
        next: (event: any) => {
          if (event.type === 1 && event.total) {
            this.uploadProgresso.set(Math.round(100 * event.loaded / event.total));
          }
          if (event.type === 4) {
            this.mensagem.set('Projeto enviado com sucesso!');
            this.mensagemTipo.set('success');
            this.arquivoSelecionado.set(null);
            setTimeout(() => this.router.navigate(['/catalogo']), 2000);
          }
        },
        error: (err) => {
          this.mensagem.set(err.error?.erro || 'Erro ao enviar projeto');
          this.mensagemTipo.set('error');
        }
      });
  }
}
