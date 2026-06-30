import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

  catalog = '101a';

  mode = 'practice';

  order = 'normal';

  questionType = 'all';

  numberOfQuestions = 85;

  maxQuestions = 85;

  constructor() {
    this.updateQuestionCount();
  }

  updateQuestionCount(): void {

    switch (this.catalog) {

      case '101a':
        this.maxQuestions = 85;
        break;

      case '101b':
        this.maxQuestions = 85;
        break;

      case '102a':
        this.maxQuestions = 85;
        break;

      case '102b':
        this.maxQuestions = 85;
        break;

      case '103a':
        this.maxQuestions = 85;
        break;

      case '103b':
        this.maxQuestions = 85;
        break;

      case '104a':
        this.maxQuestions = 85;
        break;

      case '104b':
        this.maxQuestions = 85;
        break;

      case '105a':
        this.maxQuestions = 85;
        break;

      case '105b':
        this.maxQuestions = 85;
        break;

      case '106a':
        this.maxQuestions = 85;
        break;

      case '106b':
        this.maxQuestions = 85;
        break;

    }

    this.numberOfQuestions = this.maxQuestions;
  }

  get questionNumbers(): number[] {

    return Array.from(
      { length: this.maxQuestions },
      (_, index) => index + 1
    );

  }

  startQuiz(): void {

    console.log('Quiz starten');

    console.log({
      catalog: this.catalog,
      mode: this.mode,
      order: this.order,
      questionType: this.questionType,
      numberOfQuestions: this.numberOfQuestions
    });

  }

}