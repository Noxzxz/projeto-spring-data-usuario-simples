import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

import { ProjetosService } from '../../../../core/services/projetos.service';
import type { ProjetoSummary, StatusProjeto } from '../../../../core/models';

type FiltroTab = 'TODOS' | 'EM_ANDAMENTO' | 'CONCLUIDOS';

type Estado<T> =
  | { status: 'carregando' }
  | { status: 'sucesso'; dados: T }
  | { status: 'erro'; mensagem: string };

@Component({
  selector: 'app-meus-projetos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './meus-projetos.component.html',
  styleUrls: ['./meus-projetos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeusProjetosComponent {
  private readonly service = inject(ProjetosService);
  private readonly router  = inject(Router);

  readonly filtroAtivo = signal<FiltroTab>('TODOS');
  readonly tabs: { label: string; valor: FiltroTab }[] = [
    { label: 'Todos',        valor: 'TODOS' },
    { label: 'Em andamento', valor: 'EM_ANDAMENTO' },
    { label: 'Concluídos',   valor: 'CONCLUIDOS' },
  ];

  readonly estado = toSignal<Estado<ProjetoSummary[]>>(
    toObservable(this.filtroAtivo).pipe(
      switchMap(filtro =>
        this.service
          .listar({
            status:
              filtro === 'TODOS'       ? undefined :
              filtro === 'CONCLUIDOS'  ? 'APROVADO' :
              'EM_ANDAMENTO',
            tamanho: 20,
          })
          .pipe(
            map(res => ({ status: 'sucesso' as const, dados: res.content })),
            catchError(() =>
              of({ status: 'erro' as const, mensagem: 'Falha ao carregar projetos.' }),
            ),
            startWith({ status: 'carregando' as const }),
          ),
      ),
    ),
    { initialValue: { status: 'carregando' as const } },
  );

  readonly projetos = computed<ProjetoSummary[]>(() => {
    const e = this.estado();
    return e.status === 'sucesso' ? e.dados : [];
  });

  readonly erroBusca = computed(() => {
    const e = this.estado();
    return e.status === 'erro' ? e.mensagem : null;
  });

  // ── helpers de template ──────────────────────────────────

  statusLabel(status: StatusProjeto): string {
    const mapa: Record<StatusProjeto, string> = {
      EM_ANDAMENTO:     'EM ANDAMENTO',
      AGUARDANDO_ENVIO: 'AGUARDANDO ENVIO',
      ENVIADO:          'ENVIADO',
      EM_REVISAO:       'EM REVISÃO',
      APROVADO:         'APROVADO',
      REPROVADO:        'REPROVADO',
    };
    return mapa[status] ?? status;
  }

  statusVariante(status: StatusProjeto): 'azul' | 'laranja' | 'verde' | 'vermelho' | 'cinza' {
    switch (status) {
      case 'EM_ANDAMENTO':     return 'azul';
      case 'AGUARDANDO_ENVIO': return 'laranja';
      case 'APROVADO':         return 'verde';
      case 'REPROVADO':        return 'vermelho';
      default:                 return 'cinza';
    }
  }

  btnLabel(status: StatusProjeto): string {
    return status === 'AGUARDANDO_ENVIO' ? 'Finalizar e Enviar' : 'Continuar projeto';
  }

  formatarData(iso: string): string {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
    });
  }

  irParaProjeto(id: number): void {
    this.router.navigate(['/projetos', id]);
  }

  enviarProjeto(id: number): void {
    this.router.navigate(['/projetos/enviar'], { queryParams: { id } });
  }

  trackByProjeto(_: number, p: ProjetoSummary): number {
    return p.id;
  }
}
