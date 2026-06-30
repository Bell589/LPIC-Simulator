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

  catalog = computed(() => this.quizService.settings()?.catalog ?? '101a');

  ngOnInit(): void {
    this.questionDataService.getQuestionsByCatalog(this.catalog()).subscribe(questions => {
      this.questions.set(questions);
    });
  }

  correctAnswerText(question: Question): string {
    return question.answers
      .filter(a => a.isCorrect)
      .map(a => a.text)
      .join(', ');
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

}