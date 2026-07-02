import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { QuizService } from '../../core/services/quiz.service';
import { QuestionDataService } from '../../core/services/question-data.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit {

  private quizService = inject(QuizService);
  private questionDataService = inject(QuestionDataService);
  private router = inject(Router);

  catalog = '101a';
  mode: 'practice' | 'exam' = 'practice';
  order: 'normal' | 'random' = 'normal';
  questionType: 'all' | 'sc' | 'mc' | 'fi' = 'all';
  timePerQuestionSeconds = 60;

  fromQuestion = 1;
  toQuestion = 0;
  maxQuestions = signal(0);

  ngOnInit(): void {
    this.loadMaxQuestions();
  }

  onCatalogChange(): void {
    this.loadMaxQuestions();
  }

  private loadMaxQuestions(): void {
    this.questionDataService.getQuestionsByCatalog(this.catalog).subscribe(questions => {
      this.maxQuestions.set(questions.length);
      this.fromQuestion = 1;
      this.toQuestion = questions.length;
    });
  }

  startQuiz(): void {
    const from = Math.max(1, this.fromQuestion);
    const to = Math.min(this.maxQuestions(), this.toQuestion);
    const numberOfQuestions = Math.max(1, to - from + 1);

    this.quizService.setSettings({
      catalog: this.catalog,
      mode: this.mode,
      order: this.order,
      questionType: this.questionType,
      numberOfQuestions: numberOfQuestions,
      fromQuestion: from,
      toQuestion: to,
      timePerQuestionSeconds: this.timePerQuestionSeconds
    });

    const target = this.mode === 'exam' ? '/exam' : '/learning';
    this.router.navigate([target]);
  }

}