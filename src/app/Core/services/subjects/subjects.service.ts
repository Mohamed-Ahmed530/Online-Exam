import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from 'auth';
import { Observable } from 'rxjs';
import { SubjectResponse } from '../../../Shared/interfaces/subjects/subjects';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);

  getAllSubjects(): Observable<SubjectResponse> {
    return this._httpClient.get<SubjectResponse>(`${this._BASE_URL}/api/v1/subjects`)
  }

}