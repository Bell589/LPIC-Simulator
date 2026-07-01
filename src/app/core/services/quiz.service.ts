import { Injectable, signal, computed } from '@angular/core';
import { QuizSettings } from '../models/quiz-settings';
import { Question } from '../models/question';
import { AnsweredQuestion } from '../models/answered-question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  settings = signal<QuizSettings | null>(null);

  answeredQuestions = signal<AnsweredQuestion[]>([]);

  correctCount = computed(() =>
    this.answeredQuestions().filter(a => a.isCorrect).length
  );

  incorrectCount = computed(() =>
    this.answeredQuestions().filter(a => !a.isCorrect).length
  );

  setSettings(settings: QuizSettings): void {
    this.settings.set(settings);
  }

  recordAnswer(record: AnsweredQuestion): void {
    const existingIndex = this.answeredQuestions().findIndex(
      a => a.questionId === record.questionId
    );

    const updated = [...this.answeredQuestions()];

    if (existingIndex >= 0) {
      updated[existingIndex] = record;
    } else {
      updated.push(record);
    }

    this.answeredQuestions.set(updated);
  }

  resetAnswers(): void {
    this.answeredQuestions.set([]);
  }

  filterQuestions(questions: Question[], settings: QuizSettings): Question[] {
    let result = [...questions];

    if (settings.questionType !== 'all') {
      result = result.filter(q => q.type === settings.questionType);
    }

    // Spanne anwenden (von/bis sind 1-basiert)
    const from = Math.max(1, settings.fromQuestion) - 1;
    const to = Math.min(result.length, settings.toQuestion);
    result = result.slice(from, to);

    if (settings.order === 'random') {
      result = this.shuffleArray(result);
      result = result.map(question => ({
        ...question,
        answers: this.shuffleArray(question.answers)
      }));
    }

    return result;
  }

  private shuffleArray<T>(array: T[]): T[] {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }

}