import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../core/services/quiz.service';
import { QuestionDataService } from '../../core/services/question-data.service';
import { Question } from '../../core/models/question';

@Component({
  selector: 'app-question-list-page',
  standalone: true,
  imports: [],
  templateUrl: './question-list-page.html',
  styleUrl: './question-list-page.css'
})
export class QuestionListPage implements OnInit {

  private quizService = inject(QuizService);
  private questionDataService = inject(QuestionDataService);
  private router = inject(Router);

  questions = signal<Question[]>([]);
  selectedCatalog = signal('101a');

  readonly catalogs = [
    '101a', '101b', '101c', '101d', '101e',
    '102a', '102b', '102c', '102d', '102e', '102f', '102g'
  ];

  ngOnInit(): void {
    const settingsCatalog = this.quizService.settings()?.catalog;
    if (settingsCatalog) {
      this.selectedCatalog.set(settingsCatalog);
    }
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionDataService.getQuestionsByCatalog(this.selectedCatalog()).subscribe(questions => {
      this.questions.set(questions);
    });
  }

  onCatalogChange(catalog: string): void {
    this.selectedCatalog.set(catalog);
    this.loadQuestions();
  }

  correctAnswerText(question: Question): string {
    return question.answers
      .filter(a => a.isCorrect)
      .map(a => a.text)
      .join(', ');
  }

  goToDetail(id: number): void {
    this.router.navigate(['/list', id]);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

}