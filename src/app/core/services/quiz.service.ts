import { Injectable, signal } from '@angular/core';
import { QuizSettings } from '../models/quiz-settings';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  settings = signal<QuizSettings | null>(null);

  setSettings(settings: QuizSettings): void {
    this.settings.set(settings);
  }

}