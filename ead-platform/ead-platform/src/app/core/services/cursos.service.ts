import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import type {
  CursoSummary,
  CursoDetalhe,
  CursoCreateRequest,
  CursoUpdateRequest,
  DashboardInstrutor,
  ApiResponse,
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

  listar(): Observable<CursoSummary[]> {
    return this.http.get<CursoSummary[]>(this.base);
  }

  buscarPorId(id: number) {
    return this.http.get<CursoDetalhe>(`${this.base}/${id}`);
  }

  matricular(cursoId: number) {
    const alunoId = this.auth.usuario()?.id;
    if (!alunoId) throw new Error('Usuário não autenticado');

    return this.http.post<any>(`${environment.apiUrl}/matriculas`, { cursoId });
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
