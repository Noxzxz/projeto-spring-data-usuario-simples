import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import type { AlunoProgresso, MatriculaProgresso } from '../models';

@Injectable({ providedIn: 'root' })
export class AlunoService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly base = `${environment.apiUrl}/alunos`;

  getProgresso(): Observable<AlunoProgresso> {
    const userId = this.auth.usuario()?.id;
    return this.http.get<AlunoProgresso>(`${this.base}/${userId}/progresso`);
  }

  getMatriculas(): Observable<MatriculaProgresso[]> {
    return this.http.get<MatriculaProgresso[]>(`${environment.apiUrl}/matriculas`);
  }
}
