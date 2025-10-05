import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from 'auth';
import { Observable } from 'rxjs';
import { ExamsResponse } from '../../../Shared/interfaces/exams/exams';

@Injectable({
  providedIn: 'root',
})
export class ExamsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  getAllExamsOnSubject(id: string | null): Observable<ExamsResponse> {
    return this._httpClient.get<ExamsResponse>(`${this._BASE_URL}/api/v1/exams?subject=${id}`);
  }
}
