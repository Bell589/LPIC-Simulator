import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionDataService {

  private readonly httpClient = inject(HttpClient);

  getQuestions(catalog: string): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`/data/${catalog}.json`);
  }

}