import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import type {
  MatriculaProgresso,
  ConcluirModuloResponse,
} from '../models';

@Injectable({ providedIn: 'root' })
export class ProgressoService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly base = `${environment.apiUrl}/matriculas`;

  getProgresso(matriculaId: number): Observable<MatriculaProgresso> {
    return this.http.get<MatriculaProgresso>(`${this.base}/${matriculaId}/progresso`);
  }

  concluirModulo(matriculaId: number, ordem: number, nota?: number): Observable<ConcluirModuloResponse> {
    const body = nota !== undefined ? { nota } : {};
    return this.http.post<ConcluirModuloResponse>(
      `${this.base}/${matriculaId}/modulos/${ordem}/concluir`,
      body
    );
  }
}
