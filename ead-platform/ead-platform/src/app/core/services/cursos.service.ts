import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import type {
  CursoSummary,
  CursoDetalhe,
  CursoCreateRequest,
  CursoUpdateRequest,
  DashboardInstrutor,
  ApiResponse,
  PagedResponse,
  CursoFiltros,
} from '../models';

@Injectable({ providedIn: 'root' })
export class CursosService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly base = `${environment.apiUrl}/cursos`;

  getInstructorDashboard() {
    return this.http.get<ApiResponse<DashboardInstrutor>>(
      `${environment.apiUrl}/instrutor/dashboard`,
    );
  }

  listar(filtros: CursoFiltros = {}) {
    let params = new HttpParams();
    if (filtros.status)  params = params.set('status', filtros.status);
    if (filtros.busca)   params = params.set('busca', filtros.busca);
    if (filtros.pagina !== undefined) params = params.set('pagina', String(filtros.pagina));
    if (filtros.tamanho) params = params.set('tamanho', String(filtros.tamanho));
    return this.http.get<PagedResponse<CursoSummary>>(this.base, { params });
  }

  buscarPorId(id: number) {
    return this.http.get<ApiResponse<CursoDetalhe>>(`${this.base}/${id}`);
  }

  matricular(cursoId: number) {
    const alunoId = this.auth.usuario()?.id;
    if (!alunoId) throw new Error('Usuário não autenticado');

    const payload = {
      alunoId,
      cursoId,
      dataMatricula: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      status: 'ATIVA'
    };

    return this.http.post(`${environment.apiUrl}/matriculas`, payload);
  }

  verificarMatricula(cursoId: number) {
    const alunoId = this.auth.usuario()?.id;
    if (!alunoId) return null;
    
    // Simplificado: Buscar todas as matrículas e filtrar. 
    // No futuro, ideal ter endpoint GET /matriculas/status/:alunoId/:cursoId
    return this.http.get<any[]>(`${environment.apiUrl}/matriculas`);
  }

  criar(payload: CursoCreateRequest) {
    return this.http.post<ApiResponse<CursoDetalhe>>(this.base, payload);
  }

  atualizar(id: number, payload: CursoUpdateRequest) {
    return this.http.put<ApiResponse<CursoDetalhe>>(`${this.base}/${id}`, payload);
  }

  uploadCapa(id: number, arquivo: File) {
    const form = new FormData();
    form.append('arquivo', arquivo);
    return this.http.post<ApiResponse<{ capUrl: string }>>(`${this.base}/${id}/capa`, form);
  }

  excluir(id: number) {
    return this.http.delete<ApiResponse<void>>(`${this.base}/${id}`);
  }
}
