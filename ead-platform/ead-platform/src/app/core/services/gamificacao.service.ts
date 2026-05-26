import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import type { SaldoMoedasResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class GamificacaoService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/gamificacao`;

  getMoedas() {
    return this.http.get<SaldoMoedasResponse>(`${this.base}/moedas`);
  }
}
