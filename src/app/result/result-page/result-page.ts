import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { QuizService } from '../../core/services/quiz.service';

@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './result-page.html',
  styleUrl: './result-page.css'
})
export class ResultPage {

  quizService = inject(QuizService);
  private router = inject(Router);

  goToHome(): void {
    this.router.navigate(['/home']);
  }

}