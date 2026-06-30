import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../core/services/quiz.service';

@Component({
  selector: 'app-review-page',
  standalone: true,
  imports: [],
  templateUrl: './review-page.html',
  styleUrl: './review-page.css'
})
export class ReviewPage {

  quizService = inject(QuizService);
  private router = inject(Router);

  goToHome(): void {
    this.router.navigate(['/home']);
  }

}