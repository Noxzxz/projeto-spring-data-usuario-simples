import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AulaService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/aulas`;

  buscarPorId(id: number) {
    return this.http.get<any>(`${this.base}/${id}`);
  }
}
