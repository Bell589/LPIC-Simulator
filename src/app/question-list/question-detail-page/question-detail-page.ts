import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionDataService } from '../../core/services/question-data.service';
import { Question } from '../../core/models/question';

@Component({
  selector: 'app-question-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './question-detail-page.html',
  styleUrl: './question-detail-page.css'
})
export class QuestionDetailPage implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private questionDataService = inject(QuestionDataService);

  question = signal<Question | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.questionDataService.getQuestionById(id).subscribe(question => {
      this.question.set(question);
    });
  }

  correctAnswerText(question: Question): string {
    return question.answers
      .filter(a => a.isCorrect)
      .map(a => a.text)
      .join(', ');
  }

  goBackToList(): void {
    this.router.navigate(['/list']);
  }

}