import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../../core/services/quiz.service';
import { QuestionDataService } from '../../core/services/question-data.service';
import { Question } from '../../core/models/question';

@Component({
  selector: 'app-learning-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './learning-page.html',
  styleUrl: './learning-page.css'
})
export class LearningPage implements OnInit {

  private quizService = inject(QuizService);
  private questionDataService = inject(QuestionDataService);
  private router = inject(Router);

  questions = signal<Question[]>([]);
  currentIndex = signal(0);
  showAnswer = signal(false);

  selectedAnswerIndex = signal<number | null>(null);
  selectedAnswerIndices = signal<number[]>([]);
  fillInAnswer = signal('');

  currentQuestion = computed(() => this.questions()[this.currentIndex()] ?? null);
  catalog = computed(() => this.quizService.settings()?.catalog ?? '');

  progressText = computed(() => {
    const total = this.questions().length;
    if (total === 0) {
      return '';
    }
    return `Frage ${this.currentIndex() + 1} von ${total}`;
  });

  ngOnInit(): void {
    this.quizService.resetAnswers();

    const settings = this.quizService.settings();
    const catalog = settings?.catalog ?? '101a';

    this.questionDataService.getQuestionsByCatalog(catalog).subscribe(questions => {
      const filtered = settings
        ? this.quizService.filterQuestions(questions, settings)
        : questions;

      this.questions.set(filtered);
    });
  }

  selectSingleAnswer(index: number): void {
    this.selectedAnswerIndex.set(index);
  }

  toggleMultipleAnswer(index: number): void {
    const current = this.selectedAnswerIndices();

    if (current.includes(index)) {
      this.selectedAnswerIndices.set(current.filter(i => i !== index));
    } else {
      this.selectedAnswerIndices.set([...current, index]);
    }
  }

  isFillInCorrect(): boolean {
    const question = this.currentQuestion();
    if (!question) {
      return false;
    }

    const userAnswer = this.fillInAnswer().trim().toLowerCase();

    return question.answers.some(
      answer => answer.isCorrect && answer.text.trim().toLowerCase() === userAnswer
    );
  }

  revealAnswer(): void {
    this.showAnswer.set(true);
    this.recordCurrentAnswer();
  }

  private recordCurrentAnswer(): void {
    const question = this.currentQuestion();
    if (!question) {
      return;
    }

    let isCorrect = false;
    let userAnswerText = '';

    const correctAnswerText = question.answers
      .filter(a => a.isCorrect)
      .map(a => a.text)
      .join(', ');

    if (question.type === 'sc') {
      const index = this.selectedAnswerIndex();
      isCorrect = index !== null && question.answers[index]?.isCorrect === true;
      userAnswerText = index !== null ? question.answers[index].text : '(keine Antwort)';
    }

    if (question.type === 'mc') {
      const selectedIndices = new Set(this.selectedAnswerIndices());
      const correctIndices = new Set(
        question.answers
          .map((answer, index) => (answer.isCorrect ? index : null))
          .filter((index): index is number => index !== null)
      );

      isCorrect =
        selectedIndices.size === correctIndices.size &&
        [...selectedIndices].every(index => correctIndices.has(index));

      userAnswerText = [...selectedIndices]
        .map(i => question.answers[i].text)
        .join(', ') || '(keine Antwort)';
    }

    if (question.type === 'fi') {
      isCorrect = this.isFillInCorrect();
      userAnswerText = this.fillInAnswer().trim() || '(keine Antwort)';
    }

    this.quizService.recordAnswer({
      questionId: question.id,
      questionText: question.text,
      userAnswerText,
      correctAnswerText,
      isCorrect
    });
  }

  nextQuestion(): void {
    this.recordCurrentAnswer();

    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.resetQuestionState();
    } else {
      this.router.navigate(['/result']);
    }
  }

  previousQuestion(): void {
    this.recordCurrentAnswer();

    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
      this.resetQuestionState();
    }
  }

  private resetQuestionState(): void {
    this.showAnswer.set(false);
    this.selectedAnswerIndex.set(null);
    this.selectedAnswerIndices.set([]);
    this.fillInAnswer.set('');
  }

  cancelToHome(): void {
    this.router.navigate(['/home']);
  }

}