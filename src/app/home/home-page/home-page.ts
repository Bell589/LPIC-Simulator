import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { QuizService } from '../../core/services/quiz.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

  private quizService = inject(QuizService);
  private router = inject(Router);

  catalog = '101a';
  mode: 'practice' | 'exam' = 'practice';
  order: 'normal' | 'random' = 'normal';
  questionType: 'all' | 'sc' | 'mc' | 'fi' = 'all';
  numberOfQuestions = 10;

  startQuiz(): void {
    this.quizService.setSettings({
      catalog: this.catalog,
      mode: this.mode,
      order: this.order,
      questionType: this.questionType,
      numberOfQuestions: this.numberOfQuestions
    });

    const target = this.mode === 'exam' ? '/exam' : '/learning';
    this.router.navigate([target]);
  }

}