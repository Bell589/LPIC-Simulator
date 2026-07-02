export interface AnsweredQuestion {
  questionId: number;
  questionText: string;
  userAnswerText: string;
  correctAnswerText: string;
  isCorrect: boolean;
}