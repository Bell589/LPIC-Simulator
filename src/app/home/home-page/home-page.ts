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

  numberOfQuestions = 10;

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