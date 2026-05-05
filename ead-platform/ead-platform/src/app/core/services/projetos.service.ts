import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEventType } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import type {
  ProjetoSummary,
  ProjetoDetalhe,
  ProjetoSubmitRequest,
  DashboardAluno,
  ApiResponse,
  PagedResponse,
  ProjetoFiltros,
} from '../models';

@Injectable({ providedIn: 'root' })
export class ProjetosService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/projetos`;

  getDashboardAluno() {
    return this.http.get<ApiResponse<DashboardAluno>>(
      `${environment.apiUrl}/aluno/dashboard`,
    );
  }

  listar(filtros: ProjetoFiltros = {}) {
    let params = new HttpParams();
    if (filtros.status && filtros.status !== 'TODOS')
      params = params.set('status', filtros.status);
    if (filtros.pagina !== undefined) params = params.set('pagina', String(filtros.pagina));
    if (filtros.tamanho) params = params.set('tamanho', String(filtros.tamanho));
    return this.http.get<PagedResponse<ProjetoSummary>>(this.base, { params });
  }

  buscarPorId(id: number) {
    return this.http.get<ApiResponse<ProjetoDetalhe>>(`${this.base}/${id}`);
  }

  criar(payload: ProjetoSubmitRequest) {
    return this.http.post<ApiResponse<ProjetoDetalhe>>(this.base, payload);
  }

  uploadArquivo(projetoId: number, arquivo: File) {
    const form = new FormData();
    form.append('arquivo', arquivo);
    const req = new HttpRequest('POST', `${this.base}/${projetoId}/arquivos`, form, {
      reportProgress: true,
    });
    return this.http.request(req).pipe(
      filter(
        event =>
          event.type === HttpEventType.UploadProgress ||
          event.type === HttpEventType.Response,
      ),
      map(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentual = event.total
            ? Math.round((100 * event.loaded) / event.total)
            : 0;
          return { percentual, status: 'uploading' as const };
        }
        return { percentual: 100, status: 'complete' as const };
      }),
    );
  }

  removerArquivo(projetoId: number, arquivoId: number) {
    return this.http.delete<ApiResponse<void>>(
      `${this.base}/${projetoId}/arquivos/${arquivoId}`,
    );
  }

  enviar(projetoId: number) {
    return this.http.post<ApiResponse<ProjetoDetalhe>>(
      `${this.base}/${projetoId}/enviar`,
      {},
    );
  }
}
