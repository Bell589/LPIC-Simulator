import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Question } from '../../core/models/question';
import { QuestionDataService } from '../../core/services/question-data.service';

@Component({
  selector: 'app-home-page',
  imports: [AsyncPipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

  private readonly questionDataService = inject(QuestionDataService);

  protected readonly questions$: Observable<Question[]> =
    this.questionDataService.getQuestions('101');

}