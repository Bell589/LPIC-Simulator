import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionDataService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/questions';

  getQuestionsByCatalog(catalog: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}?catalog=${catalog}`);
  }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/${id}`);
  }

}